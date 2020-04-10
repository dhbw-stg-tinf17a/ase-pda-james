const watsonSpeech = require("../services/watsonSpeech")();
const springer = require("../services/springer");
const mailer = require("../services/mailer")();
const gPlaces = require("../services/gplaces")();
const {
  createEmailText,
  createEmailOptions,
} = require("../utils/bookHelpers");

module.exports = (db) => {
  const preferences = require("../services/preferences")(db);

  let date;
  let keyword;
  const library = {
    name: "",
    address: "",
    openingHours: [],
  };

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
        ctx.reply("Zu welchem Thema möchtest du recherchieren?");
        break;
      case "book_which-day":
        // watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        ctx.reply("Wann möchtest du lernen?");
        break;
      case "book_slots":
        ctx.reply("Alles klar! Gib mir einen Moment...");

        keyword = waRes.context.keyword;
        date = waRes.context.bookDate;

        gPlaces.getPlaces({
          query: "Bibliothek",
          location: "48.7280875, 9.1209683", // TODO: Replace with Preference of home address
          rankby: "distance",
        }).then((places) => {
          library.name = places.results[0].name;
          library.address = places.results[0].vicinity;

          ctx.replyWithHTML(this.formatLibraryInfo(library));

          return gPlaces.getPlaceById(places.results[0].place_id);
        }).then((place) => {
          if (place.result.opening_hours && place.result.opening_hours.weekday_text) {
            library.openingHours = place.result.opening_hours.weekday_text;
          }

          return springer.getByKeyword(keyword);
        }).then((data) => {
          ctx.reply(`Hier sind die ersten fünf Artikel, die ich zu "${ keyword }" gefunden habe.`);
          ctx.replyWithHTML(this.formatArticleResults(data.records.slice(0, 5)));

          ctx.reply("Ich schicke dir eine Email mit den Artikeln und den Öffnungszeiten der Bibliothek.");

          const emailMessage = createEmailText(keyword, data.records, library);
          const emailOptions = createEmailOptions(keyword, emailMessage);

          return mailer.sendMail(emailOptions);
        }).then(() => {
          ctx.reply(`Ich habe dir eine Liste von Artikeln zum Thema ${ keyword } geschickt.`);
        }).catch((error) => {
          console.error(error);
          ctx.reply("Da ist mir ein Fehler unterlaufen. Versuche es noch mal!");
        });
        break;
      default:
        return;
    }
  };

  return this;
};
