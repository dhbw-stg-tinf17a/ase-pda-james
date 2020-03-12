function apiDateConverter(date) {
  console.log("here");
  const apiYear = date.getFullYear();
  const apiMonth = () => {
    const monthAsString = (date.getMonth() + 1).toString();
    if (monthAsString.length == 1) {
      return `0${monthAsString}`;
    }
    return monthAsString;
  };
  const apiDay = () => {
    const dayAsString = date.getDate().toString();
    if (dayAsString.length == 1) {
      return `0${dayAsString}`;
    }
    return dayAsString;
  };
  return `${apiYear}${apiMonth()}${apiDay()}`;
}

function apiTimeConverter(date) {
  const apiHours = () => {
    console.log("here");
    const hourAsString = date.getHours().toString();
    if (hourAsString.length == 1) {
      return `0${hourAsString}`;
    }
    return hourAsString;
  };

  const apiMinutes = () => {
    console.log("here");
    const minutesAsString = date.getMinutes().toString();
    if (minutesAsString.length == 1) {
      return `0${minutesAsString}`;
    }
    return minutesAsString;
  };
  return `${apiHours()}${apiMinutes()}`;
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

module.exports = {apiDateConverter, apiTimeConverter, resDateConverter};
