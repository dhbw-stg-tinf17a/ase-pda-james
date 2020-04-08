function uniNotifier() {
  this.firstResponse = "Ich schaue mal nach, wann Du los musst";
  this.early = "Du hast die nächste Woche über keine Vorlesungen. Genieß' die Freiheit!";

  this.transitLate = "Du bist spät dran. Nimm die nächstmögliche Bahn zur Uni";
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
  this.nonTransitLate = "Du bist spät dran! Mach' dich so schnell wie möglich auf den Weg zur Uni!";

  this.googleMapsUrl = "Hier hast Du eine Routenbeschreibung von Google Maps.";

  return this;
}

module.exports = {uniNotifier};
