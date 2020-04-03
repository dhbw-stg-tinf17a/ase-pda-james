module.exports = {

  "generic": [
    {
      "response_type": "text",
      "text": "cancel",
    },
  ],
  "intents": [
    {
      "intent": "cancel",
      "confidence": 0.9539339542388916,
    },
  ],
  "entities": [
    {
      "entity": "sys-time",
      "location": [
        16,
        22,
      ],
      "value": "13:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 13,
        "granularity": "hour",
        "calendar_type": "GREGORIAN",
      },
    },
  ],
  "context": {
    "test": "Abbrechen 12355 13 Uhr",
    "hallo": "13:00:00",
  },
};
