const moment = require("moment");

/**
 * @typedef {Object} Timeslot
 * @property {string} start
 * @property {string} end
 */

/**
 * @typedef {Object} Event
 * @property {Object} start
 * @property {Object} start.date
 * @property {Object} start.dateTime
 * @property {Object} end
 * @property {Object} end.date
 * @property {Object} end.dateTime
 */

/**
 * Helper for iterating over an array in pairs of two
 * @param {array<any>} arr
 * @param {function} func
 */
const pairwise = (arr, func) => {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1]);
  }
};

/**
 * Caluculates appropriate timeslots around a given busy timeslot
 * @param {Timeslot} busySlot
 * @param {moment} now
 * @return {[{start: string, end: string}]|[{start: string, end: string}, {start: string, end: string}]}
 */
const freeAroundEvent = (busySlot, now = moment()) => {
  const startTime = moment(busySlot.start);

  if (startTime.hours() >= 10) {
    return [
      {
        start: now.hours(9).minutes(0).seconds(0).milliseconds(0).format(),
        end: moment(busySlot.start).format(),
      },
      {
        start: moment(busySlot.end).format(),
        end: now.hours(17).minutes(0).seconds(0).milliseconds(0).format(),
      },
    ];
  } else {
    return [
      {
        start: moment(busySlot.end).format(),
        end: now.hours(17).minutes(0).seconds(0).milliseconds(0).format(),
      },
    ];
  }
};

/**
 * converts array of busy time slots to array of free slots
 * @param {Timeslot[]} busySlots
 * @return {Timeslot[]}
 */
const busyToFree = (busySlots) => {
  const freeSlots = [];

  switch (busySlots.length) {
    case 0:
      freeSlots.push({
        start: moment().hours(9).minutes(0).seconds(0).milliseconds(0).format(),
        end: moment().hours(17).minutes(0).seconds(0).milliseconds(0).format(),
      });
      break;
    case 1:
      freeSlots.push(...freeAroundEvent(busySlots[0]));
      break;
    default:
      pairwise(busySlots, (current, next) => {
        freeSlots.push({ start: current.end, end: next.start });
      });
  }

  return freeSlots;
};

/**
 * Calculates time until the given event, using the one after that as a fallback
 * @param {Event} event
 * @param {Event} fallbackEvent
 * @param {moment} now
 * @return {number} minutes until next event
 */
const calculateTimeUntilEvent = (event, fallbackEvent, now = moment()) => {
  const start = event.start.date ?
      moment(event.start.date) :
      moment(event.start.dateTime);

  const difference = start.diff(now, "minutes");

  if (difference > 0) {
    return difference;
  } else {
    const fallbackStart = fallbackEvent.start.date ?
        moment(fallbackEvent.start.date) :
        moment(fallbackEvent.start.dateTime);

    return fallbackStart.diff(now, "minutes");
  }
};

module.exports = { busyToFree, pairwise, freeAroundEvent, calculateTimeUntilEvent };
