const moment = require("moment");

function resDateConverter(date, time) {
  const dateComps = date.split(".");
  const timeComps = time.split(":");

  const year = dateComps[2];
  const month = dateComps[1];
  const day = dateComps[0];

  const hours = timeComps[0];
  const minutes = timeComps[1];

  return moment({
    years: year,
    months: month,
    date: day,
    hours: hours,
    minutes: minutes,
  }).toISOString();
};

module.exports = {resDateConverter};
