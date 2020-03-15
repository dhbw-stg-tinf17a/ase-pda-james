function dateCompToString(date, type) {
  let compAsString;
  switch (type) {
    case "month":
      compAsString = (date.getMonth() + 1).toString();
      break;
    case "day":
      compAsString = date.getDate().toString();
      break;
    case "hours":
      compAsString = date.getHours().toString();
      break;
    case "minutes":
      compAsString = date.getMinutes().toString();
      break;
    default:
      return new Error("Date Component Type invalid");
  }

  if (compAsString.length == 1) {
    return `0${compAsString}`;
  }
  return compAsString;
}

function apiDateConverter(date, part) {
  if (part == "date") {
    const apiYear = date.getFullYear();
    const apiMonth = dateCompToString(date, "month");
    const apiDay = dateCompToString(date, "day");

    return `${apiYear}${apiMonth}${apiDay}`;
  } else if (part == "time") {
    const apiHours = dateCompToString(date, "hours");
    const apiMinutes = dateCompToString(date, "minutes");

    return `${apiHours}${apiMinutes}`;
  }

  return new Error("Date Part invalid");
}

function resDateConverter(date, time) {
  const dateComps = date.split(".");
  const timeComps = time.split(":");

  const year = dateComps[2];
  const month = dateComps[1];
  const day = dateComps[0];

  const hours = timeComps[0];
  const minutes = timeComps[1];

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

module.exports = {apiDateConverter, resDateConverter};
