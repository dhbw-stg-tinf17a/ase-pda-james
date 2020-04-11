module.exports = {
  "status": 200,
  "statusText": "OK",
  "headers": {
    "content-type": "application/json; charset=utf-8",
    "content-length": "476",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
    "access-control-allow-headers": "Content-Type, Content-Length, Authorization, X-Watson-Authorization-Token, X-WDC-PL-OPT-OUT, X-Watson-UserInfo, X-Watson-Learning-Opt-Out, X-Watson-Metadata",
    "access-control-max-age": "3600",
    "content-security-policy": "default-src 'none'",
    "x-dns-prefetch-control": "off",
    "x-frame-options": "SAMEORIGIN",
    "strict-transport-security": "max-age=31536000; includeSubDomains;",
    "x-download-options": "noopen",
    "x-content-type-options": "nosniff",
    "x-xss-protection": "1; mode=block",
    "x-watson-session-timeout": "session_timeout=300",
    "x-response-time": "83.434ms",
    "x-global-transaction-id": "4dcf2885216361a4eac9e3e98a9fd7c2",
    "x-dp-watson-tran-id": "4dcf2885216361a4eac9e3e98a9fd7c2",
    "x-edgeconnect-midmile-rtt": "0",
    "x-edgeconnect-origin-mex-latency": "107",
    "date": "Thu, 02 Apr 2020 11:44:09 GMT",
    "connection": "close",
  },
  "result": {
    "output": {
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
    },
    "context": {
      "global": {
        "system": {
          "turn_count": 1,
        },
      },
      "skills": {
        "main skill": {
          "user_defined": {
            "test": "Abbrechen 12355 13 Uhr",
            "hallo": "13:00:00",
          },
          "system": {

          },
        },
      },
    },
  },
};
