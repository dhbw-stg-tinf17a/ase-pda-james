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

module.exports = {createFreeSlotButtons, formatSlotButtonText, formatSlotButtonData, createEventTitle};
