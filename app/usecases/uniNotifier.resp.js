module.exports = () => {
  this.firstResponse = "Ich schaue mal nach, wann Du los musst 😊";
  this.early = "Du hast die nächste Woche über keine Vorlesungen. Genieß' die Freiheit!";

  this.transitLate = (ttl) =>`Du bist spät dran. Die nächste Bahn zur Uni fährt in ${ttl} Minuten! Beeil dich!`;
  this.minutesLate = (mins) => `❗️ Du kommst voraussichtlich ca. <b>${mins} Minuten zu spät</b>.`;
  this.transitOnTime = (dep, start, arr, stop, duration, interchanges) => {
    return (
      `Du bist gut in der Zeit. Nimm die Bahn ${dep} von der Haltestelle ${start}. 
      Du kommst ${arr} an der Haltestelle ${stop} an.
      Die Fahrt dauert ${duration} Minuten. Du musst ${interchanges} mal umsteigen.`
    );
  };

  this.nonTransitOnTime = (dep) => {
    return (
      `Du bist gut in der Zeit. Mach' dich ${dep} auf den Weg zur Uni, dann bist Du püunktlich zur Vorlesung da!`
    );
  };
  this.nonTransitLate = (mins) => `Du bist spät dran! Mach' dich so schnell wie möglich auf den Weg zur Uni! \
      Du kommst voraussichtlich ca. ${mins} Minuten zu spät.`;
  this.googleMapsUrl = (url) => `Hier hast Du eine <b><a href="${url}">Routenbeschreibung</a> von Google Maps</b>. 🗺`;
  this.lectureEndsBeforeArrival = "Du schaffst es heute leider nicht mehr zur Vorlesung. " +
      "Versuche es beim nächsten man erneut.";
  this.calEmpty =`<b>Dein Vorlesungskalender hat keine anstehenden Vorlesungen eingetragen.</b> Trage Deine \
Vorlesungen in den verlinkten Google Kalender oder ändere Deinen Vorlesungskalender, \
indem Du <b>/start</b> ausführst.`;
  return this;
};
