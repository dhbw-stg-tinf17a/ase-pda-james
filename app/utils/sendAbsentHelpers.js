const moment = require("moment");
const preferences = require("../services/preferences")();
const watsonAssisstant = require("../services/watsonAssistant")();

const createEmailText = (absentTime, absentReason) => {
  let name;
  preferences.get("name")
      .then((res) => {
        name = res;
      })
      .catch(()=> name = "James");
  if (absentReason === "Krankheit") {
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
  recipient = "melanie@stach24.de";
  preferences.get("uni_email")
      .then((res) => {
        recipient = res;
      });

  return {
    recipient: recipient,
    subject: "Abwesenheit",
    htmlText: emailText,
  };
};

const setAbsentTimes = (waRes) => {
  let startAbsentDay = waRes.context.startAbsentDay;
  let endAbsentDay = waRes.context.endAbsentDay;
  let startAbsentTime = waRes.context.startAbsentTime;
  let endAbsentTime = waRes.context.endAbsentTime;
  const today = moment().format("YYYY-MM-DD");
  if (!startAbsentDay) {
    startAbsentDay = today;
    endAbsentDay = today;
  }
  if (!endAbsentDay) {
    endAbsentDay = startAbsentDay;
  }
  if (startAbsentTime == null && endAbsentTime == null) {
    startAbsentTime = "06:00:00";
    endAbsentTime = "22:30:00";
  } else if (startAbsentTime !== null && endAbsentTime == null) {
    endAbsentTime="22:30:00";
  }
  startAbsent = startAbsentDay + "T" + startAbsentTime + "+02:00";
  endAbsent = endAbsentDay + "T" + endAbsentTime + "+02:00";
  watsonAssisstant.setContext({
    startAbsentDay: null,
    endAbsentDay: null,
    startAbsentTime: null,
    endAbsentTime: null,
  }).catch((err) => console.error(err));
  return {startAbsent, endAbsent, startAbsentDay, endAbsentDay, startAbsentTime, endAbsentTime};
};

module.exports = {
  createEmailOptions,
  createEmailText,
  setAbsentTimes,
};


