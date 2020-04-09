/* eslint-disable */
module.exports = {
    "parameters": [
        {
            "name": "serverID",
            "value": "efa-static04.dc.vvs.de_"
        },
        {
            "name": "requestID",
            "value": "0"
        },
        {
            "name": "sessionID",
            "value": "0"
        },
        {
            "name": "calcTime",
            "value": "433.893"
        },
        {
            "name": "serverTime",
            "value": "2020-04-08T15:05:30"
        }
    ],
    "itdMessageList": [
        {
            "message": [
                {
                    "name": "code",
                    "value": "-10015"
                },
                {
                    "name": "error",
                    "value": "itp"
                },
                {
                    "name": "type",
                    "value": "warning"
                },
                {
                    "name": "module",
                    "value": "BROKER"
                }
            ]
        }
    ],
    "origin": {
        "input": {
            "input": "5000355"
        },
        "points": {
            "point": {
                "usage": "origin",
                "type": "any",
                "name": "Stuttgart, Wallgraben",
                "stateless": "5000355",
                "anyType": "stop",
                "sort": "2",
                "quality": "100000",
                "best": "0",
                "object": "Wallgraben",
                "ref": {
                    "id": "5000355",
                    "gid": "de:08111:355",
                    "omc": "8111000",
                    "placeID": "51",
                    "place": "Stuttgart",
                    "coords": "3509291.00000,761164.00000"
                },
                "infos": null
            }
        },
        "itdOdvAssignedStops": {
            "stopID": "5000355",
            "name": "Wallgraben",
            "x": "3509291",
            "y": "761164",
            "mapName": "NBWT",
            "value": "5000355:Wallgraben",
            "place": "Stuttgart",
            "nameWithPlace": "Wallgraben",
            "distanceTime": "0",
            "isTransferStop": "0",
            "vm": "100",
            "gid": "de:08111:355"
        }
    },
    "destination": {
        "input": {
            "input": "5006056"
        },
        "points": {
            "point": {
                "usage": "destination",
                "type": "any",
                "name": "Stuttgart, Stadtmitte",
                "stateless": "5006056",
                "anyType": "stop",
                "sort": "2",
                "quality": "100000",
                "best": "0",
                "object": "Stadtmitte",
                "ref": {
                    "id": "5006056",
                    "gid": "de:08111:6056",
                    "omc": "8111000",
                    "placeID": "51",
                    "place": "Stuttgart",
                    "coords": "3512794.00000,755672.00000"
                },
                "infos": {
                    "info": {
                        "infoLinkText": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                        "infoLinkURL": "https://ems.vvs.de/ems.comm.addinfo-info_link?event=cf7f6a8d699b44adba17a69308e4d5f9&device=60551f5633ff432eac9572c79a1c7f87&mt=html",
                        "infoText": {
                            "content": "Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn) bis auf Weiteres außer Betrieb.",
                            "subtitle": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                            "subject": "Haltestelle Stadtmitte",
                            "additionalText": "TextType: 6b9e957670424d449033ba49fe42aed8",
                            "htmlText": "<div class=\"ems-event\">\n<div><div class=\"event\"> Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn)  bis auf Weiteres  außer Betrieb.    </div></div>\n</div>",
                            "wmlText": "",
                            "smsText": "Haltestelle Stadtmitte",
                            "speechText": ""
                        },
                        "paramList": [
                            {
                                "type": "addInfoParam",
                                "name": "publisher",
                                "value": "EMS",
                                "edit": "0"
                            },
                            {
                                "type": "system",
                                "name": "infoID",
                                "value": "41490",
                                "edit": "0"
                            },
                            {
                                "type": "system",
                                "name": "seqID",
                                "value": "1",
                                "edit": "0"
                            },
                            {
                                "type": "addInfoParam",
                                "name": "infoType",
                                "value": "stopInfo",
                                "edit": "0"
                            },
                            {
                                "type": "addInfoParam",
                                "name": "priority",
                                "value": "normal",
                                "edit": "0"
                            },
                            {
                                "type": "messageSubType",
                                "name": "stopInfo",
                                "value": "escalator_elevator",
                                "edit": "0"
                            }
                        ]
                    }
                }
            }
        },
        "itdOdvAssignedStops": {
            "stopID": "5006056",
            "name": "Stadtmitte",
            "x": "3512794",
            "y": "755672",
            "mapName": "NBWT",
            "value": "5006056:Stadtmitte",
            "place": "Stuttgart",
            "nameWithPlace": "Stadtmitte",
            "distanceTime": "0",
            "isTransferStop": "0",
            "vm": "100",
            "gid": "de:08111:6056"
        }
    },
    "via": {
        "input": {
            "input": ""
        },
        "points": null
    },
    "notVia": {
        "input": {
            "input": ""
        },
        "points": null
    },
    "addOdvs": null,
    "dateTime": {
        "deparr": "arr",
        "ttpFrom": "20191215",
        "ttpTo": "20201212",
        "year": "2020",
        "month": "4",
        "day": "2",
        "hour": "9",
        "minute": "0"
    },
    "option": {
        "ptOption": {
            "active": "-1",
            "maxChanges": "9",
            "maxTime": "360",
            "maxWait": "120",
            "routeType": "LEASTTIME",
            "changeSpeed": "normal",
            "lineRestriction": "400",
            "useProxFootSearch": "0",
            "useProxFootSearchOrigin": "0",
            "useProxFootSearchDestination": "0",
            "bike": "0",
            "plane": "0",
            "noCrowded": "0",
            "noSolidStairs": "0",
            "noEscalators": "0",
            "noElevators": "0",
            "lowPlatformVhcl": "0",
            "wheelchair": "0",
            "needElevatedPlt": "0",
            "assistance": "0",
            "SOSAvail": "0",
            "noLonelyTransfer": "0",
            "illumTransfer": "0",
            "overgroundTransfer": "0",
            "noInsecurePlaces": "0",
            "privateTransport": "0",
            "excludedMeans": [
                {
                    "means": "Zug",
                    "value": "0",
                    "selected": "0"
                },
                {
                    "means": "S-Bahn",
                    "value": "1",
                    "selected": "0"
                },
                {
                    "means": "U-Bahn",
                    "value": "2",
                    "selected": "0"
                },
                {
                    "means": "Stadtbahn",
                    "value": "3",
                    "selected": "0"
                },
                {
                    "means": "Straßen-/Trambahn",
                    "value": "4",
                    "selected": "0"
                },
                {
                    "means": "Stadtbus",
                    "value": "5",
                    "selected": "0"
                },
                {
                    "means": "Regionalbus",
                    "value": "6",
                    "selected": "0"
                },
                {
                    "means": "Schnellbus",
                    "value": "7",
                    "selected": "0"
                },
                {
                    "means": "Seil-/Zahnradbahn",
                    "value": "8",
                    "selected": "0"
                },
                {
                    "means": "Schiff",
                    "value": "9",
                    "selected": "0"
                },
                {
                    "means": "AST/Rufbus",
                    "value": "10",
                    "selected": "0"
                },
                {
                    "means": "Sonstige",
                    "value": "11",
                    "selected": "0"
                },
                {
                    "means": "Flugzeug",
                    "value": "12",
                    "selected": "0"
                },
                {
                    "means": "Zug (Nahverkehr)",
                    "value": "13",
                    "selected": "0"
                },
                {
                    "means": "Zug (Fernverkehr)",
                    "value": "14",
                    "selected": "0"
                },
                {
                    "means": "Zug Fernv m Zuschlag",
                    "value": "15",
                    "selected": "0"
                },
                {
                    "means": "Zug Fernv m spez Fpr",
                    "value": "16",
                    "selected": "0"
                },
                {
                    "means": "SEV Schienenersatzv",
                    "value": "17",
                    "selected": "0"
                },
                {
                    "means": "Zug Shuttle",
                    "value": "18",
                    "selected": "0"
                },
                {
                    "means": "Bürgerbus",
                    "value": "19",
                    "selected": "0"
                }
            ],
            "activeImp": "-1",
            "activeCom": "-1",
            "activeSec": "-1"
        }
    },
    "trips": [
        {
            "distance": "0",
            "duration": "00:20",
            "interchange": "1",
            "desc": "1",
            "optValue": "0",
            "legs": [
                {
                    "timeMinute": "3",
                    "points": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "platformName": "",
                            "plannedPlatformName": "",
                            "place": "Stuttgart",
                            "nameWithPlace": "Wallgraben",
                            "usage": "departure",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:13",
                                "timeSec": "08:13:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:13",
                                "rtTimeSec": "08:13:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "813",
                                "timeSec": "81300",
                                "rtDate": "20200402",
                                "rtTime": "813",
                                "rtTimeSec": "81300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A1.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uWall.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "platformName": "Gleis 12",
                            "plannedPlatformName": "Gleis 12",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:16",
                                "timeSec": "08:16:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:16",
                                "rtTimeSec": "08:16:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "816",
                                "timeSec": "81600",
                                "rtDate": "20200402",
                                "rtTime": "816",
                                "rtTimeSec": "81600"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A2.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1"
                            }
                        }
                    ],
                    "mode": {
                        "name": "Stadtbahn U3",
                        "number": "U3",
                        "symbol": "U3",
                        "product": "Stadtbahn",
                        "productId": "2",
                        "type": "1",
                        "code": "3",
                        "mtSubcode": "0",
                        "destination": "Vaihingen Bf",
                        "destID": "5006002",
                        "desc": "Plieningen - Möhringen - Vaihingen",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "20",
                            "line": "20003",
                            "supplement": " ",
                            "dir": "H",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:20003: :H:j20",
                            "tripCode": "59",
                            "operator": "SSB",
                            "opCode": "01",
                            "isTTB": "1",
                            "isSTT": "1",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:13",
                                "depDateTimeSec": "20200402 08:13:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Jurastraße",
                            "nameWO": "Jurastraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000356",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:356",
                                "areaGid": "de:08111:356:1",
                                "pointGid": "de:08111:356:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508699.00000,760949.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:15",
                                "arrDateTimeSec": "20200402 08:15:00",
                                "depDateTime": "20200402 08:15",
                                "depDateTimeSec": "20200402 08:15:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 12",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:16",
                                "arrDateTimeSec": "20200402 08:16:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "footpath": [
                        {
                            "position": "AFTER",
                            "duration": "2",
                            "dTM": "20",
                            "footpathElem": [
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "1",
                                    "lT": "-1",
                                    "level": "DOWN",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "3",
                                        "platform": "",
                                        "x": "3508318.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253087:31:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "x": "3508378.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    }
                                },
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "-1",
                                    "lT": "1",
                                    "level": "UP",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "platform": "",
                                        "x": "3508378.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "11",
                                        "x": "3508470.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253103:118:NBWT:100"
                                    }
                                }
                            ]
                        }
                    ],
                    "infos": null,
                    "format": "x,y",
                    "path": "3509291.05412,761162.56014 3509255.41310,761160.59495 3509239.77803,761159.84220 3509223.89988,761158.90077 3509209.29275,761156.88965 3509198.52763,761155.85081 3509187.41591,761154.31209 3509179.62934,761152.61224 3509170.41472,761150.43653 3509149.23762,761143.80984 3509081.83669,761119.29829 3509066.00849,761112.74049 3508998.66655,761087.84975 3508865.45541,761037.77439 3508847.84485,761029.65080 3508834.71442,761021.34219 3508827.92757,761014.24686 3508812.40775,760983.42300 3508807.69915,760973.88900 3508803.77594,760967.90121 3508800.18599,760963.31407 3508795.28639,760958.64001 3508789.74752,760954.45624 3508784.83645,760951.85060 3508779.66876,760949.80138 3508774.48746,760948.45276 3508767.42990,760946.92913 3508760.22687,760946.47329 3508740.48714,760945.56986 3508733.86652,760945.90263 3508717.23451,760947.02934 3508699.11729,760948.71432 3508699.11729,760948.71432 3508697.77854,760948.83871 3508679.17721,760951.46961 3508664.10760,760954.40639 3508658.41580,760955.94978 3508653.80578,760957.71390 3508649.11653,760960.57907 3508643.90546,760963.78977 3508636.66838,760969.91713 3508568.00915,761039.02457 3508538.60683,761065.48035 3508477.98549,761114.37970 3508436.17735,761145.09051 3508418.05409,761157.98402 3508401.05527,761170.13071 3508352.63648,761208.66844 3508318.84392,761237.76512",
                    "interchange": {
                        "desc": "Fussweg",
                        "type": "100",
                        "path": "3508318.00000,761237.00000 3508318.38653,761236.30453 3508340.50000,761217.18000 3508339.58000,761216.21000 3508348.44000,761208.77000 3508351.68000,761206.36000 3508357.45000,761212.59000 3508357.84000,761213.02000 3508369.90000,761226.44000 3508374.54000,761231.48000 3508384.22000,761242.01000 3508386.92000,761239.64000 3508388.63000,761239.42000 3508392.07000,761236.33000 3508394.25000,761238.68000 3508396.62000,761236.65000 3508400.69000,761233.03000 3508404.38000,761229.75000 3508407.57000,761226.91000 3508413.04000,761221.96000 3508429.88000,761206.70000 3508451.01000,761186.64000 3508453.33000,761184.43000 3508471.38576,761166.99475 3508470.00000,761171.00000"
                    },
                    "turnInst": [
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "LEAVE",
                            "name": "Ausstieg U-Bahn rechts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "28",
                            "dis": "0",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "0",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Vaihingen",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "229",
                            "tTime": "28",
                            "ctTime": "28",
                            "dis": "31",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "3",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Treppe abw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "230",
                            "tTime": "16",
                            "ctTime": "44",
                            "dis": "12",
                            "cDis": "43",
                            "niveau": "0",
                            "fPLIdx": "1",
                            "tPLIdx": "1",
                            "fPCIdx": "3",
                            "tPCIdx": "4",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "STAIRS"
                                }
                            ],
                            "coords": "3508340.00000,761216.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Weg im Geb�ude",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "233",
                            "tTime": "52",
                            "ctTime": "96",
                            "dis": "58",
                            "cDis": "101",
                            "dUp": "1",
                            "dDown": "0",
                            "niveau": "-1",
                            "fPLIdx": "2",
                            "tPLIdx": "7",
                            "fPCIdx": "4",
                            "tPCIdx": "12",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "BUILDING_WAY"
                                }
                            ],
                            "coords": "3508348.00000,761209.00000"
                        },
                        {
                            "dir": "SLIGHT_LEFT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Rolltreppe aufw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "228",
                            "tTime": "10",
                            "ctTime": "106",
                            "dis": "5",
                            "cDis": "106",
                            "niveau": "0",
                            "fPLIdx": "8",
                            "tPLIdx": "8",
                            "fPCIdx": "12",
                            "tPCIdx": "13",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "ESCALATOR"
                                }
                            ],
                            "coords": "3508389.00000,761239.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Bahnsteig",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "317",
                            "tTime": "95",
                            "ctTime": "201",
                            "dis": "108",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "9",
                            "tPLIdx": "10",
                            "fPCIdx": "13",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508392.00000,761236.00000"
                        },
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "ENTER",
                            "name": "Einstieg S-Bahn",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "201",
                            "dis": "0",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "10",
                            "tPLIdx": "10",
                            "fPCIdx": "24",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508470.00000,761171.00000"
                        }
                    ]
                },
                {
                    "timeMinute": "13",
                    "points": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "platformName": "Gleis 3",
                            "plannedPlatformName": "Gleis 3",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "departure",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:20",
                                "timeSec": "08:20:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:20",
                                "rtTimeSec": "08:20:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "820",
                                "timeSec": "82000",
                                "rtDate": "20200402",
                                "rtTime": "820",
                                "rtTimeSec": "82000"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A2.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "platformName": "Gleis 2",
                            "plannedPlatformName": "Gleis 2",
                            "place": "Stuttgart",
                            "nameWithPlace": "Stadtmitte",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:33",
                                "timeSec": "08:33:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:33",
                                "rtTimeSec": "08:33:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "833",
                                "timeSec": "83300",
                                "rtDate": "20200402",
                                "rtTime": "833",
                                "rtTimeSec": "83300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A3.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uroteb.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2"
                            }
                        }
                    ],
                    "mode": {
                        "name": "S-Bahn S2",
                        "number": "S2",
                        "symbol": "S2",
                        "product": "S-Bahn",
                        "productId": "0",
                        "type": "2",
                        "code": "1",
                        "mtSubcode": "0",
                        "destination": "Schorndorf",
                        "destID": "5007703",
                        "desc": "Filderstadt  - Flughafen/Messe - Stuttgart - Schorndorf",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "10",
                            "line": "10002",
                            "supplement": " ",
                            "dir": "R",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:10002: :R:j20",
                            "tripCode": "7212",
                            "operator": "DB",
                            "opCode": "10",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 3",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:20",
                                "depDateTimeSec": "20200402 08:20:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Österfeld",
                            "nameWO": "Österfeld",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006027",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6027",
                                "areaGid": "de:08111:6027:1",
                                "pointGid": "de:08111:6027:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-1"
                                    }
                                ],
                                "coords": "3508666.00000,759994.00000",
                                "niveau": "-1",
                                "arrDateTime": "20200402 08:22",
                                "arrDateTimeSec": "20200402 08:22:00",
                                "depDateTime": "20200402 08:22",
                                "depDateTimeSec": "20200402 08:22:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Universität",
                            "nameWO": "Universität",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006008",
                                "area": "2",
                                "platform": "2",
                                "gid": "de:08111:6008",
                                "areaGid": "de:08111:6008:2",
                                "pointGid": "de:08111:6008:2:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-3"
                                    }
                                ],
                                "coords": "3507863.00000,759150.00000",
                                "niveau": "-3",
                                "arrDateTime": "20200402 08:24",
                                "arrDateTimeSec": "20200402 08:24:00",
                                "depDateTime": "20200402 08:24",
                                "depDateTimeSec": "20200402 08:24:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Schwabstraße",
                            "nameWO": "Schwabstraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006052",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6052",
                                "areaGid": "de:08111:6052:1",
                                "pointGid": "de:08111:6052:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    },
                                    {
                                        "name": "AREA_NIVEAU_GIS",
                                        "value": " -3.00"
                                    }
                                ],
                                "coords": "3511583.00000,756369.00000",
                                "niveau": "-300",
                                "arrDateTime": "20200402 08:30",
                                "arrDateTimeSec": "20200402 08:30:00",
                                "depDateTime": "20200402 08:30",
                                "depDateTimeSec": "20200402 08:30:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Feuersee",
                            "nameWO": "Feuersee",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006221",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6221",
                                "areaGid": "de:08111:6221:1",
                                "pointGid": "de:08111:6221:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512269.00000,756091.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:31",
                                "arrDateTimeSec": "20200402 08:31:00",
                                "depDateTime": "20200402 08:32",
                                "depDateTimeSec": "20200402 08:32:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:33",
                                "arrDateTimeSec": "20200402 08:33:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "infos": {
                        "info": {
                            "infoLinkText": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                            "infoLinkURL": "https://ems.vvs.de/ems.comm.addinfo-info_link?event=cf7f6a8d699b44adba17a69308e4d5f9&device=60551f5633ff432eac9572c79a1c7f87&mt=html",
                            "infoText": {
                                "content": "Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn) bis auf Weiteres außer Betrieb.",
                                "subtitle": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                                "subject": "Haltestelle Stadtmitte",
                                "additionalText": "TextType: 6b9e957670424d449033ba49fe42aed8",
                                "htmlText": "<div class=\"ems-event\">\n<div><div class=\"event\"> Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn)  bis auf Weiteres  außer Betrieb.    </div></div>\n</div>",
                                "wmlText": "",
                                "smsText": "Haltestelle Stadtmitte",
                                "speechText": ""
                            },
                            "paramList": [
                                {
                                    "type": "addInfoParam",
                                    "name": "publisher",
                                    "value": "EMS",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "infoID",
                                    "value": "41490",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "seqID",
                                    "value": "1",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "infoType",
                                    "value": "stopInfo",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "priority",
                                    "value": "normal",
                                    "edit": "0"
                                },
                                {
                                    "type": "messageSubType",
                                    "name": "stopInfo",
                                    "value": "escalator_elevator",
                                    "edit": "0"
                                }
                            ]
                        }
                    },
                    "format": "x,y",
                    "path": "3508470.38307,761171.32793 3508510.34781,761133.01325 3508554.93753,761088.51940 3508565.14883,761078.70675 3508573.35379,761070.30942 3508622.52797,761022.38294 3508677.17306,760968.55374 3508679.65552,760965.85876 3508727.54667,760917.21050 3508744.93563,760896.68848 3508763.88417,760871.49338 3508780.22336,760847.87027 3508803.19995,760811.30363 3508817.46643,760784.38087 3508832.13964,760754.21026 3508851.44696,760705.11640 3508859.97680,760679.40356 3508866.69561,760652.88176 3508873.46673,760622.25642 3508877.72438,760597.86250 3508881.42797,760567.35318 3508883.05597,760545.47664 3508883.72678,760509.07825 3508878.80594,760439.44958 3508872.90699,760369.90028 3508869.82866,760339.67966 3508865.87809,760316.08823 3508855.16522,760277.07220 3508842.79656,760242.18446 3508834.80842,760223.67028 3508829.28778,760211.91348 3508826.35824,760206.00197 3508818.73680,760191.42385 3508805.96875,760168.98047 3508790.39597,760145.07353 3508778.09940,760127.66693 3508751.26388,760093.41316 3508740.05616,760080.71986 3508720.27877,760058.29828 3508719.66715,760057.58752 3508676.85361,760007.50031 3508665.78591,759994.76217 3508665.78591,759994.76217 3508654.81409,759982.15730 3508632.08835,759955.28063 3508589.94724,759906.19257 3508570.83963,759883.25790 3508534.69904,759842.20038 3508521.74548,759827.12951 3508486.61719,759788.66123 3508463.89756,759764.78640 3508443.04317,759743.69992 3508429.64407,759730.39766 3508372.24759,759678.45057 3508310.62472,759637.62963 3508192.25446,759563.64065 3508122.04747,759505.12630 3508094.37679,759473.41716 3508039.07714,759407.65199 3507978.37949,759330.85128 3507925.95495,759257.51897 3507904.59532,759224.75467 3507903.60700,759222.75437 3507881.48683,759187.64462 3507881.16969,759187.00008 3507880.95574,759186.52220 3507874.91713,759175.61032 3507863.12943,759150.39440 3507863.12943,759150.39440 3507853.78344,759130.40168 3507837.75685,759092.50312 3507831.52699,759076.14242 3507827.88841,759066.88411 3507825.67393,759061.00445 3507820.25685,759042.04041 3507789.94754,758897.00441 3507783.77538,758847.67128 3507780.43826,758747.78042 3507788.09896,758698.45039 3507830.59697,758566.39101 3507921.08655,758432.34006 3507993.42585,758372.22035 3508075.71613,758319.61401 3508507.69686,758066.83064 3508533.72553,758051.58946 3509135.42517,757691.03969 3509280.65694,757604.57322 3509365.83749,757553.19965 3509366.54993,757552.75364 3509558.08969,757446.60819 3509714.91718,757355.64020 3510045.06583,757159.46057 3510229.38457,757050.66936 3510598.44848,756832.77868 3510827.89678,756696.98169 3510911.95555,756653.92703 3510964.68858,756629.05885 3511093.24428,756572.50302 3511101.35372,756569.38436 3511118.71847,756562.71104 3511175.44704,756540.70206 3511266.98613,756502.30891 3511392.09801,756443.28433 3511415.57855,756433.27262 3511478.95520,756410.27955 3511482.19440,756409.03854 3511522.30494,756393.15406 3511582.85499,756368.70881 3511582.85499,756368.70881 3511615.48744,756355.53025 3511671.09422,756333.30726 3511673.52542,756332.39032 3511687.68593,756326.72274 3511774.88675,756287.50735 3511825.66717,756267.35024 3511876.00655,756247.36042 3512025.74458,756187.88025 3512055.40836,756176.11779 3512111.11715,756155.10233 3512123.89646,756150.17058 3512148.55973,756140.99839 3512150.48407,756140.30475 3512240.82919,756103.11034 3512265.06404,756093.16013 3512269.05918,756091.55004 3512269.05918,756091.55004 3512364.69883,756052.74068 3512417.49503,756025.32312 3512450.13631,756011.27225 3512519.38377,755981.47078 3512550.28502,755961.96300 3512576.99538,755938.71680 3512616.67827,755902.20784 3512628.72975,755891.12688 3512661.47813,755850.18496 3512672.53423,755837.81616 3512723.63511,755780.65195 3512726.95466,755776.22955 3512751.60552,755743.33451 3512771.89613,755716.27647 3512791.36585,755690.31004 3512800.10776,755678.65797"
                }
            ],
            "itdFare": {
                "fares": {
                    "fare": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "unitName": "Zone",
                        "fareAdult": "2.60",
                        "fareChild": "1.30",
                        "unitsAdult": "1",
                        "unitsChild": "1",
                        "fareBikeAdult": "",
                        "fareBikeChild": "",
                        "unitsBikeAdult": "",
                        "unitsBikeChild": "",
                        "levelAdult": "",
                        "levelChild": "",
                        "idAdult": "1",
                        "idChild": "8",
                        "note": "",
                        "genericTicketGroups": [
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTicket Mobil"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "2.50"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "1.22"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "15"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "22"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "4er-Ticket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "4.90"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "30"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "37"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "183"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "188"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.40"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "193"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "198"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "WochenTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "23.30"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "50"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "69.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "57"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "690.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "64"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "824.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "71"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket für Schüler, Auszubildende, Studenten"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "49.20"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "78"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "656.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "89"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "54.63"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "96"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "783.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "103"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "65.23"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "110"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "621.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "139"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "51.75"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "146"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "741.60"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "153"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "61.80"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "160"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "StudiTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "Netz"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "207.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "138"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "tickets": {
                    "ticket": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "weekAdult": "",
                        "weekChild": "",
                        "monthAdult": "",
                        "monthChild": "",
                        "weekEducation": "",
                        "monthEducation": "",
                        "yearAdults": "",
                        "yearChildren": "",
                        "yearStudents": "",
                        "dayAdults": "",
                        "dayChildren": "",
                        "dayStudents": "",
                        "levelAdult": "1",
                        "levelChild": "1",
                        "genericTickets": null
                    }
                },
                "tariffZones": {
                    "tariffZone": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "neutralZone": "",
                        "zones": {
                            "zone": {
                                "zoneElems": {
                                    "zoneElem": {
                                        "zone": "1"
                                    }
                                }
                            }
                        }
                    }
                },
                "specialTickets": null
            },
            "attrs": []
        },
        {
            "distance": "0",
            "duration": "00:20",
            "interchange": "1",
            "desc": "1",
            "optValue": "0",
            "legs": [
                {
                    "timeMinute": "3",
                    "points": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "platformName": "",
                            "plannedPlatformName": "",
                            "place": "Stuttgart",
                            "nameWithPlace": "Wallgraben",
                            "usage": "departure",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:23",
                                "timeSec": "08:23:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:23",
                                "rtTimeSec": "08:23:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "823",
                                "timeSec": "82300",
                                "rtDate": "20200402",
                                "rtTime": "823",
                                "rtTimeSec": "82300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A5.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uWall.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "platformName": "Gleis 12",
                            "plannedPlatformName": "Gleis 12",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:26",
                                "timeSec": "08:26:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:26",
                                "rtTimeSec": "08:26:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "826",
                                "timeSec": "82600",
                                "rtDate": "20200402",
                                "rtTime": "826",
                                "rtTimeSec": "82600"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A6.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1"
                            }
                        }
                    ],
                    "mode": {
                        "name": "Stadtbahn U3",
                        "number": "U3",
                        "symbol": "U3",
                        "product": "Stadtbahn",
                        "productId": "2",
                        "type": "1",
                        "code": "3",
                        "mtSubcode": "0",
                        "destination": "Vaihingen Bf",
                        "destID": "5006002",
                        "desc": "Plieningen - Möhringen - Vaihingen",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "20",
                            "line": "20003",
                            "supplement": " ",
                            "dir": "H",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:20003: :H:j20",
                            "tripCode": "62",
                            "operator": "SSB",
                            "opCode": "01",
                            "isTTB": "1",
                            "isSTT": "1",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:23",
                                "depDateTimeSec": "20200402 08:23:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Jurastraße",
                            "nameWO": "Jurastraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000356",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:356",
                                "areaGid": "de:08111:356:1",
                                "pointGid": "de:08111:356:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508699.00000,760949.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:25",
                                "arrDateTimeSec": "20200402 08:25:00",
                                "depDateTime": "20200402 08:25",
                                "depDateTimeSec": "20200402 08:25:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 12",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:26",
                                "arrDateTimeSec": "20200402 08:26:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "footpath": [
                        {
                            "position": "AFTER",
                            "duration": "2",
                            "dTM": "20",
                            "footpathElem": [
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "1",
                                    "lT": "-1",
                                    "level": "DOWN",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "3",
                                        "platform": "",
                                        "x": "3508318.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253087:31:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "x": "3508378.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    }
                                },
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "-1",
                                    "lT": "1",
                                    "level": "UP",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "platform": "",
                                        "x": "3508378.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "11",
                                        "x": "3508470.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253103:118:NBWT:100"
                                    }
                                }
                            ]
                        }
                    ],
                    "infos": null,
                    "format": "x,y",
                    "path": "3509291.05412,761162.56014 3509255.41310,761160.59495 3509239.77803,761159.84220 3509223.89988,761158.90077 3509209.29275,761156.88965 3509198.52763,761155.85081 3509187.41591,761154.31209 3509179.62934,761152.61224 3509170.41472,761150.43653 3509149.23762,761143.80984 3509081.83669,761119.29829 3509066.00849,761112.74049 3508998.66655,761087.84975 3508865.45541,761037.77439 3508847.84485,761029.65080 3508834.71442,761021.34219 3508827.92757,761014.24686 3508812.40775,760983.42300 3508807.69915,760973.88900 3508803.77594,760967.90121 3508800.18599,760963.31407 3508795.28639,760958.64001 3508789.74752,760954.45624 3508784.83645,760951.85060 3508779.66876,760949.80138 3508774.48746,760948.45276 3508767.42990,760946.92913 3508760.22687,760946.47329 3508740.48714,760945.56986 3508733.86652,760945.90263 3508717.23451,760947.02934 3508699.11729,760948.71432 3508699.11729,760948.71432 3508697.77854,760948.83871 3508679.17721,760951.46961 3508664.10760,760954.40639 3508658.41580,760955.94978 3508653.80578,760957.71390 3508649.11653,760960.57907 3508643.90546,760963.78977 3508636.66838,760969.91713 3508568.00915,761039.02457 3508538.60683,761065.48035 3508477.98549,761114.37970 3508436.17735,761145.09051 3508418.05409,761157.98402 3508401.05527,761170.13071 3508352.63648,761208.66844 3508318.84392,761237.76512",
                    "interchange": {
                        "desc": "Fussweg",
                        "type": "100",
                        "path": "3508318.00000,761237.00000 3508318.38653,761236.30453 3508340.50000,761217.18000 3508339.58000,761216.21000 3508348.44000,761208.77000 3508351.68000,761206.36000 3508357.45000,761212.59000 3508357.84000,761213.02000 3508369.90000,761226.44000 3508374.54000,761231.48000 3508384.22000,761242.01000 3508386.92000,761239.64000 3508388.63000,761239.42000 3508392.07000,761236.33000 3508394.25000,761238.68000 3508396.62000,761236.65000 3508400.69000,761233.03000 3508404.38000,761229.75000 3508407.57000,761226.91000 3508413.04000,761221.96000 3508429.88000,761206.70000 3508451.01000,761186.64000 3508453.33000,761184.43000 3508471.38576,761166.99475 3508470.00000,761171.00000"
                    },
                    "turnInst": [
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "LEAVE",
                            "name": "Ausstieg U-Bahn rechts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "28",
                            "dis": "0",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "0",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Vaihingen",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "229",
                            "tTime": "28",
                            "ctTime": "28",
                            "dis": "31",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "3",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Treppe abw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "230",
                            "tTime": "16",
                            "ctTime": "44",
                            "dis": "12",
                            "cDis": "43",
                            "niveau": "0",
                            "fPLIdx": "1",
                            "tPLIdx": "1",
                            "fPCIdx": "3",
                            "tPCIdx": "4",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "STAIRS"
                                }
                            ],
                            "coords": "3508340.00000,761216.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Weg im Geb�ude",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "233",
                            "tTime": "52",
                            "ctTime": "96",
                            "dis": "58",
                            "cDis": "101",
                            "dUp": "1",
                            "dDown": "0",
                            "niveau": "-1",
                            "fPLIdx": "2",
                            "tPLIdx": "7",
                            "fPCIdx": "4",
                            "tPCIdx": "12",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "BUILDING_WAY"
                                }
                            ],
                            "coords": "3508348.00000,761209.00000"
                        },
                        {
                            "dir": "SLIGHT_LEFT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Rolltreppe aufw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "228",
                            "tTime": "10",
                            "ctTime": "106",
                            "dis": "5",
                            "cDis": "106",
                            "niveau": "0",
                            "fPLIdx": "8",
                            "tPLIdx": "8",
                            "fPCIdx": "12",
                            "tPCIdx": "13",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "ESCALATOR"
                                }
                            ],
                            "coords": "3508389.00000,761239.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Bahnsteig",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "317",
                            "tTime": "95",
                            "ctTime": "201",
                            "dis": "108",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "9",
                            "tPLIdx": "10",
                            "fPCIdx": "13",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508392.00000,761236.00000"
                        },
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "ENTER",
                            "name": "Einstieg S-Bahn",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "201",
                            "dis": "0",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "10",
                            "tPLIdx": "10",
                            "fPCIdx": "24",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508470.00000,761171.00000"
                        }
                    ]
                },
                {
                    "timeMinute": "13",
                    "points": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "platformName": "Gleis 3",
                            "plannedPlatformName": "Gleis 3",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "departure",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:30",
                                "timeSec": "08:30:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:30",
                                "rtTimeSec": "08:30:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "830",
                                "timeSec": "83000",
                                "rtDate": "20200402",
                                "rtTime": "830",
                                "rtTimeSec": "83000"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A6.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "platformName": "Gleis 2",
                            "plannedPlatformName": "Gleis 2",
                            "place": "Stuttgart",
                            "nameWithPlace": "Stadtmitte",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:43",
                                "timeSec": "08:43:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:43",
                                "rtTimeSec": "08:43:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "843",
                                "timeSec": "84300",
                                "rtDate": "20200402",
                                "rtTime": "843",
                                "rtTimeSec": "84300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A7.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uroteb.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2"
                            }
                        }
                    ],
                    "mode": {
                        "name": "S-Bahn S3",
                        "number": "S3",
                        "symbol": "S3",
                        "product": "S-Bahn",
                        "productId": "0",
                        "type": "2",
                        "code": "1",
                        "mtSubcode": "0",
                        "destination": "Backnang",
                        "destID": "5007600",
                        "desc": "Flughafen/Messe - Stuttgart - Backnang",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "10",
                            "line": "10003",
                            "supplement": " ",
                            "dir": "R",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:10003: :R:j20",
                            "tripCode": "7314",
                            "operator": "DB",
                            "opCode": "10",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 3",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:30",
                                "depDateTimeSec": "20200402 08:30:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Österfeld",
                            "nameWO": "Österfeld",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006027",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6027",
                                "areaGid": "de:08111:6027:1",
                                "pointGid": "de:08111:6027:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-1"
                                    }
                                ],
                                "coords": "3508666.00000,759994.00000",
                                "niveau": "-1",
                                "arrDateTime": "20200402 08:32",
                                "arrDateTimeSec": "20200402 08:32:00",
                                "depDateTime": "20200402 08:32",
                                "depDateTimeSec": "20200402 08:32:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Universität",
                            "nameWO": "Universität",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006008",
                                "area": "2",
                                "platform": "2",
                                "gid": "de:08111:6008",
                                "areaGid": "de:08111:6008:2",
                                "pointGid": "de:08111:6008:2:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-3"
                                    }
                                ],
                                "coords": "3507863.00000,759150.00000",
                                "niveau": "-3",
                                "arrDateTime": "20200402 08:34",
                                "arrDateTimeSec": "20200402 08:34:00",
                                "depDateTime": "20200402 08:34",
                                "depDateTimeSec": "20200402 08:34:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Schwabstraße",
                            "nameWO": "Schwabstraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006052",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6052",
                                "areaGid": "de:08111:6052:1",
                                "pointGid": "de:08111:6052:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    },
                                    {
                                        "name": "AREA_NIVEAU_GIS",
                                        "value": " -3.00"
                                    }
                                ],
                                "coords": "3511583.00000,756369.00000",
                                "niveau": "-300",
                                "arrDateTime": "20200402 08:40",
                                "arrDateTimeSec": "20200402 08:40:00",
                                "depDateTime": "20200402 08:40",
                                "depDateTimeSec": "20200402 08:40:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Feuersee",
                            "nameWO": "Feuersee",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006221",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6221",
                                "areaGid": "de:08111:6221:1",
                                "pointGid": "de:08111:6221:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512269.00000,756091.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:41",
                                "arrDateTimeSec": "20200402 08:41:00",
                                "depDateTime": "20200402 08:42",
                                "depDateTimeSec": "20200402 08:42:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:43",
                                "arrDateTimeSec": "20200402 08:43:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "infos": {
                        "info": {
                            "infoLinkText": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                            "infoLinkURL": "https://ems.vvs.de/ems.comm.addinfo-info_link?event=cf7f6a8d699b44adba17a69308e4d5f9&device=60551f5633ff432eac9572c79a1c7f87&mt=html",
                            "infoText": {
                                "content": "Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn) bis auf Weiteres außer Betrieb.",
                                "subtitle": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                                "subject": "Haltestelle Stadtmitte",
                                "additionalText": "TextType: 6b9e957670424d449033ba49fe42aed8",
                                "htmlText": "<div class=\"ems-event\">\n<div><div class=\"event\"> Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn)  bis auf Weiteres  außer Betrieb.    </div></div>\n</div>",
                                "wmlText": "",
                                "smsText": "Haltestelle Stadtmitte",
                                "speechText": ""
                            },
                            "paramList": [
                                {
                                    "type": "addInfoParam",
                                    "name": "publisher",
                                    "value": "EMS",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "infoID",
                                    "value": "41490",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "seqID",
                                    "value": "1",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "infoType",
                                    "value": "stopInfo",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "priority",
                                    "value": "normal",
                                    "edit": "0"
                                },
                                {
                                    "type": "messageSubType",
                                    "name": "stopInfo",
                                    "value": "escalator_elevator",
                                    "edit": "0"
                                }
                            ]
                        }
                    },
                    "format": "x,y",
                    "path": "3508470.38307,761171.32793 3508510.34781,761133.01325 3508554.93753,761088.51940 3508565.14883,761078.70675 3508573.35379,761070.30942 3508622.52797,761022.38294 3508677.17306,760968.55374 3508679.65552,760965.85876 3508727.54667,760917.21050 3508744.93563,760896.68848 3508763.88417,760871.49338 3508780.22336,760847.87027 3508803.19995,760811.30363 3508817.46643,760784.38087 3508832.13964,760754.21026 3508851.44696,760705.11640 3508859.97680,760679.40356 3508866.69561,760652.88176 3508873.46673,760622.25642 3508877.72438,760597.86250 3508881.42797,760567.35318 3508883.05597,760545.47664 3508883.72678,760509.07825 3508878.80594,760439.44958 3508872.90699,760369.90028 3508869.82866,760339.67966 3508865.87809,760316.08823 3508855.16522,760277.07220 3508842.79656,760242.18446 3508834.80842,760223.67028 3508829.28778,760211.91348 3508826.35824,760206.00197 3508818.73680,760191.42385 3508805.96875,760168.98047 3508790.39597,760145.07353 3508778.09940,760127.66693 3508751.26388,760093.41316 3508740.05616,760080.71986 3508720.27877,760058.29828 3508719.66715,760057.58752 3508676.85361,760007.50031 3508665.78591,759994.76217 3508665.78591,759994.76217 3508654.81409,759982.15730 3508632.08835,759955.28063 3508589.94724,759906.19257 3508570.83963,759883.25790 3508534.69904,759842.20038 3508521.74548,759827.12951 3508486.61719,759788.66123 3508463.89756,759764.78640 3508443.04317,759743.69992 3508429.64407,759730.39766 3508372.24759,759678.45057 3508310.62472,759637.62963 3508192.25446,759563.64065 3508122.04747,759505.12630 3508094.37679,759473.41716 3508039.07714,759407.65199 3507978.37949,759330.85128 3507925.95495,759257.51897 3507904.59532,759224.75467 3507903.60700,759222.75437 3507881.48683,759187.64462 3507881.16969,759187.00008 3507880.95574,759186.52220 3507874.91713,759175.61032 3507863.12943,759150.39440 3507863.12943,759150.39440 3507853.78344,759130.40168 3507837.75685,759092.50312 3507831.52699,759076.14242 3507827.88841,759066.88411 3507825.67393,759061.00445 3507820.25685,759042.04041 3507789.94754,758897.00441 3507783.77538,758847.67128 3507780.43826,758747.78042 3507788.09896,758698.45039 3507830.59697,758566.39101 3507921.08655,758432.34006 3507993.42585,758372.22035 3508075.71613,758319.61401 3508507.69686,758066.83064 3508533.72553,758051.58946 3509135.42517,757691.03969 3509280.65694,757604.57322 3509365.83749,757553.19965 3509366.54993,757552.75364 3509558.08969,757446.60819 3509714.91718,757355.64020 3510045.06583,757159.46057 3510229.38457,757050.66936 3510598.44848,756832.77868 3510827.89678,756696.98169 3510911.95555,756653.92703 3510964.68858,756629.05885 3511093.24428,756572.50302 3511101.35372,756569.38436 3511118.71847,756562.71104 3511175.44704,756540.70206 3511266.98613,756502.30891 3511392.09801,756443.28433 3511415.57855,756433.27262 3511478.95520,756410.27955 3511482.19440,756409.03854 3511522.30494,756393.15406 3511582.85499,756368.70881 3511582.85499,756368.70881 3511615.48744,756355.53025 3511671.09422,756333.30726 3511673.52542,756332.39032 3511687.68593,756326.72274 3511774.88675,756287.50735 3511825.66717,756267.35024 3511876.00655,756247.36042 3512025.74458,756187.88025 3512055.40836,756176.11779 3512111.11715,756155.10233 3512123.89646,756150.17058 3512148.55973,756140.99839 3512150.48407,756140.30475 3512240.82919,756103.11034 3512265.06404,756093.16013 3512269.05918,756091.55004 3512269.05918,756091.55004 3512364.69883,756052.74068 3512417.49503,756025.32312 3512450.13631,756011.27225 3512519.38377,755981.47078 3512550.28502,755961.96300 3512576.99538,755938.71680 3512616.67827,755902.20784 3512628.72975,755891.12688 3512661.47813,755850.18496 3512672.53423,755837.81616 3512723.63511,755780.65195 3512726.95466,755776.22955 3512751.60552,755743.33451 3512771.89613,755716.27647 3512791.36585,755690.31004 3512800.10776,755678.65797"
                }
            ],
            "itdFare": {
                "fares": {
                    "fare": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "unitName": "Zone",
                        "fareAdult": "2.60",
                        "fareChild": "1.30",
                        "unitsAdult": "1",
                        "unitsChild": "1",
                        "fareBikeAdult": "",
                        "fareBikeChild": "",
                        "unitsBikeAdult": "",
                        "unitsBikeChild": "",
                        "levelAdult": "",
                        "levelChild": "",
                        "idAdult": "1",
                        "idChild": "8",
                        "note": "",
                        "genericTicketGroups": [
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTicket Mobil"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "2.50"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "1.22"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "15"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "22"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "4er-Ticket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "4.90"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "30"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "37"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "183"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "188"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.40"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "193"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "198"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "WochenTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "23.30"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "50"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "69.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "57"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "690.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "64"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "824.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "71"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket für Schüler, Auszubildende, Studenten"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "49.20"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "78"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "656.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "89"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "54.63"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "96"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "783.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "103"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "65.23"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "110"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "621.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "139"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "51.75"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "146"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "741.60"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "153"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "61.80"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "160"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "StudiTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "Netz"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "207.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "138"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "tickets": {
                    "ticket": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "weekAdult": "",
                        "weekChild": "",
                        "monthAdult": "",
                        "monthChild": "",
                        "weekEducation": "",
                        "monthEducation": "",
                        "yearAdults": "",
                        "yearChildren": "",
                        "yearStudents": "",
                        "dayAdults": "",
                        "dayChildren": "",
                        "dayStudents": "",
                        "levelAdult": "1",
                        "levelChild": "1",
                        "genericTickets": null
                    }
                },
                "tariffZones": {
                    "tariffZone": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "neutralZone": "",
                        "zones": {
                            "zone": {
                                "zoneElems": {
                                    "zoneElem": {
                                        "zone": "1"
                                    }
                                }
                            }
                        }
                    }
                },
                "specialTickets": null
            },
            "attrs": []
        },
        {
            "distance": "0",
            "duration": "00:20",
            "interchange": "1",
            "desc": "1",
            "optValue": "0",
            "legs": [
                {
                    "timeMinute": "3",
                    "points": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "platformName": "",
                            "plannedPlatformName": "",
                            "place": "Stuttgart",
                            "nameWithPlace": "Wallgraben",
                            "usage": "departure",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:33",
                                "timeSec": "08:33:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:33",
                                "rtTimeSec": "08:33:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "833",
                                "timeSec": "83300",
                                "rtDate": "20200402",
                                "rtTime": "833",
                                "rtTimeSec": "83300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A9.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uWall.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "platformName": "Gleis 12",
                            "plannedPlatformName": "Gleis 12",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:36",
                                "timeSec": "08:36:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:36",
                                "rtTimeSec": "08:36:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "836",
                                "timeSec": "83600",
                                "rtDate": "20200402",
                                "rtTime": "836",
                                "rtTimeSec": "83600"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1AA.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1"
                            }
                        }
                    ],
                    "mode": {
                        "name": "Stadtbahn U3",
                        "number": "U3",
                        "symbol": "U3",
                        "product": "Stadtbahn",
                        "productId": "2",
                        "type": "1",
                        "code": "3",
                        "mtSubcode": "0",
                        "destination": "Vaihingen Bf",
                        "destID": "5006002",
                        "desc": "Plieningen - Möhringen - Vaihingen",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "20",
                            "line": "20003",
                            "supplement": " ",
                            "dir": "H",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:20003: :H:j20",
                            "tripCode": "64",
                            "operator": "SSB",
                            "opCode": "01",
                            "isTTB": "1",
                            "isSTT": "1",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:33",
                                "depDateTimeSec": "20200402 08:33:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Jurastraße",
                            "nameWO": "Jurastraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000356",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:356",
                                "areaGid": "de:08111:356:1",
                                "pointGid": "de:08111:356:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508699.00000,760949.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:35",
                                "arrDateTimeSec": "20200402 08:35:00",
                                "depDateTime": "20200402 08:35",
                                "depDateTimeSec": "20200402 08:35:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 12",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:36",
                                "arrDateTimeSec": "20200402 08:36:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "footpath": [
                        {
                            "position": "AFTER",
                            "duration": "2",
                            "dTM": "20",
                            "footpathElem": [
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "1",
                                    "lT": "-1",
                                    "level": "DOWN",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "3",
                                        "platform": "",
                                        "x": "3508318.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253087:31:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "x": "3508378.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    }
                                },
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "-1",
                                    "lT": "1",
                                    "level": "UP",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "platform": "",
                                        "x": "3508378.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "11",
                                        "x": "3508470.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253103:118:NBWT:100"
                                    }
                                }
                            ]
                        }
                    ],
                    "infos": null,
                    "format": "x,y",
                    "path": "3509291.05412,761162.56014 3509255.41310,761160.59495 3509239.77803,761159.84220 3509223.89988,761158.90077 3509209.29275,761156.88965 3509198.52763,761155.85081 3509187.41591,761154.31209 3509179.62934,761152.61224 3509170.41472,761150.43653 3509149.23762,761143.80984 3509081.83669,761119.29829 3509066.00849,761112.74049 3508998.66655,761087.84975 3508865.45541,761037.77439 3508847.84485,761029.65080 3508834.71442,761021.34219 3508827.92757,761014.24686 3508812.40775,760983.42300 3508807.69915,760973.88900 3508803.77594,760967.90121 3508800.18599,760963.31407 3508795.28639,760958.64001 3508789.74752,760954.45624 3508784.83645,760951.85060 3508779.66876,760949.80138 3508774.48746,760948.45276 3508767.42990,760946.92913 3508760.22687,760946.47329 3508740.48714,760945.56986 3508733.86652,760945.90263 3508717.23451,760947.02934 3508699.11729,760948.71432 3508699.11729,760948.71432 3508697.77854,760948.83871 3508679.17721,760951.46961 3508664.10760,760954.40639 3508658.41580,760955.94978 3508653.80578,760957.71390 3508649.11653,760960.57907 3508643.90546,760963.78977 3508636.66838,760969.91713 3508568.00915,761039.02457 3508538.60683,761065.48035 3508477.98549,761114.37970 3508436.17735,761145.09051 3508418.05409,761157.98402 3508401.05527,761170.13071 3508352.63648,761208.66844 3508318.84392,761237.76512",
                    "interchange": {
                        "desc": "Fussweg",
                        "type": "100",
                        "path": "3508318.00000,761237.00000 3508318.38653,761236.30453 3508340.50000,761217.18000 3508339.58000,761216.21000 3508348.44000,761208.77000 3508351.68000,761206.36000 3508357.45000,761212.59000 3508357.84000,761213.02000 3508369.90000,761226.44000 3508374.54000,761231.48000 3508384.22000,761242.01000 3508386.92000,761239.64000 3508388.63000,761239.42000 3508392.07000,761236.33000 3508394.25000,761238.68000 3508396.62000,761236.65000 3508400.69000,761233.03000 3508404.38000,761229.75000 3508407.57000,761226.91000 3508413.04000,761221.96000 3508429.88000,761206.70000 3508451.01000,761186.64000 3508453.33000,761184.43000 3508471.38576,761166.99475 3508470.00000,761171.00000"
                    },
                    "turnInst": [
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "LEAVE",
                            "name": "Ausstieg U-Bahn rechts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "28",
                            "dis": "0",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "0",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Vaihingen",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "229",
                            "tTime": "28",
                            "ctTime": "28",
                            "dis": "31",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "3",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Treppe abw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "230",
                            "tTime": "16",
                            "ctTime": "44",
                            "dis": "12",
                            "cDis": "43",
                            "niveau": "0",
                            "fPLIdx": "1",
                            "tPLIdx": "1",
                            "fPCIdx": "3",
                            "tPCIdx": "4",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "STAIRS"
                                }
                            ],
                            "coords": "3508340.00000,761216.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Weg im Geb�ude",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "233",
                            "tTime": "52",
                            "ctTime": "96",
                            "dis": "58",
                            "cDis": "101",
                            "dUp": "1",
                            "dDown": "0",
                            "niveau": "-1",
                            "fPLIdx": "2",
                            "tPLIdx": "7",
                            "fPCIdx": "4",
                            "tPCIdx": "12",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "BUILDING_WAY"
                                }
                            ],
                            "coords": "3508348.00000,761209.00000"
                        },
                        {
                            "dir": "SLIGHT_LEFT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Rolltreppe aufw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "228",
                            "tTime": "10",
                            "ctTime": "106",
                            "dis": "5",
                            "cDis": "106",
                            "niveau": "0",
                            "fPLIdx": "8",
                            "tPLIdx": "8",
                            "fPCIdx": "12",
                            "tPCIdx": "13",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "ESCALATOR"
                                }
                            ],
                            "coords": "3508389.00000,761239.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Bahnsteig",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "317",
                            "tTime": "95",
                            "ctTime": "201",
                            "dis": "108",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "9",
                            "tPLIdx": "10",
                            "fPCIdx": "13",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508392.00000,761236.00000"
                        },
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "ENTER",
                            "name": "Einstieg S-Bahn",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "201",
                            "dis": "0",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "10",
                            "tPLIdx": "10",
                            "fPCIdx": "24",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508470.00000,761171.00000"
                        }
                    ]
                },
                {
                    "timeMinute": "13",
                    "points": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "platformName": "Gleis 3",
                            "plannedPlatformName": "Gleis 3",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "departure",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:40",
                                "timeSec": "08:40:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:40",
                                "rtTimeSec": "08:40:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "840",
                                "timeSec": "84000",
                                "rtDate": "20200402",
                                "rtTime": "840",
                                "rtTimeSec": "84000"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1AA.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "platformName": "Gleis 2",
                            "plannedPlatformName": "Gleis 2",
                            "place": "Stuttgart",
                            "nameWithPlace": "Stadtmitte",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:53",
                                "timeSec": "08:53:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:53",
                                "rtTimeSec": "08:53:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "853",
                                "timeSec": "85300",
                                "rtDate": "20200402",
                                "rtTime": "853",
                                "rtTimeSec": "85300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1AB.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uroteb.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2"
                            }
                        }
                    ],
                    "mode": {
                        "name": "S-Bahn S1",
                        "number": "S1",
                        "symbol": "S1",
                        "product": "S-Bahn",
                        "productId": "0",
                        "type": "2",
                        "code": "1",
                        "mtSubcode": "0",
                        "destination": "Kirchheim (T)",
                        "destID": "5004211",
                        "desc": "Herrenberg - Stuttgart - Plochingen - Kirchheim (T)",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "10",
                            "line": "10001",
                            "supplement": " ",
                            "dir": "R",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:10001: :R:j20",
                            "tripCode": "7116",
                            "operator": "DB",
                            "opCode": "10",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 3",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:40",
                                "depDateTimeSec": "20200402 08:40:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Österfeld",
                            "nameWO": "Österfeld",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006027",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6027",
                                "areaGid": "de:08111:6027:1",
                                "pointGid": "de:08111:6027:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-1"
                                    }
                                ],
                                "coords": "3508666.00000,759994.00000",
                                "niveau": "-1",
                                "arrDateTime": "20200402 08:42",
                                "arrDateTimeSec": "20200402 08:42:00",
                                "depDateTime": "20200402 08:42",
                                "depDateTimeSec": "20200402 08:42:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Universität",
                            "nameWO": "Universität",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006008",
                                "area": "2",
                                "platform": "2",
                                "gid": "de:08111:6008",
                                "areaGid": "de:08111:6008:2",
                                "pointGid": "de:08111:6008:2:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-3"
                                    }
                                ],
                                "coords": "3507863.00000,759150.00000",
                                "niveau": "-3",
                                "arrDateTime": "20200402 08:44",
                                "arrDateTimeSec": "20200402 08:44:00",
                                "depDateTime": "20200402 08:44",
                                "depDateTimeSec": "20200402 08:44:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Schwabstraße",
                            "nameWO": "Schwabstraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006052",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6052",
                                "areaGid": "de:08111:6052:1",
                                "pointGid": "de:08111:6052:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    },
                                    {
                                        "name": "AREA_NIVEAU_GIS",
                                        "value": " -3.00"
                                    }
                                ],
                                "coords": "3511583.00000,756369.00000",
                                "niveau": "-300",
                                "arrDateTime": "20200402 08:50",
                                "arrDateTimeSec": "20200402 08:50:00",
                                "depDateTime": "20200402 08:50",
                                "depDateTimeSec": "20200402 08:50:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Feuersee",
                            "nameWO": "Feuersee",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006221",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6221",
                                "areaGid": "de:08111:6221:1",
                                "pointGid": "de:08111:6221:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512269.00000,756091.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:51",
                                "arrDateTimeSec": "20200402 08:51:00",
                                "depDateTime": "20200402 08:52",
                                "depDateTimeSec": "20200402 08:52:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 08:53",
                                "arrDateTimeSec": "20200402 08:53:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "infos": {
                        "info": {
                            "infoLinkText": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                            "infoLinkURL": "https://ems.vvs.de/ems.comm.addinfo-info_link?event=cf7f6a8d699b44adba17a69308e4d5f9&device=60551f5633ff432eac9572c79a1c7f87&mt=html",
                            "infoText": {
                                "content": "Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn) bis auf Weiteres außer Betrieb.",
                                "subtitle": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                                "subject": "Haltestelle Stadtmitte",
                                "additionalText": "TextType: 6b9e957670424d449033ba49fe42aed8",
                                "htmlText": "<div class=\"ems-event\">\n<div><div class=\"event\"> Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn)  bis auf Weiteres  außer Betrieb.    </div></div>\n</div>",
                                "wmlText": "",
                                "smsText": "Haltestelle Stadtmitte",
                                "speechText": ""
                            },
                            "paramList": [
                                {
                                    "type": "addInfoParam",
                                    "name": "publisher",
                                    "value": "EMS",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "infoID",
                                    "value": "41490",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "seqID",
                                    "value": "1",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "infoType",
                                    "value": "stopInfo",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "priority",
                                    "value": "normal",
                                    "edit": "0"
                                },
                                {
                                    "type": "messageSubType",
                                    "name": "stopInfo",
                                    "value": "escalator_elevator",
                                    "edit": "0"
                                }
                            ]
                        }
                    },
                    "format": "x,y",
                    "path": "3508470.38307,761171.32793 3508510.34781,761133.01325 3508554.93753,761088.51940 3508565.14883,761078.70675 3508573.35379,761070.30942 3508622.52797,761022.38294 3508677.17306,760968.55374 3508679.65552,760965.85876 3508727.54667,760917.21050 3508744.93563,760896.68848 3508763.88417,760871.49338 3508780.22336,760847.87027 3508803.19995,760811.30363 3508817.46643,760784.38087 3508832.13964,760754.21026 3508851.44696,760705.11640 3508859.97680,760679.40356 3508866.69561,760652.88176 3508873.46673,760622.25642 3508877.72438,760597.86250 3508881.42797,760567.35318 3508883.05597,760545.47664 3508883.72678,760509.07825 3508878.80594,760439.44958 3508872.90699,760369.90028 3508869.82866,760339.67966 3508865.87809,760316.08823 3508855.16522,760277.07220 3508842.79656,760242.18446 3508834.80842,760223.67028 3508829.28778,760211.91348 3508826.35824,760206.00197 3508818.73680,760191.42385 3508805.96875,760168.98047 3508790.39597,760145.07353 3508778.09940,760127.66693 3508751.26388,760093.41316 3508740.05616,760080.71986 3508720.27877,760058.29828 3508719.66715,760057.58752 3508676.85361,760007.50031 3508665.78591,759994.76217 3508665.78591,759994.76217 3508654.81409,759982.15730 3508632.08835,759955.28063 3508589.94724,759906.19257 3508570.83963,759883.25790 3508534.69904,759842.20038 3508521.74548,759827.12951 3508486.61719,759788.66123 3508463.89756,759764.78640 3508443.04317,759743.69992 3508429.64407,759730.39766 3508372.24759,759678.45057 3508310.62472,759637.62963 3508192.25446,759563.64065 3508122.04747,759505.12630 3508094.37679,759473.41716 3508039.07714,759407.65199 3507978.37949,759330.85128 3507925.95495,759257.51897 3507904.59532,759224.75467 3507903.60700,759222.75437 3507881.48683,759187.64462 3507881.16969,759187.00008 3507880.95574,759186.52220 3507874.91713,759175.61032 3507863.12943,759150.39440 3507863.12943,759150.39440 3507853.78344,759130.40168 3507837.75685,759092.50312 3507831.52699,759076.14242 3507827.88841,759066.88411 3507825.67393,759061.00445 3507820.25685,759042.04041 3507789.94754,758897.00441 3507783.77538,758847.67128 3507780.43826,758747.78042 3507788.09896,758698.45039 3507830.59697,758566.39101 3507921.08655,758432.34006 3507993.42585,758372.22035 3508075.71613,758319.61401 3508507.69686,758066.83064 3508533.72553,758051.58946 3509135.42517,757691.03969 3509280.65694,757604.57322 3509365.83749,757553.19965 3509366.54993,757552.75364 3509558.08969,757446.60819 3509714.91718,757355.64020 3510045.06583,757159.46057 3510229.38457,757050.66936 3510598.44848,756832.77868 3510827.89678,756696.98169 3510911.95555,756653.92703 3510964.68858,756629.05885 3511093.24428,756572.50302 3511101.35372,756569.38436 3511118.71847,756562.71104 3511175.44704,756540.70206 3511266.98613,756502.30891 3511392.09801,756443.28433 3511415.57855,756433.27262 3511478.95520,756410.27955 3511482.19440,756409.03854 3511522.30494,756393.15406 3511582.85499,756368.70881 3511582.85499,756368.70881 3511615.48744,756355.53025 3511671.09422,756333.30726 3511673.52542,756332.39032 3511687.68593,756326.72274 3511774.88675,756287.50735 3511825.66717,756267.35024 3511876.00655,756247.36042 3512025.74458,756187.88025 3512055.40836,756176.11779 3512111.11715,756155.10233 3512123.89646,756150.17058 3512148.55973,756140.99839 3512150.48407,756140.30475 3512240.82919,756103.11034 3512265.06404,756093.16013 3512269.05918,756091.55004 3512269.05918,756091.55004 3512364.69883,756052.74068 3512417.49503,756025.32312 3512450.13631,756011.27225 3512519.38377,755981.47078 3512550.28502,755961.96300 3512576.99538,755938.71680 3512616.67827,755902.20784 3512628.72975,755891.12688 3512661.47813,755850.18496 3512672.53423,755837.81616 3512723.63511,755780.65195 3512726.95466,755776.22955 3512751.60552,755743.33451 3512771.89613,755716.27647 3512791.36585,755690.31004 3512800.10776,755678.65797"
                }
            ],
            "itdFare": {
                "fares": {
                    "fare": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "unitName": "Zone",
                        "fareAdult": "2.60",
                        "fareChild": "1.30",
                        "unitsAdult": "1",
                        "unitsChild": "1",
                        "fareBikeAdult": "",
                        "fareBikeChild": "",
                        "unitsBikeAdult": "",
                        "unitsBikeChild": "",
                        "levelAdult": "",
                        "levelChild": "",
                        "idAdult": "1",
                        "idChild": "8",
                        "note": "",
                        "genericTicketGroups": [
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTicket Mobil"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "2.50"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "1.22"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "15"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "22"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "4er-Ticket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "4.90"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "30"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "37"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "183"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "188"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.40"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "193"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "198"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "WochenTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "23.30"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "50"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "69.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "57"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "690.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "64"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "824.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "71"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket für Schüler, Auszubildende, Studenten"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "49.20"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "78"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "656.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "89"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "54.63"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "96"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "783.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "103"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "65.23"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "110"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "621.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "139"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "51.75"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "146"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "741.60"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "153"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "61.80"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "160"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "StudiTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "Netz"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "207.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "138"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "tickets": {
                    "ticket": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "weekAdult": "",
                        "weekChild": "",
                        "monthAdult": "",
                        "monthChild": "",
                        "weekEducation": "",
                        "monthEducation": "",
                        "yearAdults": "",
                        "yearChildren": "",
                        "yearStudents": "",
                        "dayAdults": "",
                        "dayChildren": "",
                        "dayStudents": "",
                        "levelAdult": "1",
                        "levelChild": "1",
                        "genericTickets": null
                    }
                },
                "tariffZones": {
                    "tariffZone": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "neutralZone": "",
                        "zones": {
                            "zone": {
                                "zoneElems": {
                                    "zoneElem": {
                                        "zone": "1"
                                    }
                                }
                            }
                        }
                    }
                },
                "specialTickets": null
            },
            "attrs": []
        },
        {
            "distance": "0",
            "duration": "00:20",
            "interchange": "1",
            "desc": "1",
            "optValue": "0",
            "legs": [
                {
                    "timeMinute": "3",
                    "points": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "platformName": "",
                            "plannedPlatformName": "",
                            "place": "Stuttgart",
                            "nameWithPlace": "Wallgraben",
                            "usage": "departure",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:43",
                                "timeSec": "08:43:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:43",
                                "rtTimeSec": "08:43:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "843",
                                "timeSec": "84300",
                                "rtDate": "20200402",
                                "rtTime": "843",
                                "rtTimeSec": "84300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A1.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uWall.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "platformName": "Gleis 12",
                            "plannedPlatformName": "Gleis 12",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:46",
                                "timeSec": "08:46:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:46",
                                "rtTimeSec": "08:46:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "846",
                                "timeSec": "84600",
                                "rtDate": "20200402",
                                "rtTime": "846",
                                "rtTimeSec": "84600"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A2.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1"
                            }
                        }
                    ],
                    "mode": {
                        "name": "Stadtbahn U3",
                        "number": "U3",
                        "symbol": "U3",
                        "product": "Stadtbahn",
                        "productId": "2",
                        "type": "1",
                        "code": "3",
                        "mtSubcode": "0",
                        "destination": "Vaihingen Bf",
                        "destID": "5006002",
                        "desc": "Plieningen - Möhringen - Vaihingen",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "20",
                            "line": "20003",
                            "supplement": " ",
                            "dir": "H",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:20003: :H:j20",
                            "tripCode": "67",
                            "operator": "SSB",
                            "opCode": "01",
                            "isTTB": "1",
                            "isSTT": "1",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Wallgraben",
                            "nameWO": "Wallgraben",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000355",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:355",
                                "areaGid": "de:08111:355:1",
                                "pointGid": "de:08111:355:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3509291.00000,761162.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:43",
                                "depDateTimeSec": "20200402 08:43:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Jurastraße",
                            "nameWO": "Jurastraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "",
                            "desc": "",
                            "ref": {
                                "id": "5000356",
                                "area": "1",
                                "platform": "1",
                                "gid": "de:08111:356",
                                "areaGid": "de:08111:356:1",
                                "pointGid": "de:08111:356:1:1",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508699.00000,760949.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:45",
                                "arrDateTimeSec": "20200402 08:45:00",
                                "depDateTime": "20200402 08:45",
                                "depDateTimeSec": "20200402 08:45:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Vaihingen Bf",
                            "nameWO": "Vaihingen Bf",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 12",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "3",
                                "platform": "12",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:3",
                                "pointGid": "de:08111:6002:3:12",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508318.00000,761237.00000",
                                "niveau": "1",
                                "arrDateTime": "20200402 08:46",
                                "arrDateTimeSec": "20200402 08:46:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "footpath": [
                        {
                            "position": "AFTER",
                            "duration": "2",
                            "dTM": "20",
                            "footpathElem": [
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "1",
                                    "lT": "-1",
                                    "level": "DOWN",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "3",
                                        "platform": "",
                                        "x": "3508318.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253087:31:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "x": "3508378.00000",
                                        "y": "761237.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    }
                                },
                                {
                                    "description": "",
                                    "type": "STAIRS",
                                    "lF": "-1",
                                    "lT": "1",
                                    "level": "UP",
                                    "orig": {
                                        "stopID": "5006002",
                                        "area": "80",
                                        "platform": "",
                                        "x": "3508378.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "0:-1:NBWT:100"
                                    },
                                    "dest": {
                                        "stopID": "5006002",
                                        "area": "11",
                                        "x": "3508470.00000",
                                        "y": "761235.00000",
                                        "mapName": "NBWT",
                                        "georef": "1000253103:118:NBWT:100"
                                    }
                                }
                            ]
                        }
                    ],
                    "infos": null,
                    "format": "x,y",
                    "path": "3509291.05412,761162.56014 3509255.41310,761160.59495 3509239.77803,761159.84220 3509223.89988,761158.90077 3509209.29275,761156.88965 3509198.52763,761155.85081 3509187.41591,761154.31209 3509179.62934,761152.61224 3509170.41472,761150.43653 3509149.23762,761143.80984 3509081.83669,761119.29829 3509066.00849,761112.74049 3508998.66655,761087.84975 3508865.45541,761037.77439 3508847.84485,761029.65080 3508834.71442,761021.34219 3508827.92757,761014.24686 3508812.40775,760983.42300 3508807.69915,760973.88900 3508803.77594,760967.90121 3508800.18599,760963.31407 3508795.28639,760958.64001 3508789.74752,760954.45624 3508784.83645,760951.85060 3508779.66876,760949.80138 3508774.48746,760948.45276 3508767.42990,760946.92913 3508760.22687,760946.47329 3508740.48714,760945.56986 3508733.86652,760945.90263 3508717.23451,760947.02934 3508699.11729,760948.71432 3508699.11729,760948.71432 3508697.77854,760948.83871 3508679.17721,760951.46961 3508664.10760,760954.40639 3508658.41580,760955.94978 3508653.80578,760957.71390 3508649.11653,760960.57907 3508643.90546,760963.78977 3508636.66838,760969.91713 3508568.00915,761039.02457 3508538.60683,761065.48035 3508477.98549,761114.37970 3508436.17735,761145.09051 3508418.05409,761157.98402 3508401.05527,761170.13071 3508352.63648,761208.66844 3508318.84392,761237.76512",
                    "interchange": {
                        "desc": "Fussweg",
                        "type": "100",
                        "path": "3508318.00000,761237.00000 3508318.38653,761236.30453 3508340.50000,761217.18000 3508339.58000,761216.21000 3508348.44000,761208.77000 3508351.68000,761206.36000 3508357.45000,761212.59000 3508357.84000,761213.02000 3508369.90000,761226.44000 3508374.54000,761231.48000 3508384.22000,761242.01000 3508386.92000,761239.64000 3508388.63000,761239.42000 3508392.07000,761236.33000 3508394.25000,761238.68000 3508396.62000,761236.65000 3508400.69000,761233.03000 3508404.38000,761229.75000 3508407.57000,761226.91000 3508413.04000,761221.96000 3508429.88000,761206.70000 3508451.01000,761186.64000 3508453.33000,761184.43000 3508471.38576,761166.99475 3508470.00000,761171.00000"
                    },
                    "turnInst": [
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "LEAVE",
                            "name": "Ausstieg U-Bahn rechts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "28",
                            "dis": "0",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "0",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Vaihingen",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "229",
                            "tTime": "28",
                            "ctTime": "28",
                            "dis": "31",
                            "cDis": "31",
                            "niveau": "0",
                            "fPLIdx": "0",
                            "tPLIdx": "0",
                            "fPCIdx": "0",
                            "tPCIdx": "3",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508318.00000,761237.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Treppe abw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "230",
                            "tTime": "16",
                            "ctTime": "44",
                            "dis": "12",
                            "cDis": "43",
                            "niveau": "0",
                            "fPLIdx": "1",
                            "tPLIdx": "1",
                            "fPCIdx": "3",
                            "tPCIdx": "4",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "STAIRS"
                                }
                            ],
                            "coords": "3508340.00000,761216.00000"
                        },
                        {
                            "dir": "STRAIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Weg im Geb�ude",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "233",
                            "tTime": "52",
                            "ctTime": "96",
                            "dis": "58",
                            "cDis": "101",
                            "dUp": "1",
                            "dDown": "0",
                            "niveau": "-1",
                            "fPLIdx": "2",
                            "tPLIdx": "7",
                            "fPCIdx": "4",
                            "tPCIdx": "12",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "BUILDING_WAY"
                                }
                            ],
                            "coords": "3508348.00000,761209.00000"
                        },
                        {
                            "dir": "SLIGHT_LEFT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Rolltreppe aufw�rts",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "228",
                            "tTime": "10",
                            "ctTime": "106",
                            "dis": "5",
                            "cDis": "106",
                            "niveau": "0",
                            "fPLIdx": "8",
                            "tPLIdx": "8",
                            "fPCIdx": "12",
                            "tPCIdx": "13",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "ESCALATOR"
                                }
                            ],
                            "coords": "3508389.00000,761239.00000"
                        },
                        {
                            "dir": "RIGHT",
                            "manoeuvre": "UNKNOWN",
                            "name": "Bahnsteig",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "317",
                            "tTime": "95",
                            "ctTime": "201",
                            "dis": "108",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "9",
                            "tPLIdx": "10",
                            "fPCIdx": "13",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508392.00000,761236.00000"
                        },
                        {
                            "dir": "UNKNOWN",
                            "manoeuvre": "ENTER",
                            "name": "Einstieg S-Bahn",
                            "dirHint": "",
                            "place": "",
                            "skyDir": "0",
                            "tTime": "0",
                            "ctTime": "201",
                            "dis": "0",
                            "cDis": "214",
                            "niveau": "0",
                            "fPLIdx": "10",
                            "tPLIdx": "10",
                            "fPCIdx": "24",
                            "tPCIdx": "24",
                            "guideSigns": null,
                            "attrs": [
                                {
                                    "name": "INDOOR_TYPE",
                                    "value": "PLATFORM_WAY"
                                }
                            ],
                            "coords": "3508470.00000,761171.00000"
                        }
                    ]
                },
                {
                    "timeMinute": "13",
                    "points": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "platformName": "Gleis 3",
                            "plannedPlatformName": "Gleis 3",
                            "place": "Stuttgart",
                            "nameWithPlace": "Vaihingen",
                            "usage": "departure",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "08:50",
                                "timeSec": "08:50:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "08:50",
                                "rtTimeSec": "08:50:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "850",
                                "timeSec": "85000",
                                "rtDate": "20200402",
                                "rtTime": "850",
                                "rtTimeSec": "85000"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A2.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uvaih.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "platformName": "Gleis 2",
                            "plannedPlatformName": "Gleis 2",
                            "place": "Stuttgart",
                            "nameWithPlace": "Stadtmitte",
                            "usage": "arrival",
                            "pointType": "Gleis",
                            "omc": "8111000",
                            "placeID": "51",
                            "desc": "",
                            "dateTime": {
                                "date": "02.04.2020",
                                "time": "09:03",
                                "timeSec": "09:03:00",
                                "rtDate": "02.04.2020",
                                "rtTime": "09:03",
                                "rtTimeSec": "09:03:00"
                            },
                            "stamp": {
                                "date": "20200402",
                                "time": "903",
                                "timeSec": "90300",
                                "rtDate": "20200402",
                                "rtTime": "903",
                                "rtTimeSec": "90300"
                            },
                            "links": [
                                {
                                    "type": "RM",
                                    "href": "FILELOAD?Filename=vvs1_5E8DCC1A3.pdf"
                                },
                                {
                                    "type": "SM",
                                    "href": "vvs/uroteb.pdf"
                                }
                            ],
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "NaPTANID": "",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2"
                            }
                        }
                    ],
                    "mode": {
                        "name": "S-Bahn S2",
                        "number": "S2",
                        "symbol": "S2",
                        "product": "S-Bahn",
                        "productId": "0",
                        "type": "2",
                        "code": "1",
                        "mtSubcode": "0",
                        "destination": "Schorndorf",
                        "destID": "5007703",
                        "desc": "Filderstadt  - Flughafen/Messe - Stuttgart - Schorndorf",
                        "timetablePeriod": "",
                        "realtime": "0",
                        "diva": {
                            "branch": "10",
                            "line": "10002",
                            "supplement": " ",
                            "dir": "R",
                            "project": "j20",
                            "network": "vvs",
                            "stateless": "vvs:10002: :R:j20",
                            "tripCode": "7214",
                            "operator": "DB",
                            "opCode": "10",
                            "isROP": "1",
                            "attrs": []
                        }
                    },
                    "hints": null,
                    "stopSeq": [
                        {
                            "name": "Vaihingen",
                            "nameWO": "Vaihingen",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 3",
                            "desc": "",
                            "ref": {
                                "id": "5006002",
                                "area": "11",
                                "platform": "3",
                                "gid": "de:08111:6002",
                                "areaGid": "de:08111:6002:11",
                                "pointGid": "de:08111:6002:1:3",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "1"
                                    }
                                ],
                                "coords": "3508470.00000,761171.00000",
                                "niveau": "1",
                                "depDateTime": "20200402 08:50",
                                "depDateTimeSec": "20200402 08:50:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Österfeld",
                            "nameWO": "Österfeld",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006027",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6027",
                                "areaGid": "de:08111:6027:1",
                                "pointGid": "de:08111:6027:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-1"
                                    }
                                ],
                                "coords": "3508666.00000,759994.00000",
                                "niveau": "-1",
                                "arrDateTime": "20200402 08:52",
                                "arrDateTimeSec": "20200402 08:52:00",
                                "depDateTime": "20200402 08:52",
                                "depDateTimeSec": "20200402 08:52:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Universität",
                            "nameWO": "Universität",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006008",
                                "area": "2",
                                "platform": "2",
                                "gid": "de:08111:6008",
                                "areaGid": "de:08111:6008:2",
                                "pointGid": "de:08111:6008:2:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-3"
                                    }
                                ],
                                "coords": "3507863.00000,759150.00000",
                                "niveau": "-3",
                                "arrDateTime": "20200402 08:54",
                                "arrDateTimeSec": "20200402 08:54:00",
                                "depDateTime": "20200402 08:54",
                                "depDateTimeSec": "20200402 08:54:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Schwabstraße",
                            "nameWO": "Schwabstraße",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006052",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6052",
                                "areaGid": "de:08111:6052:1",
                                "pointGid": "de:08111:6052:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    },
                                    {
                                        "name": "AREA_NIVEAU_GIS",
                                        "value": " -3.00"
                                    }
                                ],
                                "coords": "3511583.00000,756369.00000",
                                "niveau": "-300",
                                "arrDateTime": "20200402 09:00",
                                "arrDateTimeSec": "20200402 09:00:00",
                                "depDateTime": "20200402 09:00",
                                "depDateTimeSec": "20200402 09:00:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Feuersee",
                            "nameWO": "Feuersee",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006221",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6221",
                                "areaGid": "de:08111:6221:1",
                                "pointGid": "de:08111:6221:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512269.00000,756091.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 09:01",
                                "arrDateTimeSec": "20200402 09:01:00",
                                "depDateTime": "20200402 09:02",
                                "depDateTimeSec": "20200402 09:02:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        },
                        {
                            "name": "Stadtmitte",
                            "nameWO": "Stadtmitte",
                            "place": "Stuttgart",
                            "nameWithPlace": "",
                            "omc": "8111000",
                            "placeID": "51",
                            "platformName": "Gleis 2",
                            "desc": "",
                            "ref": {
                                "id": "5006056",
                                "area": "1",
                                "platform": "2",
                                "gid": "de:08111:6056",
                                "areaGid": "de:08111:6056:1",
                                "pointGid": "de:08111:6056:1:2",
                                "zone": "vvs:1",
                                "attrs": [
                                    {
                                        "name": "AREA_NIVEAU_DIVA",
                                        "value": "-2"
                                    }
                                ],
                                "coords": "3512801.00000,755678.00000",
                                "niveau": "-2",
                                "arrDateTime": "20200402 09:03",
                                "arrDateTimeSec": "20200402 09:03:00",
                                "arrDelay": "0",
                                "arrValid": "0",
                                "depDelay": "0",
                                "depValid": "0"
                            }
                        }
                    ],
                    "infos": {
                        "info": {
                            "infoLinkText": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                            "infoLinkURL": "https://ems.vvs.de/ems.comm.addinfo-info_link?event=cf7f6a8d699b44adba17a69308e4d5f9&device=60551f5633ff432eac9572c79a1c7f87&mt=html",
                            "infoText": {
                                "content": "Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn) bis auf Weiteres außer Betrieb.",
                                "subtitle": "Aufzug zu Gleis 1/2 (S-Bahn) außer Betrieb",
                                "subject": "Haltestelle Stadtmitte",
                                "additionalText": "TextType: 6b9e957670424d449033ba49fe42aed8",
                                "htmlText": "<div class=\"ems-event\">\n<div><div class=\"event\"> Am Bahnhof Stadtmitte ist der Aufzug zu Gleis 1/2 (S-Bahn)  bis auf Weiteres  außer Betrieb.    </div></div>\n</div>",
                                "wmlText": "",
                                "smsText": "Haltestelle Stadtmitte",
                                "speechText": ""
                            },
                            "paramList": [
                                {
                                    "type": "addInfoParam",
                                    "name": "publisher",
                                    "value": "EMS",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "infoID",
                                    "value": "41490",
                                    "edit": "0"
                                },
                                {
                                    "type": "system",
                                    "name": "seqID",
                                    "value": "1",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "infoType",
                                    "value": "stopInfo",
                                    "edit": "0"
                                },
                                {
                                    "type": "addInfoParam",
                                    "name": "priority",
                                    "value": "normal",
                                    "edit": "0"
                                },
                                {
                                    "type": "messageSubType",
                                    "name": "stopInfo",
                                    "value": "escalator_elevator",
                                    "edit": "0"
                                }
                            ]
                        }
                    },
                    "format": "x,y",
                    "path": "3508470.38307,761171.32793 3508510.34781,761133.01325 3508554.93753,761088.51940 3508565.14883,761078.70675 3508573.35379,761070.30942 3508622.52797,761022.38294 3508677.17306,760968.55374 3508679.65552,760965.85876 3508727.54667,760917.21050 3508744.93563,760896.68848 3508763.88417,760871.49338 3508780.22336,760847.87027 3508803.19995,760811.30363 3508817.46643,760784.38087 3508832.13964,760754.21026 3508851.44696,760705.11640 3508859.97680,760679.40356 3508866.69561,760652.88176 3508873.46673,760622.25642 3508877.72438,760597.86250 3508881.42797,760567.35318 3508883.05597,760545.47664 3508883.72678,760509.07825 3508878.80594,760439.44958 3508872.90699,760369.90028 3508869.82866,760339.67966 3508865.87809,760316.08823 3508855.16522,760277.07220 3508842.79656,760242.18446 3508834.80842,760223.67028 3508829.28778,760211.91348 3508826.35824,760206.00197 3508818.73680,760191.42385 3508805.96875,760168.98047 3508790.39597,760145.07353 3508778.09940,760127.66693 3508751.26388,760093.41316 3508740.05616,760080.71986 3508720.27877,760058.29828 3508719.66715,760057.58752 3508676.85361,760007.50031 3508665.78591,759994.76217 3508665.78591,759994.76217 3508654.81409,759982.15730 3508632.08835,759955.28063 3508589.94724,759906.19257 3508570.83963,759883.25790 3508534.69904,759842.20038 3508521.74548,759827.12951 3508486.61719,759788.66123 3508463.89756,759764.78640 3508443.04317,759743.69992 3508429.64407,759730.39766 3508372.24759,759678.45057 3508310.62472,759637.62963 3508192.25446,759563.64065 3508122.04747,759505.12630 3508094.37679,759473.41716 3508039.07714,759407.65199 3507978.37949,759330.85128 3507925.95495,759257.51897 3507904.59532,759224.75467 3507903.60700,759222.75437 3507881.48683,759187.64462 3507881.16969,759187.00008 3507880.95574,759186.52220 3507874.91713,759175.61032 3507863.12943,759150.39440 3507863.12943,759150.39440 3507853.78344,759130.40168 3507837.75685,759092.50312 3507831.52699,759076.14242 3507827.88841,759066.88411 3507825.67393,759061.00445 3507820.25685,759042.04041 3507789.94754,758897.00441 3507783.77538,758847.67128 3507780.43826,758747.78042 3507788.09896,758698.45039 3507830.59697,758566.39101 3507921.08655,758432.34006 3507993.42585,758372.22035 3508075.71613,758319.61401 3508507.69686,758066.83064 3508533.72553,758051.58946 3509135.42517,757691.03969 3509280.65694,757604.57322 3509365.83749,757553.19965 3509366.54993,757552.75364 3509558.08969,757446.60819 3509714.91718,757355.64020 3510045.06583,757159.46057 3510229.38457,757050.66936 3510598.44848,756832.77868 3510827.89678,756696.98169 3510911.95555,756653.92703 3510964.68858,756629.05885 3511093.24428,756572.50302 3511101.35372,756569.38436 3511118.71847,756562.71104 3511175.44704,756540.70206 3511266.98613,756502.30891 3511392.09801,756443.28433 3511415.57855,756433.27262 3511478.95520,756410.27955 3511482.19440,756409.03854 3511522.30494,756393.15406 3511582.85499,756368.70881 3511582.85499,756368.70881 3511615.48744,756355.53025 3511671.09422,756333.30726 3511673.52542,756332.39032 3511687.68593,756326.72274 3511774.88675,756287.50735 3511825.66717,756267.35024 3511876.00655,756247.36042 3512025.74458,756187.88025 3512055.40836,756176.11779 3512111.11715,756155.10233 3512123.89646,756150.17058 3512148.55973,756140.99839 3512150.48407,756140.30475 3512240.82919,756103.11034 3512265.06404,756093.16013 3512269.05918,756091.55004 3512269.05918,756091.55004 3512364.69883,756052.74068 3512417.49503,756025.32312 3512450.13631,756011.27225 3512519.38377,755981.47078 3512550.28502,755961.96300 3512576.99538,755938.71680 3512616.67827,755902.20784 3512628.72975,755891.12688 3512661.47813,755850.18496 3512672.53423,755837.81616 3512723.63511,755780.65195 3512726.95466,755776.22955 3512751.60552,755743.33451 3512771.89613,755716.27647 3512791.36585,755690.31004 3512800.10776,755678.65797"
                }
            ],
            "itdFare": {
                "fares": {
                    "fare": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "unitName": "Zone",
                        "fareAdult": "2.60",
                        "fareChild": "1.30",
                        "unitsAdult": "1",
                        "unitsChild": "1",
                        "fareBikeAdult": "",
                        "fareBikeChild": "",
                        "unitsBikeAdult": "",
                        "unitsBikeChild": "",
                        "levelAdult": "",
                        "levelChild": "",
                        "idAdult": "1",
                        "idChild": "8",
                        "note": "",
                        "genericTicketGroups": [
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTicket Mobil"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "2.50"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "1.22"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "15"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "22"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "4er-Ticket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "4.90"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "30"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "37"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "183"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "EinzelTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "5.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "188"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket (Automat)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.40"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "193"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "GruppenTagesTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "10.20"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "198"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "WochenTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "23.30"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "50"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "69.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "57"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "690.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "64"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "JahresTicket (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "824.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "71"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "MonatsTicket für Schüler, Auszubildende, Studenten"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "49.20"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": "78"
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "656.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "89"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "54.63"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "96"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "783.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "103"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 5 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "65.23"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "110"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "621.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "139"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (persönlich) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "51.75"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "146"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar)"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "741.60"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "153"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "FirmenTicket 10 % Rabatt (übertragbar) Abbuchung"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "1"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "61.80"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "160"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            },
                            {
                                "genericTickets": [
                                    {
                                        "ticket": "TICKETTYPE",
                                        "value": "StudiTicket"
                                    },
                                    {
                                        "ticket": "FARE_CATEGORY",
                                        "value": "Netz"
                                    },
                                    {
                                        "ticket": "FARE_ADULT",
                                        "value": "207.00"
                                    },
                                    {
                                        "ticket": "FARE_CHILD",
                                        "value": "0.00"
                                    },
                                    {
                                        "ticket": "CURRENCY_CODE",
                                        "value": "EUR"
                                    },
                                    {
                                        "ticket": "TICKET_ID_ADULT",
                                        "value": "138"
                                    },
                                    {
                                        "ticket": "TICKET_ID_CHILD",
                                        "value": ""
                                    },
                                    {
                                        "ticket": "TARIFF_AUTHORITY",
                                        "value": "vvs"
                                    }
                                ]
                            }
                        ]
                    }
                },
                "tickets": {
                    "ticket": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "currency": "EUR",
                        "weekAdult": "",
                        "weekChild": "",
                        "monthAdult": "",
                        "monthChild": "",
                        "weekEducation": "",
                        "monthEducation": "",
                        "yearAdults": "",
                        "yearChildren": "",
                        "yearStudents": "",
                        "dayAdults": "",
                        "dayChildren": "",
                        "dayStudents": "",
                        "levelAdult": "1",
                        "levelChild": "1",
                        "genericTickets": null
                    }
                },
                "tariffZones": {
                    "tariffZone": {
                        "net": "vvs",
                        "toPR": "1",
                        "fromPR": "0",
                        "neutralZone": "",
                        "zones": {
                            "zone": {
                                "zoneElems": {
                                    "zoneElem": {
                                        "zone": "1"
                                    }
                                }
                            }
                        }
                    }
                },
                "specialTickets": null
            },
            "attrs": []
        }
    ]
}