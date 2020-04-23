module.exports = () => {
  this.start = "<b>Hallo! Mein Name ist James. </b>🎩\nIch bin Dein Begleiter für alle Deine wichtigen" +
      " Angelegenheiten. Damit Du mich richtig verwenden kannst und ich Dir behilflich sein kann, brauche ich ein" +
      " paar Informationen über Dich! Sollte währenddessen etwas schieflaufen oder Du hast etwas falsch eingegeben," +
      " kannst Du diesen Prozess mit dem Befehl <b>/start</b> einfach von vorne beginnen!\n\nWir beginnen mit etwas" +
      " Einfachem: <b>Wie heißt Du?</b> 😊 [Vorname]";

  this.name = (name) => `<b>Hallo ${name}! Schön, dass Du da bist.</b> 👍🏼\nWeiter geht's! Ich möchte Dir manchmal ` +
      "E-Mails als Zusammenfassungen unserer Gespräche schicken, damit für Dich alles übersichtlich bleibt.\n" +
      "<b>Wie lautet Deine E-Mail-Adresse?</b> 📧";

  this.email = (email) => `Gut, das hätten wir! Ich habe <b>${email}</b> gespeichert.\n\nIch möchte Dich auch in ` +
      "Deinem Alltag und in Deiner Umgebung unterstützen. <b>Dafür brauche ich Deine Adresse zuhause.</b> 🏡 " +
      "[Straße, Hausnummer, (Ort)]";

  this.address = (address) => `Perfekt! Ich habe <b>${address}</b> als Deine Heimatadresse gespeichert! 👌`;

  this.uni = "Zu Deiner Umgebung gehört auch Dein Studienort. <b>Wo studierst Du?</b> 🎓";

  this.uniAddress = (address) => `Perfekt! Ich habe <b>${address}</b> als Deine Uni-Adresse gespeichert! 👌`;

  this.uniEmail = "Ich bin Dein <b>ganz persönlicher Assistent</b>. Um Dir so viel Arbeit wie möglich abzunehmen," +
      " brauche ich die E-Mail-Adresse Deines Sekretariats an der Uni, damit ich in deinem Namen E-Mails verschicken" +
      " kann. Daher: <b>Wie lautet die E-Mail-Adresse Deines Sekretariats?</b> 📧";

  this.cal = "Zu guter Letzt benötige ich als guter persönlicher Assistent auch den <b>vollen Überblick über Deine" +
      " Termine</b>. Damit ich Zugriff auf diese habe, bitte ich Dich, <b>Dich mit dem Link bei Google zu" +
      " authentifizieren! </b> 👍🏼";

  this.examples = "Sooo... der anstrengende Teil ist hinter uns! <b>Du kannst anfangen, mir Fragen zu stellen, auf" +
      " welche ich mit größtem Vergnügen antworten werde!</b> 😊\n\n" +
      "<b> Ich stehe Dir bei folgenden Angelegenheiten stets zur Seite:</b> 💪🏼\n" +
      "- ⏱ Abfahrt zur Uni: <b>'Wann muss ich los zur Uni?'</b>\n" +
      "- 🚪 Abwesenheit übermitteln: <b>'Ich bin krank!'</b>\n" +
      "- 🍔 Essen gehen: <b>'Ich habe Hunger!'</b>\n" +
      "- 📚 Recherchieren: <b>'Ich will lernen!'</b>\n" +
      "- ✅ Aufgaben erledigen: <b>'Wann muss ich noch machen?'</b>\n\n" +
      "Fang' gleich an! <b>Ich stehe zu Deinen Diensten!</b> 🎩";

  return this;
};
