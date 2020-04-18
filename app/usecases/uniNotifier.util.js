const moment = require("moment");

module.exports = () => {
  // checks if public transportation cannot be met anymore
  this.transitLate = (timeParams) => {
    return moment(timeParams.depTime)
        .subtract(timeParams.depBuffer, "minutes")
        .isSameOrBefore(moment(timeParams.currentTime));
  };

  // checks if the lecture cannot be attended on time based on commute duration
  this.nonTransitLate = (timeParams) => {
    return moment(timeParams.lectureStart)
        .subtract(timeParams.commuteDuration + timeParams.arrBuffer, "minutes")
        .isSameOrBefore(moment(timeParams.currentTime));
  };

  this.lectureEndsOnArrival = (timeParams) => {
    return moment(timeParams.lectureEnd)
        .subtract(timeParams.commuteDuration + timeParams.arrBuffer, "minutes")
        .isSameOrBefore(moment(timeParams.currentTime));
  };

  // checks if lecture start occurs later than in six days (next weekday speakable)
  this.early = (timeParams) => {
    return moment(timeParams.lectureStart)
        .isAfter(moment(timeParams.currentTime)
            .add(6, "days")
            .endOf("day"));
  };

  // returns speakable departure and arrival times for transit
  this.getSpeakableTimes = (depTime, arrTime) => {
    return {
      dep: moment(depTime).calendar(moment(), {
        sameDay: "[um] HH [Uhr] m",
        nextWeek: "[am] dddd [um] HH [Uhr] m",
        nextDay: "[morgen um] HH [Uhr] m"}),
      arr: moment(arrTime).calendar(moment(), {
        sameDay: "[um] HH [Uhr] m",
        nextWeek: "[am] dddd [um] HH [Uhr] m",
        nextDay: "[um] HH [Uhr] m"}),
    };
  };

  // returns speakable departure time for non-transit
  this.getSpeakableDeparture = (timeParams) => {
    return moment(timeParams.lectureStart)
        .subtract((timeParams.arrBuffer + timeParams.commuteDuration), "minutes")
        .calendar(timeParams.currentTime, {
          sameDay: "[um] HH [Uhr] m",
          nextWeek: "[am] dddd [um] HH [Uhr] m",
          nextDay: "[um] HH [Uhr] m"},
        );
  };

  this.printItinerary = (trip) => {
    let itinerary = "<b>Zusammenfassung deiner Fahrt: 🚋</b>\n\n";
    trip.legs.forEach((leg) => {
      const start = `<b>Abfahrt</b> von Haltestelle <b>${leg.start.stopName}</b> um \
<b>${moment(leg.start.date).format("HH:mm")} Uhr</b>.\n`;
      const mode = `<b>Beförderungsmittel</b>: ${leg.mode.type} <b>${leg.mode.code}</b> Richtung \
${leg.mode.destination}.\n`;
      const stop = `<b>Ankunft</b> an Haltestelle <b>${leg.end.stopName}</b> um \
<b>${moment(leg.end.date).format("HH:mm")} Uhr</b>.\n\n`;

      itinerary = itinerary.concat(start, mode, stop);
    });
    return itinerary;
  };

  this.minutesLate = (arrTime, lectureStart) => {
    return moment(arrTime).diff(lectureStart, "minutes");
  };

  return this;
};
