module.exports = {
  "generic": [
    {
      "response_type": "text",
      "text": "anything_error",
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
        27,
      ],
      "value": "2020-04-13",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "relative_day": 0,
        "granularity": "day",
        "range_link": "date_range_9_27",
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
        27,
      ],
      "value": "2020-04-15",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "granularity": "day",
        "range_link": "date_range_9_27",
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
    {
      "entity": "sys-time",
      "location": [
        28,
        45,
      ],
      "value": "13:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 13,
        "granularity": "hour",
        "range_link": "time_range_28_45",
        "calendar_type": "GREGORIAN",
      },
      "role": {
        "type": "time_from",
        "confidence": 1,
      },
    },
    {
      "entity": "sys-time",
      "location": [
        28,
        45,
      ],
      "value": "14:00:00",
      "confidence": 1,
      "interpretation": {
        "timezone": "GMT",
        "specific_hour": 14,
        "granularity": "hour",
        "range_link": "time_range_28_45",
        "calendar_type": "GREGORIAN",
      },
      "role": {
        "type": "time_to",
        "confidence": 1,
      },
    },
  ],
  "context": {
    "startAbsentDay": "2020-04-13",
    "endAbsentDay": "2020-04-15",
    "startAbsentTime": "13:00:00",
    "endAbsentTime": "14:00:00",
  },
};
