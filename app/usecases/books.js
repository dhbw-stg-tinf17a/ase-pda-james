const watsonSpeech = require("../services/watsonSpeech")();
const springer = require("../services/springer");
const mailer = require("../services/mailer")();
const gPlaces = require("../services/gplaces")();
const {createEmailText, createEmailOptions} = require("../utils/bookHelpers");
const Markup = require("telegraf/markup"); // Telegram answer button handling

module.exports = (preferences) => {
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

  this.createMarkupButtons = () => {
    return [
      [Markup.callbackButton("👍🏼 Sehr gerne!", "book_yes")],
      [Markup.callbackButton("🙅‍ Lass mal lieber sein…", "book_no")],
    ];
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

  this.onUpdate = async (ctx, waRes) => {
    switch (waRes.generic[0].text) {
      case "book_welcome":
        return await watsonSpeech.replyWithAudio(ctx, "Zu welchem Thema möchtest du recherchieren?");
        // return await ctx.reply("Zu welchem Thema möchtest du recherchieren?");
      case "book_which-day":
        return await watsonSpeech.replyWithAudio(ctx, "Wann möchtest du lernen?");
        // return await ctx.reply("Wann möchtest du lernen?");
      case "book_slots":
        try {
          this.keyword = waRes.context.keyword;
          this.date = waRes.context.bookDate;

          await watsonSpeech.replyWithAudio(ctx, "Alles klar! Gib mir einen Moment.");
          // await ctx.reply("Alles klar! Gib mir einen Moment...");

          const coordinates = await preferences.get("home_address_coordinates");

          const places = await gPlaces.getPlaces({
            query: "Bibliothek",
            location: coordinates,
            rankby: "distance",
          });

          this.library.name = places.results[0].name;
          this.library.address = places.results[0].vicinity;

          const place = await gPlaces.getPlaceById(places.results[0].place_id);
          if (place.result.opening_hours && place.result.opening_hours.weekday_text) {
            this.library.openingHours = place.result.opening_hours.weekday_text;
          }

          await ctx.replyWithHTML(this.formatLibraryInfo(this.library));

          const data = await springer.getByKeyword(this.keyword);
          this.springerRecords = data.records;

          await watsonSpeech.replyWithAudio(ctx,
              `Hier sind die ersten fünf Artikel, die ich zu "${ this.keyword }" gefunden habe.`);
          // await ctx.reply(`Hier sind die ersten fünf Artikel, die ich zu "${ this.keyword }" gefunden habe.`);
          await ctx.replyWithHTML(this.formatArticleResults(this.springerRecords.slice(0, 5)));

          await ctx.reply("📧 Soll ich dir noch mal eine Zusammenfassung per Email schicken?",
              Markup.inlineKeyboard(this.createMarkupButtons()).extra());
        } catch (error) {
          console.error(error);
          ctx.reply("🙆‍ Da ist mir ein Fehler unterlaufen. Versuche es noch mal!");
        }
        return;
      default:
        return;
    }
  };

  this.onCallbackQuery = async (ctx) => {
    const answer = ctx.callbackQuery.data.split("_")[1];

    try {
      if (answer === "yes") {
        await watsonSpeech.replyWithAudio(ctx,
            "Ich schicke dir eine Email mit den Artikeln und den Öffnungszeiten der Bibliothek.");
        // await ctx.reply("Ich schicke dir eine Email mit den Artikeln und den Öffnungszeiten der Bibliothek.");

        const emailAddress = await preferences.get("email");
        const emailMessage = createEmailText(this.keyword, this.springerRecords, this.library, this.date);
        const emailOptions = createEmailOptions(this.keyword, emailMessage, emailAddress);

        await mailer.sendMail(emailOptions);

        await watsonSpeech.replyWithAudio(ctx, "Die Email ist raus. Viel Erfolg beim Lernen!");
        // await ctx.reply("Die Email ist raus. Viel Erfolg beim Lernen!");
      } else {
        await watsonSpeech.replyWithAudio(ctx, "Alles klar! Viel Erfolg beim Lernen!");
        await ctx.reply("👋🏼");
      }
    } catch (error) {
      console.error(error);
      ctx.reply("🙆‍ Da ist mir ein Fehler unterlaufen. Versuche es noch mal!");
    }
  };

  return this;
};
