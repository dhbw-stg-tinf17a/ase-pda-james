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
      "confidence": 0.8807627201080324,
    },
  ],
  "entities": [
    {
      "entity": "sys-date",
      "location": [
        9,
        14,
      ],
      "value": "2020-04-13",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "relative_day": 0,
        "granularity": "day",
        "calendar_type": "GREGORIAN",
      },
    },
    {
      "entity": "sys-time",
      "location": [
        15,
        24,
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
    "startAbsentDay": "2020-04-13",
    "startAbsentTime": "13:00:00",
  },
};
