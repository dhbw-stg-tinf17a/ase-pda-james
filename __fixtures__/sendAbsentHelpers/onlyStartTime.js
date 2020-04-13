module.exports = {
  "generic": [
    {
      "response_type": "text",
      "text": "absent_welcome",
    },
  ],
  "intents": [
    {
      "intent": "absent_welcome",
      "confidence": 0.7236123085021973,
    },
  ],
  "entities": [
    {
      "entity": "sys-time",
      "location": [
        9,
        18,
      ],
      "value": "13:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 13,
        "granularity": "hour",
        "range_modifier": "starting",
        "calendar_type": "GREGORIAN",
      },
      "role": {
        "type": "time_from",
        "confidence": 1,
      },
    },
  ],
  "context": {
    "startAbsentTime": "13:00:00",
  },
};
