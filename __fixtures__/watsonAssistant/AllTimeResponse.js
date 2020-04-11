module.exports={
  "generic": [
    {
      "response_type": "text",
      "text": "absent_reason_sick",
    },
  ],
  "intents": [
    {
      "intent": "absent_welcome",
      "confidence": 0.9990861892700196,
    },
  ],
  "entities": [
    {
      "entity": "sys-date",
      "location": [
        9,
        14,
      ],
      "value": "2020-04-03",
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
        25,
      ],
      "value": "14:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 13,
        "granularity": "hour",
        "range_modifier": "from",
        "calendar_type": "GREGORIAN",
      },
      "role": {
        "type": "time_from",
        "confidence": 1,
      },
    },
    {
      "entity": "sys-date",
      "location": [
        30,
        36,
      ],
      "value": "2020-04-04",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "relative_day": 1,
        "granularity": "day",
        "datetime_link": "datetime_30_46",
        "calendar_type": "GREGORIAN",
      },
    },
    {
      "entity": "sys-time",
      "location": [
        37,
        46,
      ],
      "value": "15:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 14,
        "granularity": "hour",
        "datetime_link": "datetime_30_46",
        "calendar_type": "GREGORIAN",
      },
    },
    {
      "entity": "absent_reason",
      "location": [
        73,
        78,
      ],
      "value": "Krankheit",
      "confidence": 1,
    },
  ],
  "context": {
    "absentReason": "Krankheit",
    "startAbsentDay": "2020-04-03",
    "endAbsentDay": "2020-04-04",
    "startAbsentTime": "13:00:00",
    "endAbsentTime": "14:00:00",
  },
};
