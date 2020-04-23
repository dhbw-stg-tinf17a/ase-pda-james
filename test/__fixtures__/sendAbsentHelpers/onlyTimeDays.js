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
      "confidence": 0.8673464775085449,
    },
  ],
  "entities": [
    {
      "entity": "sys-date",
      "location": [
        9,
        31,
      ],
      "value": "2020-04-13",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "relative_day": 0,
        "granularity": "day",
        "range_link": "date_range_9_31",
        "calendar_type": "GREGORIAN",
      },
      "role": {
        "type": "date_from",
        "confidence": 1,
      },
    },
    {
      "entity": "sys-date",
      "location": [
        9,
        31,
      ],
      "value": "2020-04-15",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "granularity": "day",
        "range_link": "date_range_9_31",
        "calendar_type": "GREGORIAN",
        "specific_day_of_week": "wednesday",
      },
      "alternatives": [
        {
          "value": "2020-04-08",
          "confidence": 1,
        },
      ],
      "role": {
        "type": "date_to",
        "confidence": 1,
      },
    },
  ],
  "context": {
    "startAbsentDay": "2020-04-13",
    "endAbsentDay": "2020-04-15",
  },
};
