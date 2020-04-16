const watsonSpeech = require("../services/watsonSpeech")();
const springer = require("../services/springer");
const mailer = require("../services/mailer")();
const gPlaces = require("../services/gplaces")();
const {createEmailText, createEmailOptions} = require("../utils/bookHelpers");

module.exports = (db) => {
  const preferences = require("../services/preferences")(db);

  this.date = null;
  this.keyword = null;
  this.library = {
    name: "",
    address: "",
    openingHours: [],
  };
  this.springerRecords = null;

  this.formatLibraryInfo = ({name, address}) => {
    if (!name && !address) {
      throw new Error("Falsche Parameter");
    }
    return `
      Die nächste Bibliothek von dir zu Hause ist die "<b>${ name }</b>".\nDie Adresse lautet: ${ address }.
    `;
  };

  this.formatArticleResults = (articles) => {
    if (articles.length <= 0) {
      throw new Error("Falsche Parameter");
    }

    const paragraphs = articles.map((article) => {
      return `<a href="${ article.url[0].value }">${ article.title }</a>`;
    });

    return paragraphs.join("\n\n");
  };

  this.onUpdate = (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "book_welcome":
        // watsonSpeech.replyWithAudio(ctx, "Zu welchem Thema möchtest du recherchieren?");
        return ctx.reply("Zu welchem Thema möchtest du recherchieren?");
      case "book_which-day":
        // watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        return ctx.reply("Wann möchtest du lernen?");
      case "book_slots":
        return ctx.reply("Alles klar! Gib mir einen Moment...").then(() => {
          this.keyword = waRes.context.keyword;
          this.date = waRes.context.bookDate;

          return gPlaces.getPlaces({
            query: "Bibliothek",
            location: "48.7280875, 9.1209683", // TODO: Replace with Preference of home address
            rankby: "distance",
          });
        }).then((places) => {
          this.library.name = places.results[0].name;
          this.library.address = places.results[0].vicinity;

          return gPlaces.getPlaceById(places.results[0].place_id);
        }).then((place) => {
          if (place.result.opening_hours && place.result.opening_hours.weekday_text) {
            this.library.openingHours = place.result.opening_hours.weekday_text;
          }

          return ctx.replyWithHTML(this.formatLibraryInfo(this.library));
        }).then(() => {
          return springer.getByKeyword(this.keyword);
        }).then((data) => {
          this.springerRecords = data.records;

          return ctx.reply(`Hier sind die ersten fünf Artikel, die ich zu "${ this.keyword }" gefunden habe.`);
        }).then(() => {
          return ctx.replyWithHTML(this.formatArticleResults(this.springerRecords.slice(0, 5)));
        }).then(() => {
          return ctx.reply("Ich schicke dir eine Email mit den Artikeln und den Öffnungszeiten der Bibliothek.");
        }).then(() => {
          const emailMessage = createEmailText(this.keyword, this.springerRecords, this.library, this.date);
          const emailOptions = createEmailOptions(this.keyword, emailMessage);

          return mailer.sendMail(emailOptions);
        }).then(() => {
          return ctx.reply(`Ich habe dir eine Liste von Artikeln zum Thema ${ this.keyword } geschickt.`);
        }).catch((error) => {
          console.error(error);
          return ctx.reply("Da ist mir ein Fehler unterlaufen. Versuche es noch mal!");
        });
      default:
        return;
    }
  };

  return this;
};
