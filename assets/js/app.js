function fetchData() {
    return angular.injector([ "ng" ]).get("$http").get("../config.json").then(function(e) {
        app.constant("CONFIG", e.data), app.constant("HOSTLOGIN", "username=" + e.data.username + "&password=" + e.data.password + "&");
    }, function(e) {
        app.constant("CONFIG", void 0);
    });
}

function bootstrapApplication() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, [ "main" ]);
    });
}

function CalendarController(e, t, n, a) {
    function o(e) {
        var t = document.getElementById("authorize-button");
        e && !e.error ? i() : (t.style.visibility = "", t.onclick = handleAuthClick);
    }
    function i() {
        gapi.client.load("calendar", "v3", function() {
            gapi.client.calendar.events.list({
                calendarId: "primary",
                timeMin: "2015-12-23T04:26:52.000Z"
            }).execute(function(e) {
                r.calendarlist = e.items, r.calandar = e;
            });
        });
    }
    var r = this;
    r.calendarlist = [], r.calendar = [], r.clientid = a.calendar_api, r.url = "https://www.googleapis.com/auth/calendar", 
    gapi.auth.authorize({
        client_id: r.clientid,
        scope: r.url,
        immediate: !1
    }, o), t.$on("$reload", function(e, t) {});
}

function DevicesController(e, t, n, a, o, i, r) {
    function s() {
        a.getDevices(), l.device = a.getDevice(l.deviceid)[0];
    }
    function c(e, t) {
        n.get(i.hostname + "/json.htm?" + r + "type=command&param=switchlight&idx=" + e + "&switchcmd=Set%20Level&level=" + t).then(function() {
            s();
        });
    }
    var l = this;
    l.device = {}, l.devices = e.data, l.deviceid = e.id, l.blocktitle = e.name, l.switchDevice = function(e) {
        if ("Off" === e.Data) t = "On"; else var t = "Off";
        n.get(i.hostname + "/json.htm?" + r + "type=command&param=switchlight&idx=" + e.idx + "&switchcmd=" + t).then(function() {
            s();
        });
    }, l.dimDevice = c, l.getIcon = function(e) {
        if ("Dimmer" === e.SwitchType || "Media Player" === e.SwitchType || "On/Off" === e.SwitchType || "Selector" === e.SwitchType) switch (e.Image) {
          case "Light":
            return "fa-lightbulb-o";

          case "Alarm":
            return "fa-bell";

          case "Amplifier":
            return "fa-bullhorn";

          case "ChristmasTree":
            return "fa-tree";

          case "Computer":
            return "fa-laptop";

          case "ComputerPC":
            return "fa-desktop";

          case "Cooling":
            return "fa-snowflake-o";

          case "Fan":
            return "fa-refresh";

          case "Fireplace":
            return "fa-fire";

          case "Generic":
            return "fa-power-off";

          case "Harddisk":
            return "fa-hdd-o";

          case "Heating":
            return "fa-thermometer-full";

          case "Media":
            return "fa-youtube-play";

          case "Phone":
            return "fa-mobile";

          case "Printer":
            return "fa-print";

          case "Speaker":
            return "fa-volume-up";

          case "TV":
            return "fa-television";

          case "WallSocket":
            return "fa-plug";

          case "Water":
            return "fa-tint";
        } else switch (e.SwitchType) {
          case "Blinds":
          case "Blinds Inverted":
          case "Blinds Percentage":
          case "Blinds Percentage Inverted":
            return "fa-bars";

          case "Contact":
            return "fa-exchange";

          case "Door Lock":
            return "fa-lock";

          case "Doorbell":
            return "fa-bell-o";

          case "Dusk Sensor":
            return "fa-sun-o";

          case "Motion Sensor":
            return "fa-assistive-listening-systems";

          case "Push Off Button":
            return "fa-toggle-off";

          case "Push On Button":
            return "fa-toggle-on";

          case "Smoke Detector":
            return "fa-cloud";

          case "Venetian Blinds EU":
          case "Venetian Blinds US":
            return "fa-bars";

          case "X10 Siren":
            return "fa-bullhorn";
        }
    }, function(e) {
        var t = l.devices.filter(function(t) {
            return t.idx == e;
        });
        l.device = t[0];
    }(l.deviceid), e.$on("slideEnded", function(e, t) {
        var n = e.targetScope.rzSliderModel;
        c(l.deviceid, n);
    }), t.$on("$reload", function(e, t) {
        s();
    });
}

function NewsController(e, t, n, a, o) {
    function i(e, t) {
        n.get(t.location).then(function(t) {
            var n = new X2JS().xml_str2json(t.data);
            s.newstitle[e] = n.rss.channel.title, s.news[e] = r(n.rss.channel.item), o(function() {
                s.changed = !1;
            }, 1e3);
        });
    }
    function r(e) {
        for (var t = e.length - 1; t > 0; t--) {
            var n = Math.floor(Math.random() * (t + 1)), a = e[t];
            e[t] = e[n], e[n] = a;
        }
        return e;
    }
    var s = this;
    s.news = [], s.newstitle = [], s.newslimit = 1, s.newssources = a.news, s.changed = !0, 
    s.getNews = i, t.$on("$reload", function(e, t) {
        s.changed = !0, angular.forEach(a.news, function(e, t) {
            i(t, e);
        });
    });
}

function SettingsController(e, t, n) {
    function a() {
        n.get("../../config.json").then(function(e) {
            o.settings = e.data, o.settings.username = atob(e.data.username), o.settings.password = atob(e.data.password), 
            o.settings.news || (o.settings.news = []), o.settings.colums || (o.settings.colums = []), 
            o.settings.blocks || (o.settings.blocks = []), o.settings.tabs || (o.settings.tabs = []);
        });
    }
    var o = this;
    o.settings = {}, o.load = t.load, o.username = "", o.password = "", o.isActive = !1, 
    o.saveSettings = function() {
        o.settings.username = btoa(o.settings.username), o.settings.password = btoa(o.settings.password), 
        n.post("app/settings/settings.save.php", o.settings).then(function(e) {
            a();
        });
    }, o.editNews = function(e, t) {
        if ("add" === t) o.settings.news.push({
            location: ""
        }); else {
            var n = [];
            angular.forEach(o.settings.news, function(e) {
                e.selected || n.push(e);
            }), o.settings.news = n;
        }
    }, o.editColums = function(e, t) {
        if ("add" === t) o.settings.colums.push({
            colum: "",
            class: ""
        }); else {
            var n = [];
            angular.forEach(o.settings.colums, function(e) {
                e.selected || n.push(e);
            }), o.settings.colums = n;
        }
    }, o.editBlocks = function(e, t) {
        if ("add" === t) o.settings.blocks.push({
            type: "",
            class: "",
            colum: "",
            title: ""
        }); else {
            var n = [];
            angular.forEach(o.settings.blocks, function(e) {
                e.selected || n.push(e);
            }), o.settings.blocks = n;
        }
    }, o.editTabs = function(e, t) {
        if ("add" === t) o.settings.tabs.push({
            tab: "",
            type: "",
            class: "",
            title: ""
        }); else {
            var n = [];
            angular.forEach(o.settings.tabs, function(e) {
                e.selected || n.push(e);
            }), o.settings.tabs = n;
        }
    }, o.toggle = function() {
        o.isActive = !o.isActive;
    }, a();
}

function SpotifyController(e, t, n, a, o, i) {
    function r() {
        for (var e, t = {}, n = /([^&;=]+)=?([^&;]*)/g, a = window.location.hash.substring(1); e = n.exec(a); ) t[e[1]] = decodeURIComponent(e[2]);
        return t;
    }
    function s() {
        var e = encodeURIComponent("http://" + window.location.host + "//#");
        a.hash() ? (u.settings.spotify_access_token = r().access_token, n.post("app/settings/settings.save.php", u.settings).then(function(e) {
            c(e.spotify_access_token), l(e.spotify_access_token);
        })) : window.location = "https://accounts.spotify.com/authorize/?client_id=" + o.spotify_clientid + "&redirect_uri=" + e + "&scope=playlist-read-private%20user-read-private%20user-read-email%20user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&response_type=token";
    }
    function c(e) {
        n.get("https://api.spotify.com/v1/users/" + o.spotify_username + "/playlists", {
            headers: {
                Authorization: "Bearer " + e
            }
        }).then(function(e) {
            u.playlist = e.data.items;
        }, function(e) {
            "The access token expired" === e.data.error.message && s();
        });
    }
    function l(e) {
        n.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: "Bearer " + e
            }
        }).then(function(e) {
            u.defaultplaylist = "http://embed.spotify.com?uri=" + e.data.context.uri + "&theme=black&view=coverart";
        });
    }
    var u = this;
    u.playlist = {}, u.settings = o, u.defaultplaylist = "", u.playlisttotal = "", u.playPlaylist = function(e) {
        u.defaultplaylist = "http://embed.spotify.com?uri=" + e + "&theme=black&view=coverart";
    }, void 0 === o.spotify_access_token ? s() : (c(o.spotify_access_token), l(o.spotify_access_token)), 
    t.$on("$reload", function(e, t) {
        void 0 === o.spotify_access_token ? s() : (c(o.spotify_access_token), l(o.spotify_access_token));
    });
}

function TabsController(e, t, n, a, o, i) {
    var r = this;
    r.tabs = i.tabs, r.activetab = 0, r.setTab = function(e) {
        r.activetab = e;
    }, r.isSet = function(e) {
        return r.activetab === e;
    };
}

function TrafficController(e, t, n, a, o, i) {
    function r() {
        n.get(s.url).then(function(e) {
            s.traffic = e.data.roadEntries, s.newtrafficlist = {}, angular.forEach(s.traffic, function(e) {
                s.newtrafficlist = e, angular.forEach(e.events, function(e, t) {
                    0 != e.length && "roadWorks" == t ? angular.merge(s.newtrafficlist, {
                        roadwork: e
                    }) : 0 != e.length && "trafficJams" == t && angular.merge(s.newtrafficlist, {
                        trafficjam: e
                    });
                });
            });
        });
    }
    var s = this;
    s.traffic = [], s.newtrafficlist = [], s.url = a.traffic_url, s.activestate = "trafficjam", 
    r(), t.$on("$reload", function(e, t) {
        r();
    });
}

function WeatherController(e, t, n, a, o, i, r) {
    function s() {
        n.get("https://api.wunderground.com/api/" + r.weather_wunderground_api + "/conditions/q/" + r.weather_country + "/" + r.weather_location + ".json").then(function(e) {
            d.weather = e.data.current_observation, d.location = d.weather.display_location.city, 
            u(d.weather.icon, "");
        });
    }
    function c() {
        n.get("https://api.wunderground.com/api/" + r.weather_wunderground_api + "/forecast10day/q/" + r.weather_country + "/" + r.weather_location + ".json").then(function(e) {
            d.forecast = e.data.forecast.simpleforecast.forecastday;
        });
    }
    function l() {
        d.time = i("date")(new Date(), "HH:mm:ss"), d.day = i("date")(new Date(), "EEEE"), 
        d.date = i("date")(new Date(), "dd - MM - yyyy");
    }
    function u(e, t) {
        o(function() {
            var n = new Skycons({
                color: "white"
            }), a = "icon" + t;
            "chanceflurries" == e && n.add(a, Skycons.WIND), "chancerain" == e && n.add(a, Skycons.RAIN), 
            "chancesleet" == e && n.add(a, Skycons.SLEET), "chancesnow" == e && n.add(a, Skycons.SNOW), 
            "chancetstorms" == e && n.add(a, Skycons.WIND), "clear" == e && n.add(a, Skycons.CLEAR_DAY), 
            "cloudy" == e && n.add(a, Skycons.CLOUDY), "flurries" == e && n.add(a, Skycons.WIND), 
            "fog" == e && n.add(a, Skycons.FOG), "hazy" == e && n.add(a, Skycons.PARTLY_CLOUDY_DAY), 
            "mostlycloudy" == e && n.add(a, Skycons.CLOUDY), "mostlysunny" == e && n.add(a, Skycons.CLEAR_DAY), 
            "partlycloudy" == e && n.add(a, Skycons.PARTLY_CLOUDY_DAY), "partlysunny" == e && n.add(a, Skycons.PARTLY_CLOUDY_DAY), 
            "sleet" == e && n.add(a, Skycons.SLEET), "rain" == e && n.add(a, Skycons.RAIN), 
            "snow" == e && n.add(a, Skycons.SNOW), "sunny" == e && n.add(a, Skycons.CLEAR_DAY), 
            "tstorms" == e && n.add(a, Skycons.WIND), n.play();
        }, 0);
    }
    var d = this;
    d.time = "", d.day = "", d.date = "", d.getIcon = u;
    a(function() {
        s(), c();
    }, r.weather_refresh), a(function() {
        l();
    }, 1e3);
}

CalendarController.$inject = [ "$scope", "$rootScope", "$http", "CONFIG" ], DevicesController.$inject = [ "$scope", "$rootScope", "$http", "devicesService", "$timeout", "CONFIG", "HOSTLOGIN" ], 
NewsController.$inject = [ "$scope", "$rootScope", "$http", "CONFIG", "$timeout" ], 
SettingsController.$inject = [ "$scope", "$rootScope", "$http" ], SpotifyController.$inject = [ "$scope", "$rootScope", "$http", "$location", "CONFIG", "HOSTLOGIN" ], 
TabsController.$inject = [ "$scope", "$element", "$rootScope", "$http", "$compile", "CONFIG" ], 
TrafficController.$inject = [ "$scope", "$rootScope", "$http", "CONFIG", "$timeout", "$filter" ], 
WeatherController.$inject = [ "$scope", "$rootScope", "$http", "$interval", "$timeout", "$filter", "CONFIG" ];

var app = angular.module("main", [ "rzModule", "angular-carousel" ]);

fetchData().then(bootstrapApplication), app.config([ "$sceProvider", "$locationProvider", function(e, t) {
    e.enabled(!1), t.html5Mode({
        enabled: !0,
        requireBase: !1
    });
} ]), angular.module("main").filter("removeHTMLTags", function() {
    return function(e) {
        return e ? String(e).replace(/<[^>]+>/gm, "") : "";
    };
}), angular.module("main").run([ "$interval", "$rootScope", "devicesService", "CONFIG", "HOSTLOGIN", function(e, t, n, a, o) {
    if (void 0 === a) {
        t.load = !1;
        var i = 5e3, r = 1;
        t.background = 1;
    } else {
        t.load = !0;
        var i = a.refresh, r = a.bgimages;
        t.background = a.bgimages, t.$on("$reload", function(e, t) {
            n.getDevices();
        });
    }
    e(function() {
        t.background = Math.floor(Math.random() * r) + 1, t.$broadcast("$reload");
    }, i);
} ]), angular.module("main").controller("CalendarController", CalendarController), 
angular.module("main").directive("calendar", function() {
    return {
        scope: {},
        controller: "CalendarController",
        controllerAs: "vm",
        templateUrl: "app/calendar/calendar.tpl.html"
    };
}), angular.module("main").directive("grid", [ "$rootScope", "$compile", "$http", "devicesService", "CONFIG", "HOSTLOGIN", function(e, t, n, a, o, i) {
    return {
        scope: {},
        link: function(e, n) {
            function i() {
                angular.forEach(s.blocks, function(e) {
                    r(e);
                }), t(n.contents())(e);
            }
            function r(t) {
                if (t.type.indexOf("Device") >= 0) {
                    e.devices = s.devices;
                    var n = t.type.substr(t.type.indexOf("=") + 1);
                    t.type = "Device";
                }
                switch (t.type) {
                  case "Heading":
                    angular.element(document.getElementById(t.colum)).append('<div class="heading ' + t.class + '">' + t.title + "</div>");
                    break;

                  case "Device":
                    angular.element(document.getElementById(t.colum)).append('<block class="block dev ' + t.class + '"><device class="device" name="' + t.title + '" data="devices" id="' + n + '"></device></block>');
                    break;

                  case "News":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><news></news></block>');
                    break;

                  case "Tabs":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><tabs id="tabs"></tabs></block>');
                    break;

                  case "Weather":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><weather></weather></block>');
                    break;

                  case "Traffic":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><traffic></traffic></block>');
                    break;

                  case "Spotify":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><spotify></spotify></block>');
                    break;

                  case "Calendar":
                    angular.element(document.getElementById(t.colum)).append('<block class="block ' + t.class + '"><calendar></calendar></block>');
                }
            }
            var s = this;
            s.colums = o.colums, s.blocks = o.blocks, s.devices = {}, angular.forEach(s.colums, function(e) {
                angular.element(document.getElementById("colums")).append('<div id="colum' + e.colum + '" class="colum ' + e.class + '"></div>');
            }), t(n.contents())(e), a.getDevices().then(function(e) {
                s.devices = e, i();
            });
        }
    };
} ]), angular.module("main").controller("DevicesController", DevicesController), 
angular.module("main").directive("device", function() {
    return {
        scope: {
            data: "=",
            id: "=",
            name: "@"
        },
        controller: "DevicesController",
        controllerAs: "vm",
        templateUrl: "app/devices/devices.tpl.html"
    };
}), function() {
    "use strict";
    function e(e, t, n, a, o) {
        var i = {};
        return {
            getDevices: function() {
                return e.get(a.hostname + "/json.htm?" + o + "type=devices&filter=light&used=true&order=Name").then(function(e) {
                    return i = e.data.result;
                });
            },
            getDevice: function(e) {
                return i.filter(function(t) {
                    return t.idx == e;
                });
            }
        };
    }
    e.$inject = [ "$http", "$filter", "$timeout", "CONFIG", "HOSTLOGIN" ], angular.module("main").service("devicesService", e);
}(), angular.module("main").controller("NewsController", NewsController), angular.module("main").directive("news", function() {
    return {
        scope: {},
        controller: "NewsController",
        controllerAs: "vm",
        templateUrl: "app/news/news.tpl.html"
    };
}), function(e) {
    "use strict";
    function t(e, t, n, a) {
        e.beginPath(), e.arc(t, n, a, 0, g, !1), e.fill();
    }
    function n(e, t, n, a, o) {
        e.beginPath(), e.moveTo(t, n), e.lineTo(a, o), e.stroke();
    }
    function a(e, n, a, o, i, r, s, c) {
        var l = Math.cos(n * g);
        t(e, a - Math.sin(n * g) * i, o + l * r + .5 * (c -= s), s + (1 - .5 * l) * c);
    }
    function o(e, t, n, o, i, r, s, c) {
        var l;
        for (l = 5; l--; ) a(e, t + l / 5, n, o, i, r, s, c);
    }
    function i(e, t, n, a, i, r, s) {
        t /= 3e4;
        var c = .21 * i, l = .12 * i, u = .24 * i, d = .28 * i;
        e.fillStyle = s, o(e, t, n, a, c, l, u, d), e.globalCompositeOperation = "destination-out", 
        o(e, t, n, a, c, l, u - r, d - r), e.globalCompositeOperation = "source-over";
    }
    function r(e, t, a, o, i, r, s) {
        t /= 12e4;
        var c, l, u, d, f = .25 * i - .5 * r, h = .32 * i + .5 * r, p = .5 * i - .5 * r;
        for (e.strokeStyle = s, e.lineWidth = r, e.lineCap = "round", e.lineJoin = "round", 
        e.beginPath(), e.arc(a, o, f, 0, g, !1), e.stroke(), c = 8; c--; ) l = (t + c / 8) * g, 
        n(e, a + (u = Math.cos(l)) * h, o + (d = Math.sin(l)) * h, a + u * p, o + d * p);
    }
    function s(e, t, n, a, o, i, r) {
        t /= 15e3;
        var s = .29 * o - .5 * i, c = .05 * o, l = Math.cos(t * g), u = l * g / -16;
        e.strokeStyle = r, e.lineWidth = i, e.lineCap = "round", e.lineJoin = "round", n += l * c, 
        e.beginPath(), e.arc(n, a, s, u + g / 8, u + 7 * g / 8, !1), e.arc(n + Math.cos(u) * s * v, a + Math.sin(u) * s * v, s, u + 5 * g / 8, u + 3 * g / 8, !0), 
        e.closePath(), e.stroke();
    }
    function c(e, t, n, a, o, i, r) {
        t /= 1350;
        var s, c, l, u, d = .16 * o, f = 11 * g / 12, h = 7 * g / 12;
        for (e.fillStyle = r, s = 4; s--; ) c = (t + s / 4) % 1, l = n + (s - 1.5) / 1.5 * (1 === s || 2 === s ? -1 : 1) * d, 
        u = a + c * c * o, e.beginPath(), e.moveTo(l, u - 1.5 * i), e.arc(l, u, .75 * i, f, h, !1), 
        e.fill();
    }
    function l(e, t, a, o, i, r, s) {
        t /= 750;
        var c, l, u, d, f = .1875 * i;
        for (e.strokeStyle = s, e.lineWidth = .5 * r, e.lineCap = "round", e.lineJoin = "round", 
        c = 4; c--; ) l = (t + c / 4) % 1, n(e, u = Math.floor(a + (c - 1.5) / 1.5 * (1 === c || 2 === c ? -1 : 1) * f) + .5, (d = o + l * i) - 1.5 * r, u, d + 1.5 * r);
    }
    function u(e, t, a, o, i, r, s) {
        var c, l, u, d, f = .16 * i, h = .75 * r, p = (t /= 3e3) * g * .7, m = Math.cos(p) * h, v = Math.sin(p) * h, y = p + g / 3, w = Math.cos(y) * h, b = Math.sin(y) * h, k = p + 2 * g / 3, C = Math.cos(k) * h, S = Math.sin(k) * h;
        for (e.strokeStyle = s, e.lineWidth = .5 * r, e.lineCap = "round", e.lineJoin = "round", 
        c = 4; c--; ) l = (t + c / 4) % 1, n(e, (u = a + Math.sin((l + c / 4) * g) * f) - m, (d = o + l * i) - v, u + m, d + v), 
        n(e, u - w, d - b, u + w, d + b), n(e, u - C, d - S, u + C, d + S);
    }
    function d(e, t, n, a, i, r, s) {
        t /= 3e4;
        var c = .21 * i, l = .06 * i, u = .21 * i, d = .28 * i;
        e.fillStyle = s, o(e, t, n, a, c, l, u, d), e.globalCompositeOperation = "destination-out", 
        o(e, t, n, a, c, l, u - r, d - r), e.globalCompositeOperation = "source-over";
    }
    function f(e, t, n, a, o, i, r) {
        var s = o / 8, c = s / 3, l = 2 * c, u = t % 1 * g, d = Math.cos(u), f = Math.sin(u);
        e.fillStyle = r, e.strokeStyle = r, e.lineWidth = i, e.lineCap = "round", e.lineJoin = "round", 
        e.beginPath(), e.arc(n, a, s, u, u + Math.PI, !1), e.arc(n - c * d, a - c * f, l, u + Math.PI, u, !1), 
        e.arc(n + l * d, a + l * f, c, u + Math.PI, u, !0), e.globalCompositeOperation = "destination-out", 
        e.fill(), e.globalCompositeOperation = "source-over", e.stroke();
    }
    function h(e, t, n, a, o, i, r, s, c) {
        t /= 2500;
        var l, u, d, h, p = y[r], m = (t + r - w[r].start) % s, g = (t + r - w[r].end) % s, v = (t + r) % s;
        if (e.strokeStyle = c, e.lineWidth = i, e.lineCap = "round", e.lineJoin = "round", 
        m < 1) {
            if (e.beginPath(), m *= p.length / 2 - 1, l = Math.floor(m), m -= l, l *= 2, l += 2, 
            e.moveTo(n + (p[l - 2] * (1 - m) + p[l] * m) * o, a + (p[l - 1] * (1 - m) + p[l + 1] * m) * o), 
            g < 1) {
                for (g *= p.length / 2 - 1, g -= u = Math.floor(g), u *= 2, u += 2, h = l; h !== u; h += 2) e.lineTo(n + p[h] * o, a + p[h + 1] * o);
                e.lineTo(n + (p[u - 2] * (1 - g) + p[u] * g) * o, a + (p[u - 1] * (1 - g) + p[u + 1] * g) * o);
            } else for (h = l; h !== p.length; h += 2) e.lineTo(n + p[h] * o, a + p[h + 1] * o);
            e.stroke();
        } else if (g < 1) {
            for (e.beginPath(), g *= p.length / 2 - 1, g -= u = Math.floor(g), u *= 2, u += 2, 
            e.moveTo(n + p[0] * o, a + p[1] * o), h = 2; h !== u; h += 2) e.lineTo(n + p[h] * o, a + p[h + 1] * o);
            e.lineTo(n + (p[u - 2] * (1 - g) + p[u] * g) * o, a + (p[u - 1] * (1 - g) + p[u + 1] * g) * o), 
            e.stroke();
        }
        v < 1 && (v *= p.length / 2 - 1, v -= d = Math.floor(v), d *= 2, f(e, t, n + (p[(d += 2) - 2] * (1 - v) + p[d] * v) * o, a + (p[d - 1] * (1 - v) + p[d + 1] * v) * o, o, i, c));
    }
    var p, m;
    !function() {
        var t = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame, n = e.cancelAnimationFrame || e.webkitCancelAnimationFrame || e.mozCancelAnimationFrame || e.oCancelAnimationFrame || e.msCancelAnimationFrame;
        t && n ? (p = function(e) {
            function n() {
                a.value = t(n), e();
            }
            var a = {
                value: null
            };
            return n(), a;
        }, m = function(e) {
            n(e.value);
        }) : (p = setInterval, m = clearInterval);
    }();
    var g = 2 * Math.PI, v = 2 / Math.sqrt(2), y = [ [ -.75, -.18, -.7219, -.1527, -.6971, -.1225, -.6739, -.091, -.6516, -.0588, -.6298, -.0262, -.6083, .0065, -.5868, .0396, -.5643, .0731, -.5372, .1041, -.5033, .1259, -.4662, .1406, -.4275, .1493, -.3881, .153, -.3487, .1526, -.3095, .1488, -.2708, .1421, -.2319, .1342, -.1943, .1217, -.16, .1025, -.129, .0785, -.1012, .0509, -.0764, .0206, -.0547, -.012, -.0378, -.0472, -.0324, -.0857, -.0389, -.1241, -.0546, -.1599, -.0814, -.1876, -.1193, -.1964, -.1582, -.1935, -.1931, -.1769, -.2157, -.1453, -.229, -.1085, -.2327, -.0697, -.224, -.0317, -.2064, .0033, -.1853, .0362, -.1613, .0672, -.135, .0961, -.1051, .1213, -.0706, .1397, -.0332, .1512, .0053, .158, .0442, .1624, .0833, .1636, .1224, .1615, .1613, .1565, .1999, .15, .2378, .1402, .2749, .1279, .3118, .1147, .3487, .1015, .3858, .0892, .4236, .0787, .4621, .0715, .5012, .0702, .5398, .0766, .5768, .089, .6123, .1055, .6466, .1244, .6805, .144, .7147, .163, .75, .18 ], [ -.75, 0, -.7033, .0195, -.6569, .0399, -.6104, .06, -.5634, .0789, -.5155, .0954, -.4667, .1089, -.4174, .1206, -.3676, .1299, -.3174, .1365, -.2669, .1398, -.2162, .1391, -.1658, .1347, -.1157, .1271, -.0661, .1169, -.017, .1046, .0316, .0903, .0791, .0728, .1259, .0534, .1723, .0331, .2188, .0129, .2656, -.0064, .3122, -.0263, .3586, -.0466, .4052, -.0665, .4525, -.0847, .5007, -.1002, .5497, -.113, .5991, -.124, .6491, -.1325, .6994, -.138, .75, -.14 ] ], w = [ {
        start: .36,
        end: .11
    }, {
        start: .56,
        end: .16
    } ], b = function(e) {
        this.list = [], this.interval = null, this.color = e && e.color ? e.color : "black", 
        this.resizeClear = !(!e || !e.resizeClear);
    };
    b.CLEAR_DAY = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, i = Math.min(a, o);
        r(e, t, .5 * a, .5 * o, i, .08 * i, n);
    }, b.CLEAR_NIGHT = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, i = Math.min(a, o);
        s(e, t, .5 * a, .5 * o, i, .08 * i, n);
    }, b.PARTLY_CLOUDY_DAY = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, s = Math.min(a, o);
        r(e, t, .625 * a, .375 * o, .75 * s, .08 * s, n), i(e, t, .375 * a, .625 * o, .75 * s, .08 * s, n);
    }, b.PARTLY_CLOUDY_NIGHT = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, r = Math.min(a, o);
        s(e, t, .667 * a, .375 * o, .75 * r, .08 * r, n), i(e, t, .375 * a, .625 * o, .75 * r, .08 * r, n);
    }, b.CLOUDY = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, r = Math.min(a, o);
        i(e, t, .5 * a, .5 * o, r, .08 * r, n);
    }, b.RAIN = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, r = Math.min(a, o);
        c(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n), i(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n);
    }, b.SLEET = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, r = Math.min(a, o);
        l(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n), i(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n);
    }, b.SNOW = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, r = Math.min(a, o);
        u(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n), i(e, t, .5 * a, .37 * o, .9 * r, .08 * r, n);
    }, b.WIND = function(e, t, n) {
        var a = e.canvas.width, o = e.canvas.height, i = Math.min(a, o);
        h(e, t, .5 * a, .5 * o, i, .08 * i, 0, 2, n), h(e, t, .5 * a, .5 * o, i, .08 * i, 1, 2, n);
    }, b.FOG = function(e, t, a) {
        var o = e.canvas.width, i = e.canvas.height, r = Math.min(o, i), s = .08 * r;
        d(e, t, .5 * o, .32 * i, .75 * r, s, a), t /= 5e3;
        var c = Math.cos(t * g) * r * .02, l = Math.cos((t + .25) * g) * r * .02, u = Math.cos((t + .5) * g) * r * .02, f = Math.cos((t + .75) * g) * r * .02, h = .936 * i, p = Math.floor(h - .5 * s) + .5, m = Math.floor(h - 2.5 * s) + .5;
        e.strokeStyle = a, e.lineWidth = s, e.lineCap = "round", e.lineJoin = "round", n(e, c + .2 * o + .5 * s, p, l + .8 * o - .5 * s, p), 
        n(e, u + .2 * o + .5 * s, m, f + .8 * o - .5 * s, m);
    }, b.prototype = {
        _determineDrawingFunction: function(e) {
            return "string" == typeof e && (e = b[e.toUpperCase().replace(/-/g, "_")] || null), 
            e;
        },
        add: function(e, t) {
            var n;
            "string" == typeof e && (e = document.getElementById(e)), null !== e && "function" == typeof (t = this._determineDrawingFunction(t)) && (n = {
                element: e,
                context: e.getContext("2d"),
                drawing: t
            }, this.list.push(n), this.draw(n, 500));
        },
        set: function(e, t) {
            var n;
            for ("string" == typeof e && (e = document.getElementById(e)), n = this.list.length; n--; ) if (this.list[n].element === e) return this.list[n].drawing = this._determineDrawingFunction(t), 
            void this.draw(this.list[n], 500);
            this.add(e, t);
        },
        remove: function(e) {
            var t;
            for ("string" == typeof e && (e = document.getElementById(e)), t = this.list.length; t--; ) if (this.list[t].element === e) return void this.list.splice(t, 1);
        },
        draw: function(e, t) {
            var n = e.context.canvas;
            this.resizeClear ? n.width = n.width : e.context.clearRect(0, 0, n.width, n.height), 
            e.drawing(e.context, t, this.color);
        },
        play: function() {
            var e = this;
            this.pause(), this.interval = p(function() {
                var t, n = Date.now();
                for (t = e.list.length; t--; ) e.draw(e.list[t], n);
            }, 1e3 / 60);
        },
        pause: function() {
            this.interval && (m(this.interval), this.interval = null);
        }
    }, e.Skycons = b;
}(this), angular.module("main").controller("SettingsController", SettingsController), 
angular.module("main").directive("settings", function() {
    return {
        scope: {},
        controller: "SettingsController",
        controllerAs: "vm",
        templateUrl: "app/settings/settings.tpl.html"
    };
}), angular.module("main").controller("SpotifyController", SpotifyController), angular.module("main").directive("spotify", function() {
    return {
        scope: {},
        controller: "SpotifyController",
        controllerAs: "vm",
        templateUrl: "app/spotify/spotify.tpl.html"
    };
}), angular.module("main").controller("TabsController", TabsController), angular.module("main").directive("tabs", function() {
    return {
        scope: {},
        controller: "TabsController",
        controllerAs: "vm",
        templateUrl: "app/tabs/tabs.tpl.html"
    };
}), angular.module("main").controller("TrafficController", TrafficController), angular.module("main").directive("traffic", function() {
    return {
        scope: {},
        controller: "TrafficController",
        controllerAs: "vm",
        templateUrl: "app/traffic/traffic.tpl.html"
    };
}), angular.module("main").controller("WeatherController", WeatherController), angular.module("main").directive("weather", function() {
    return {
        scope: {},
        controller: "WeatherController",
        controllerAs: "vm",
        templateUrl: "app/weather/weather.tpl.html"
    };
});