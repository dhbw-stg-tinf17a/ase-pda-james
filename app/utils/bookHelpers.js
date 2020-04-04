const Markup = require("telegraf/markup");

const formatSlotButtonText = (slot) => {
  return `${slot.start} – ${slot.end}`;
};

const formatSlotButtonData = (index) => {
  return `book_slot_${ index }`;
};

const createFreeSlotButtons = (freeSlots) => {
  const buttons = freeSlots.map((slot, index) => {
    return [Markup.callbackButton(formatSlotButtonText(slot), formatSlotButtonData(index))];
  });
};

module.exports = {createFreeSlotButtons, formatSlotButtonText, formatSlotButtonData};
