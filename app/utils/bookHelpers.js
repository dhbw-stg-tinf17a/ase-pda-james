const Markup = require("telegraf/markup");
const moment = require("moment");

const formatSlotButtonText = (slot) => {
  const start = moment(slot.start).format("HH:mm");
  const end = moment(slot.end).format("HH:mm");
  return `${ start } – ${ end }`;
};

const formatSlotButtonData = (index) => {
  if (!index && index !== 0) throw Error("No index provided");
  return `book_slot_${ index }`;
};

const createFreeSlotButtons = (freeSlots) => {
  return freeSlots.map((slot, index) => {
    return [Markup.callbackButton(formatSlotButtonText(slot), formatSlotButtonData(index))];
  });
};

const createEventTitle = (keyword) => {
  return `Lernen${ keyword ? `: ${ keyword }` : "" }`;
};

const transformResearchResult = (results) => {
  return results.slice(0, 10).map((result) => ({title: result.title, url: result.url[0].value}));
};

const createResearchLinks = (results) => {
  return results.map((result) => `<p><a href="${ result.url }">${ result.title }</a></p>`).join("\n");
};

const createEmailText = (keyword, records) => {
  const transformedRecords = transformResearchResult(records);
  const researchLinks = createResearchLinks(transformedRecords);

  return `
    <p>Hallo, hier ist James!</p></br>
    <p>Hier sind deine Rechercheergebnisse zum Thema: "${ keyword }"</p></br>
    ${ researchLinks }</br>
    <p>Viel Erfolg beim Lernen,</p>
    <p>James</p>
  `;
};

const createEmailOptions = (keyword, emailText) => {
  return {
    recipient: "erik.littwin@gmail.com",
    subject: `Rechercheergebnisse zum Thema ${ keyword }`,
    htmlText: emailText,
  };
};

module.exports = {
  createFreeSlotButtons,
  formatSlotButtonText,
  formatSlotButtonData,
  createEventTitle,
  createEmailText,
  createEmailOptions,
  transformResearchResult,
  createResearchLinks,
};
