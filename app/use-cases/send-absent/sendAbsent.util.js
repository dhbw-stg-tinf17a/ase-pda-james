const moment = require("moment");
const watsonAssisstant = require("../../modules/watson-assistant/watsonAssistant")();

const createEmailText = async (preferences, absentTime, absentReason) => {
  const name = await preferences.get("name");

  if (absentReason === "Krankheit") {
    return `<p>Guten Tag,</p></br>
    <p>Ich kann am ${absentTime.startAbsentDay} von ${absentTime.startAbsentTime} bis
    ${absentTime.endAbsentTime} aufgrund von ${absentReason} die Vorlesungen nicht besuchen.</p></br>
    <p> Mit freundlichen Grüßen</p></br>
    <p>${name}</p>`;
  } else {
    return `<p>Guten Tag,</p></br>
    <p>Ich kann am ${absentTime.startAbsentDay} von ${absentTime.startAbsentTime} bis
    ${absentTime.endAbsentTime} aufgrund eines ${absentReason} die Vorlesungen nicht besuchen.</p></br>
    <p> Mit freundlichen Grüßen</p></br>
    <p>${name}</p>`;
  }
};

const createEmailOptions = async (preferences, emailText) => {
  const recipient = await preferences.get("uni_email");
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
    endAbsentTime = "22:30:00";
  }
  const startAbsent = `${startAbsentDay }T${ startAbsentTime }+02:00`;
  const endAbsent = `${endAbsentDay }T${ endAbsentTime }+02:00`;
  watsonAssisstant.setContext({
    startAbsentDay: null,
    endAbsentDay: null,
    startAbsentTime: null,
    endAbsentTime: null,
  }).catch((err) => console.error(err));
  return { startAbsent, endAbsent, startAbsentDay, endAbsentDay, startAbsentTime, endAbsentTime };
};

module.exports = {
  createEmailOptions,
  createEmailText,
  setAbsentTimes,
};


