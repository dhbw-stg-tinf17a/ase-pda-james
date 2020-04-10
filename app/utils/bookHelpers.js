const transformResearchResult = (results) => {
  return results.slice(0, 10).map((result) => ({title: result.title, url: result.url[0].value}));
};

const createResearchLinks = (results) => {
  return results.map((result) => `<p><a href="${ result.url }">${ result.title }</a></p>`).join("\n");
};

const createOpeningHoursLines = (openingHours) => {
  return openingHours.length > 0 ?
      openingHours.map((entry) => `<p>${ entry }</p>`).join("</br>") :
      "<p>keine Angaben</p>";
};

const createEmailText = (keyword, records, {name, address, openingHours}) => {
  const transformedRecords = transformResearchResult(records);
  const researchLinks = createResearchLinks(transformedRecords);
  const openingHoursLines = createOpeningHoursLines(openingHours);

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

const createEmailOptions = (keyword, emailText) => {
  return {
    recipient: process.env.MY_EMAIL,
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
