const moment = require("moment");

const transformResearchResult = (results) => {
  return results.slice(0, 10).map((result) => ({ title: result.title, url: result.url[0].value }));
};

const createResearchLinks = (results) => {
  return results.map((result) => `<p><a href="${ result.url }">${ result.title }</a></p>`).join("\n");
};

const createOpeningHoursLines = (openingHours, date) => {
  if (!date) {
    throw new Error("Parameter \"date\" fehlt");
  }

  const dayToHighlight = moment(date);

  let result;

  if (openingHours.length > 0) {
    result = openingHours.map((entry, index) => {
      if (index === dayToHighlight.isoWeekday() - 1) {
        return `<p><b>${ entry }</b></p>`;
      } else {
        return `<p>${ entry }</p>`;
      }
    }).join("</br>");
  } else {
    result = `<p><b>${ dayToHighlight.format("DD.MM.YYYY") }: keine Angaben</b></p>`;
  }

  return result;
};

const createEmailText = (keyword, records, { name, address, openingHours }, date) => {
  const transformedRecords = transformResearchResult(records);
  const researchLinks = createResearchLinks(transformedRecords);
  const openingHoursLines = createOpeningHoursLines(openingHours, date);

  return `
    <p>Hallo, hier ist James!</p></br>
    <p>Hier sind deine Rechercheergebnisse zum Thema <b>"${ keyword }"</b>:</p>
    ${ researchLinks }</br>
    <p>Die nächste Bibliothek ist die "${ name }" mit der Adresse: ${ address }.</p>
    <p>Die Öffnungszeiten sind:</p>
    ${ openingHoursLines }</br>
    <p>Viel Erfolg beim Lernen,</p>
    <p>James</p>
  `;
};

const createEmailOptions = (keyword, emailText, emailAddress) => {
  return {
    recipient: emailAddress,
    subject: `Rechercheergebnisse zum Thema ${ keyword }`,
    htmlText: emailText,
  };
};

module.exports = {
  createEmailText,
  createEmailOptions,
  transformResearchResult,
  createResearchLinks,
  createOpeningHoursLines,
};
