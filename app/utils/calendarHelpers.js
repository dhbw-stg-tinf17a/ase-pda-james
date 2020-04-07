const moment = require("moment");

const pairwise = (arr, func) => {
  for (let i = 0; i < arr.length - 1; i++) {
    func(arr[i], arr[i + 1]);
  }
};

const freeAroundEvent = (busySlot) => {
  const startTime = moment(busySlot.start);

  if (startTime.hours() >= 10) {
    return [
      {
        start: moment().hours(9).minutes(0).seconds(0).milliseconds(0).format(),
        end: moment(busySlot.start).format(),
      },
      {
        start: moment(busySlot.end).format(),
        end: moment().hours(17).minutes(0).seconds(0).milliseconds(0).format(),
      },
    ];
  } else {
    return [
      {
        start: moment(busySlot.end).format(),
        end: moment().hours(17).minutes(0).seconds(0).milliseconds(0).format(),
      },
    ];
  }
};

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
        freeSlots.push({start: current.end, end: next.start});
      });
  }

  return freeSlots;
};

const calculatTimeUntilEvent = (event, fallbackEvent, now = moment()) => {
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

module.exports = {busyToFree, pairwise, freeAroundEvent, calculatTimeUntilEvent};
