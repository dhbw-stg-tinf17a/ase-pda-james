const moment = require("moment");
const preferences = require("../services/preferences")();

const createEmailText = (absentTime, absentReason) => {
  let name;
  preferences.get("name").then((res) => {
    name = res;
  });
  if (this.absentReason === "Krankheit") {
    return `
        <p>Guten Tag,</p></br> 
        <p>Ich kann am ${absentTime.startAbsentDay} von ${absentTime.startAbsentTime} bis 
        ${absentTime.endAbsentTime} aufgrund von ${absentReason} die Vorlesungen nicht besuchen.</p></br>
        <p> Mit freundlichen Grüßen</p></br> 
        <p>${name}</p>
    `;
  } else {
    return `
        <p>Guten Tag,</p></br> 
        <p>Ich kann am ${absentTime.startAbsentDay} von ${absentTime.startAbsentTime} bis 
        ${absentTime.endAbsentTime} aufgrund eines ${absentReason} die Vorlesungen nicht besuchen.</p></br>
        <p> Mit freundlichen Grüßen</p></br> 
        <p>${name}</p>
    `;
  }
};

const createEmailOptions = (emailText) => {
  let recipient;
  preferences.get("uni_email").then((res) => {
    recipient = res;
  });
  return {
    recipient: recipient,
    subject: "Abwesenheit",
    htmlText: emailText,
  };
};

const setAbsentTimes = (waRes) => {
  const startAbsentDay = waRes.context.startAbsentDay;
  const endAbsentDay = waRes.context.endAbsentDay;
  const startAbsentTime = waRes.context.startAbsentTime;
  const endAbsentTime = waRes.context.endAbsentTime;
  const today = moment().format("YYYY-MM-DD");
  if (!startAbsentDay) {
    startAbsentDay = today;
    endAbsentDay = today;
  }
  if (!endAbsentDay) {
    endAbsentDay = startAbsentDay;
  }
  if (startAbsentTime !== null && endAbsentTime !== null) {
    startAbsent = startAbsentDay + "T" + startAbsentTime + "+02:00";
    endAbsent = endAbsentDay + "T" + endAbsentTime + "+02:00";
  } else if (startAbsentTime !== null && endAbsentTime === null) {
    startAbsent = startAbsentDay + "T" + startAbsentTime + "+02:00";
    endAbsent = endAbsentDay + "T" + "22:30:00" + "+02:00";
  } else {
    startAbsent = startAbsentDay + "T" + "06:00:00" + "+02:00";
    endAbsent = endAbsentDay + "T" + "22:30:00" + "+02:00";
  }
  return {startAbsent, endAbsent};
};

module.exports = {
  createEmailOptions,
  createEmailText,
  setAbsentTimes,
};


