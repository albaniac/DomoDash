function e(){return angular.injector(["ng"]).get("$http").get("./config.json?nocache="+(new Date).getTime()).then(function(e){f.constant("CONFIG",e.data),e.data.username&&e.data.password?f.constant("HOSTLOGIN","username="+e.data.username+"&password="+e.data.password+"&"):f.constant("HOSTLOGIN",void 0)},function(e){f.constant("CONFIG",void 0),f.constant("HOSTLOGIN",void 0)})}function t(){angular.element(document).ready(function(){angular.bootstrap(document,["main"])})}function n(e,t,n,a){function o(){i.image="assets/img/bg/"+r+".gif",++r>s&&(r=1),n(i.getImages,6e3)}var i=this,r=1;if(i.backgrounds=[],i.getImages=o,i.image=[],void 0!=a&&void 0!=a.bgimages)s=a.bgimages;else var s=1;o()}function a(e,t,n,a,o,i,r){function s(t){a.get(e.id,t).then(function(e){l.device=e[0]})}function c(e,t){n.get(a.getHost()+"/json.htm?"+r+"type=command&param=switchlight&idx="+e+"&switchcmd=Set%20Level&level="+t).then(function(){s(!0)})}var l=this;l.deviceid=e.id,l.blocktitle=e.name,l.device={},l.devicesService=a,l.switchDevice=function(e){if("Off"===e.Data)t="On";else var t="Off";n.get(a.getHost()+"/json.htm?"+r+"type=command&param=switchlight&idx="+e.idx+"&switchcmd="+t).then(function(){s(!0)})},l.dimDevice=c,l.getIcon=function(e){if("Dimmer"===e.SwitchType||"Media Player"===e.SwitchType||"On/Off"===e.SwitchType||"Selector"===e.SwitchType)switch(e.Image){case"Light":return"fa-lightbulb-o";case"Alarm":return"fa-bell";case"Amplifier":return"fa-bullhorn";case"ChristmasTree":return"fa-tree";case"Computer":return"fa-laptop";case"ComputerPC":return"fa-desktop";case"Cooling":return"fa-snowflake-o";case"Fan":return"fa-refresh";case"Fireplace":return"fa-fire";case"Generic":return"fa-power-off";case"Harddisk":return"fa-hdd-o";case"Heating":return"fa-thermometer-full";case"Media":return"fa-youtube-play";case"Phone":return"fa-mobile";case"Printer":return"fa-print";case"Speaker":return"fa-volume-up";case"TV":return"fa-television";case"WallSocket":return"fa-plug";case"Water":return"fa-tint"}else switch(e.SwitchType){case"Blinds":case"Blinds Inverted":case"Blinds Percentage":case"Blinds Percentage Inverted":return"fa-bars";case"Contact":return"fa-exchange";case"Door Lock":return"fa-lock";case"Doorbell":return"fa-bell-o";case"Dusk Sensor":return"fa-sun-o";case"Motion Sensor":return"fa-assistive-listening-systems";case"Push Off Button":return"fa-toggle-off";case"Push On Button":return"fa-toggle-on";case"Smoke Detector":return"fa-cloud";case"Venetian Blinds EU":case"Venetian Blinds US":return"fa-bars";case"X10 Siren":return"fa-bullhorn"}},s(!1),e.$on("slideEnded",function(e,t){var n=e.targetScope.rzSliderModel;c(l.deviceid,n)})}function o(e,t,n,a){function o(){r.blocks&&angular.forEach(r.blocks,function(e,t){e.type.match("Device")&&(r.gotDevices=!0)})}function i(){!0===r.gotDevices&&t.get(!0)}var r=this;r.gotDevices=!1,r.blocks=n.blocks,o(),i(),e.$on("$reload",function(e,n){!0===r.gotDevices&&t.get(!0)})}function i(e,t,n,a){function o(e){var t=document.getElementById("authorize-button");e&&!e.error?i():(t.style.visibility="",t.onclick=handleAuthClick)}function i(){gapi.client.load("calendar","v3",function(){gapi.client.calendar.events.list({calendarId:"primary",timeMin:"2015-12-23T04:26:52.000Z"}).execute(function(e){r.calendarlist=e.items,r.calandar=e})})}var r=this;r.calendarlist=[],r.calendar=[],r.clientid=a.calendar_api,r.url="https://www.googleapis.com/auth/calendar",gapi.auth.authorize({client_id:r.clientid,scope:r.url,immediate:!1},o),t.$on("$reload",function(e,t){})}function r(e,t,n,a,o){function i(e,t){n.get(t.location).then(function(t){var n=(new X2JS).xml_str2json(t.data);s.newstitle[e]=n.rss.channel.title,s.news[e]=r(n.rss.channel.item),o(function(){s.changed=!1},1e3)})}function r(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}return e}var s=this;s.news=[],s.newstitle=[],s.newslimit=1,s.newssources=a.news,s.changed=!0,s.getNews=i,t.$on("$reload",function(e,t){s.changed=!0,angular.forEach(a.news,function(e,t){i(t,e)})})}function s(e,t,n,a,o,i){function r(){n.get(s.url).then(function(e){s.traffic=e.data.roadEntries,s.newtrafficlist={},angular.forEach(s.traffic,function(e){s.newtrafficlist=e,angular.forEach(e.events,function(e,t){0!=e.length&&"roadWorks"==t?angular.merge(s.newtrafficlist,{roadwork:e}):0!=e.length&&"trafficJams"==t&&angular.merge(s.newtrafficlist,{trafficjam:e})})})})}var s=this;s.traffic=[],s.newtrafficlist=[],s.url=a.traffic_url,s.activestate="trafficjam",r(),t.$on("$reload",function(e,t){r()})}function c(e,t,n,a,o,i){function r(){for(var e,t={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);e=n.exec(a);)t[e[1]]=decodeURIComponent(e[2]);return t}function s(){var e=encodeURIComponent(window.location.href+"#");a.hash()?(d.settings.spotify_access_token=r().access_token,n.post("app/settings/settings.save.php",d.settings).then(function(e){c(e.spotify_access_token),l(e.spotify_access_token)})):window.location="https://accounts.spotify.com/authorize/?client_id="+o.spotify_clientid+"&redirect_uri="+e+"&scope=playlist-read-private%20user-read-private%20user-read-email%20user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&response_type=token"}function c(e){n.get("https://api.spotify.com/v1/users/"+o.spotify_username+"/playlists",{headers:{Authorization:"Bearer "+e}}).then(function(e){d.playlist=e.data.items},function(e){"The access token expired"===e.data.error.message&&s()})}function l(e){n.get("https://api.spotify.com/v1/me/player/currently-playing",{headers:{Authorization:"Bearer "+e}}).then(function(e){null===e.data.context?u(d.playlist[0].uri):d.defaultplaylist="http://embed.spotify.com?uri="+e.data.context.uri+"&theme=black&view=coverart"})}function u(e){d.defaultplaylist="http://embed.spotify.com?uri="+e+"&theme=black&view=coverart"}var d=this;d.playlist={},d.settings=o,d.defaultplaylist="",d.playlisttotal="",d.playPlaylist=u,void 0===o.spotify_access_token?s():(c(o.spotify_access_token),l(o.spotify_access_token)),t.$on("$reload",function(e,t){void 0===o.spotify_access_token?s():(c(o.spotify_access_token),l(o.spotify_access_token))})}function l(e,t,n,a,o){function i(e){n.get("././config.json?nocache="+(new Date).getTime()).then(function(n){r.settings=n.data,n.data.username&&n.data.password&&(r.settings.username=atob(n.data.username),r.settings.password=atob(n.data.password)),r.settings.news||(r.settings.news=[]),r.settings.colums||(r.settings.colums=[]),r.settings.blocks||(r.settings.blocks=[]),r.settings.tabs||(r.settings.tabs=[]),!0===e&&t.$broadcast("$render",n.data)})}var r=this;r.settings=o,r.load=t.load,r.username="",r.password="",r.isActive=!1,r.message=!1,r.saveSettings=function(){r.settings.username&&r.settings.password&&(r.settings.username=btoa(r.settings.username),r.settings.password=btoa(r.settings.password)),n.post("app/settings/settings.save.php",r.settings).then(function(e){"success"===e.data.status&&(r.message=!0,a(function(){r.message=!1},2e3),i(!0))})},r.editNews=function(e,t){if("add"===t)r.settings.news.push({location:""});else{var n=[];angular.forEach(r.settings.news,function(e){e.selected||n.push(e)}),r.settings.news=n}},r.editColums=function(e,t){if("add"===t)r.settings.colums.push({colum:"",class:""});else{var n=[];angular.forEach(r.settings.colums,function(e){e.selected||n.push(e)}),r.settings.colums=n}},r.editBlocks=function(e,t){if("add"===t)r.settings.blocks.push({type:"",class:"",colum:"colum"+r.settings.colums[0].colum,title:""});else{var n=[];angular.forEach(r.settings.blocks,function(e){e.selected||n.push(e)}),r.settings.blocks=n}},r.toggle=function(){r.isActive=!r.isActive},r.saveManualy=function(){r.toJSON="",r.toJSON=angular.toJson(r.settings);var e=new Blob([r.toJSON],{type:"application/json;charset=utf-8;"}),t=angular.element("<a></a>");t.attr("href",window.URL.createObjectURL(e)),t.attr("download","config.json"),t[0].click()},r.availableblocks=["Heading","Device","News","Weather","Traffic","Calendar","Spotify"],i()}function u(e,t,n,a){function o(){n.get(s.hosturl+"channels.php").then(function(e){var t=e.data.map(function(e){return e.id=parseInt(e.id),e});for(var n in s.sortedChannels)s.sortedChannels[n]=s.sortedChannels[n].map(function(e){return t.find(function(t){return t.id===e})}),s.sortedChannels[n]=s.sortedChannels[n].filter(function(e){return void 0!==e});s.channels=s.sortedChannels,i()})}function i(){var e=s.channels[s.selectedCategory][s.offset].id,t=s.channels[s.selectedCategory][s.offset+1].id;n.get(s.hosturl+"programs.php?channels="+e+","+t+"&day=0").then(function(e){s.programs=e.data,angular.forEach(s.programs,function(e,t){s.programs[t]=r(e)})})}function r(e){return(e=Object.keys(e).map(function(t){return e[t]})).filter(function(e){return new Date(e.datum_end).getTime()>Date.now()})}var s=this;s.hosturl="https://cors-anywhere.herokuapp.com/http://www.tvgids.nl/json/lists/",s.selectedCategory="mostviewed",s.offset=0,s.channels=[],s.programs={},s.sort=function(e){"prev"===e?s.offset-=2:"next"===e?s.offset+=2:s.offset=0,i()},s.sortedChannels={mostviewed:[1,2,3,4,31,36,46,37,34,92,91,471,472,438,29,18,24,435,5,6,440,460],sport:[19,436,466,148,99,419,420,421,417,418,468,469,470],movies:[411,39,107,304],entertainment:[93,462,94,407,431,432,433,430,408,409,317,437,66,104,464,315,404,467],music:[25,425,427,426,428,429],children:[89,21,424,311,312,313,461],knowledge:[416,415,413,306,406,305,414,439,81,70,38,473],news:[26,422,86,423],regional:[108,109,110,111,112,113,103,100,101,102,116,114,115,40],erotic:[401,434,105,400],other:[64,465,316,410,90,7,8,300,301,60,49,59,15,16,17,9,10,12,13,11,28,50,58,32]},o(),t.$on("$reload",function(e,t){})}function d(e,t,n,a,o,i,r){function s(){l.time=i("date")(new Date,"HH:mm:ss"),l.day=i("date")(new Date,"EEEE"),l.date=i("date")(new Date,"dd - MM - yyyy")}function c(e,t){o(function(){var n=new Skycons({color:"white"}),a="icon"+t;"chanceflurries"==e&&n.add(a,Skycons.WIND),"chancerain"==e&&n.add(a,Skycons.RAIN),"chancesleet"==e&&n.add(a,Skycons.SLEET),"chancesnow"==e&&n.add(a,Skycons.SNOW),"chancetstorms"==e&&n.add(a,Skycons.WIND),"clear"==e&&n.add(a,Skycons.CLEAR_DAY),"cloudy"==e&&n.add(a,Skycons.CLOUDY),"flurries"==e&&n.add(a,Skycons.WIND),"fog"==e&&n.add(a,Skycons.FOG),"hazy"==e&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"mostlycloudy"==e&&n.add(a,Skycons.CLOUDY),"mostlysunny"==e&&n.add(a,Skycons.CLEAR_DAY),"partlycloudy"==e&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"partlysunny"==e&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"sleet"==e&&n.add(a,Skycons.SLEET),"rain"==e&&n.add(a,Skycons.RAIN),"snow"==e&&n.add(a,Skycons.SNOW),"sunny"==e&&n.add(a,Skycons.CLEAR_DAY),"tstorms"==e&&n.add(a,Skycons.WIND),n.play()},0)}var l=this;l.time="",l.day="",l.date="",l.getIcon=c;a(function(){},r.weather_refresh),a(function(){s()},1e3)}n.$inject=["$scope","$rootScope","$timeout","CONFIG"],a.$inject=["$scope","$rootScope","$http","devicesService","$timeout","CONFIG","HOSTLOGIN"],o.$inject=["$rootScope","devicesService","CONFIG","HOSTLOGIN"],i.$inject=["$scope","$rootScope","$http","CONFIG"],r.$inject=["$scope","$rootScope","$http","CONFIG","$timeout"],s.$inject=["$scope","$rootScope","$http","CONFIG","$timeout","$filter"],c.$inject=["$scope","$rootScope","$http","$location","CONFIG","HOSTLOGIN"],l.$inject=["$scope","$rootScope","$http","$timeout","CONFIG"],u.$inject=["$scope","$rootScope","$http","CONFIG"],d.$inject=["$scope","$rootScope","$http","$interval","$timeout","$filter","CONFIG"];var f=angular.module("main",["ngAnimate","rzModule","angular-carousel"]);e().then(t),f.config(["$sceProvider","$locationProvider","$compileProvider","$animateProvider",function(e,t,n,a){a.classNameFilter(/angular-animate/),e.enabled(!1),n.aHrefSanitizationWhitelist(/^\s*(|blob|):/),t.html5Mode({enabled:!0,requireBase:!1})}]),angular.module("main").run(["$interval","$rootScope","devicesService","CONFIG","HOSTLOGIN",function(e,t,n,a,o){if(t.load=!1,void 0!=a&&void 0!=a.refresh)i=a.refresh;else var i=5e3;if(void 0!=a&&a.hostname){t.load=!0;e(function(){t.$broadcast("$reload")},i)}}]),angular.module("main").directive("bg",function(){return{scope:{},controller:"BackgroundController",controllerAs:"vm",templateUrl:"app/bg/bg.tpl.html"}}),angular.module("main").controller("BackgroundController",n).animation(".background__image",function(){return{leave:function(e,t){e[0].style.opacity=0,setTimeout(t,1500)}}}),angular.module("main").directive("device",function(){return{scope:{data:"=",id:"=",name:"@"},controller:"DevicesController",controllerAs:"vm",templateUrl:"app/devices/devices.tpl.html"}}),angular.module("main").controller("DevicesController",a),function(){"use strict";function e(e,t,n,a,o){function i(t,n){return e.get(s()+"/json.htm?"+o+"type=devices&filter=light&used=true&order=Name").then(function(e){return t=e.data.result,r(t,n)})}function r(e,t){return e.filter(function(e){return e.idx==t})}function s(){return l=-1!=a.hostname.indexOf(location.hostname)||"localhost"===window.location.hostname?a.hostname:a.internalhostname}var c={},l=a.hostname;return{get:function(e,t){return s(),c.length&&!1===t?r(c,e):i(c,e)}}}e.$inject=["$http","$filter","$timeout","CONFIG","HOSTLOGIN"],angular.module("main").service("devicesService",e)}(),angular.module("main").controller("GridController",o),angular.module("main").directive("grid",["$rootScope","$compile","$http","devicesService","CONFIG","HOSTLOGIN",function(e,t,n,a,o,i){return{scope:{},controller:"GridController",controllerAs:"vm",link:function(n,a){function i(){angular.forEach(c.colums,function(e){angular.element(document.getElementById("colums")).append('<div id="colum'+e.colum+'" class="colum '+e.class+'"></div>')}),t(a.contents())(n)}function r(){angular.forEach(c.blocks,function(e){s(e)}),t(a.contents())(n)}function s(e){switch(e.type){case"Heading":angular.element(document.getElementById(e.colum)).append('<div class="heading '+e.class+'">'+e.title+"</div>");break;case"Device":angular.element(document.getElementById(e.colum)).append('<block class="block dev '+e.class+'"><device class="device" name="'+e.title+'" id="'+e.idx+'"></device></block>');break;case"News":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><news></news></block>');break;case"Tabs":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><tabs id="tabs"></tabs></block>');break;case"Weather":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><weather></weather></block>');break;case"Traffic":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><traffic></traffic></block>');break;case"Spotify":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><spotify></spotify></block>');break;case"Calendar":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><calendar></calendar></block>');break;case"Tvguide":angular.element(document.getElementById(e.colum)).append('<block class="block '+e.class+'"><tvguide></tvguide></block>')}}var c=this;c.colums=o.colums,c.blocks=o.blocks,i(),r(),e.$on("$render",function(e,t){c.colums=t.colums,c.blocks=t.blocks,angular.element(document.querySelector("#colums")).empty(),i(),r()})}}}]),angular.module("main").controller("CalendarController",i),angular.module("main").directive("calendar",function(){return{scope:{},controller:"CalendarController",controllerAs:"vm",templateUrl:"app/calendar/calendar.tpl.html"}}),angular.module("main").directive("news",function(){return{scope:{},controller:"NewsController",controllerAs:"vm",templateUrl:"app/news/news.tpl.html"}}),angular.module("main").controller("NewsController",r),angular.module("main").controller("TrafficController",s),angular.module("main").directive("traffic",function(){return{scope:{},controller:"TrafficController",controllerAs:"vm",templateUrl:"app/traffic/traffic.tpl.html"}}),angular.module("main").controller("SpotifyController",c),angular.module("main").directive("spotify",function(){return{scope:{},controller:"SpotifyController",controllerAs:"vm",templateUrl:"app/spotify/spotify.tpl.html"}}),function(e){"use strict";function t(e,t,n,a){e.beginPath(),e.arc(t,n,a,0,g,!1),e.fill()}function n(e,t,n,a,o){e.beginPath(),e.moveTo(t,n),e.lineTo(a,o),e.stroke()}function a(e,n,a,o,i,r,s,c){var l=Math.cos(n*g);t(e,a-Math.sin(n*g)*i,o+l*r+.5*(c-=s),s+(1-.5*l)*c)}function o(e,t,n,o,i,r,s,c){var l;for(l=5;l--;)a(e,t+l/5,n,o,i,r,s,c)}function i(e,t,n,a,i,r,s){t/=3e4;var c=.21*i,l=.12*i,u=.24*i,d=.28*i;e.fillStyle=s,o(e,t,n,a,c,l,u,d),e.globalCompositeOperation="destination-out",o(e,t,n,a,c,l,u-r,d-r),e.globalCompositeOperation="source-over"}function r(e,t,a,o,i,r,s){t/=12e4;var c,l,u,d,f=.25*i-.5*r,m=.32*i+.5*r,h=.5*i-.5*r;for(e.strokeStyle=s,e.lineWidth=r,e.lineCap="round",e.lineJoin="round",e.beginPath(),e.arc(a,o,f,0,g,!1),e.stroke(),c=8;c--;)l=(t+c/8)*g,n(e,a+(u=Math.cos(l))*m,o+(d=Math.sin(l))*m,a+u*h,o+d*h)}function s(e,t,n,a,o,i,r){t/=15e3;var s=.29*o-.5*i,c=.05*o,l=Math.cos(t*g),u=l*g/-16;e.strokeStyle=r,e.lineWidth=i,e.lineCap="round",e.lineJoin="round",n+=l*c,e.beginPath(),e.arc(n,a,s,u+g/8,u+7*g/8,!1),e.arc(n+Math.cos(u)*s*v,a+Math.sin(u)*s*v,s,u+5*g/8,u+3*g/8,!0),e.closePath(),e.stroke()}function c(e,t,n,a,o,i,r){t/=1350;var s,c,l,u,d=.16*o,f=11*g/12,m=7*g/12;for(e.fillStyle=r,s=4;s--;)c=(t+s/4)%1,l=n+(s-1.5)/1.5*(1===s||2===s?-1:1)*d,u=a+c*c*o,e.beginPath(),e.moveTo(l,u-1.5*i),e.arc(l,u,.75*i,f,m,!1),e.fill()}function l(e,t,a,o,i,r,s){t/=750;var c,l,u,d,f=.1875*i;for(e.strokeStyle=s,e.lineWidth=.5*r,e.lineCap="round",e.lineJoin="round",c=4;c--;)l=(t+c/4)%1,n(e,u=Math.floor(a+(c-1.5)/1.5*(1===c||2===c?-1:1)*f)+.5,(d=o+l*i)-1.5*r,u,d+1.5*r)}function u(e,t,a,o,i,r,s){var c,l,u,d,f=.16*i,m=.75*r,h=(t/=3e3)*g*.7,p=Math.cos(h)*m,v=Math.sin(h)*m,y=h+g/3,k=Math.cos(y)*m,w=Math.sin(y)*m,b=h+2*g/3,C=Math.cos(b)*m,S=Math.sin(b)*m;for(e.strokeStyle=s,e.lineWidth=.5*r,e.lineCap="round",e.lineJoin="round",c=4;c--;)l=(t+c/4)%1,n(e,(u=a+Math.sin((l+c/4)*g)*f)-p,(d=o+l*i)-v,u+p,d+v),n(e,u-k,d-w,u+k,d+w),n(e,u-C,d-S,u+C,d+S)}function d(e,t,n,a,i,r,s){t/=3e4;var c=.21*i,l=.06*i,u=.21*i,d=.28*i;e.fillStyle=s,o(e,t,n,a,c,l,u,d),e.globalCompositeOperation="destination-out",o(e,t,n,a,c,l,u-r,d-r),e.globalCompositeOperation="source-over"}function f(e,t,n,a,o,i,r){var s=o/8,c=s/3,l=2*c,u=t%1*g,d=Math.cos(u),f=Math.sin(u);e.fillStyle=r,e.strokeStyle=r,e.lineWidth=i,e.lineCap="round",e.lineJoin="round",e.beginPath(),e.arc(n,a,s,u,u+Math.PI,!1),e.arc(n-c*d,a-c*f,l,u+Math.PI,u,!1),e.arc(n+l*d,a+l*f,c,u+Math.PI,u,!0),e.globalCompositeOperation="destination-out",e.fill(),e.globalCompositeOperation="source-over",e.stroke()}function m(e,t,n,a,o,i,r,s,c){t/=2500;var l,u,d,m,h=y[r],p=(t+r-k[r].start)%s,g=(t+r-k[r].end)%s,v=(t+r)%s;if(e.strokeStyle=c,e.lineWidth=i,e.lineCap="round",e.lineJoin="round",p<1){if(e.beginPath(),p*=h.length/2-1,l=Math.floor(p),p-=l,l*=2,l+=2,e.moveTo(n+(h[l-2]*(1-p)+h[l]*p)*o,a+(h[l-1]*(1-p)+h[l+1]*p)*o),g<1){for(g*=h.length/2-1,g-=u=Math.floor(g),u*=2,u+=2,m=l;m!==u;m+=2)e.lineTo(n+h[m]*o,a+h[m+1]*o);e.lineTo(n+(h[u-2]*(1-g)+h[u]*g)*o,a+(h[u-1]*(1-g)+h[u+1]*g)*o)}else for(m=l;m!==h.length;m+=2)e.lineTo(n+h[m]*o,a+h[m+1]*o);e.stroke()}else if(g<1){for(e.beginPath(),g*=h.length/2-1,g-=u=Math.floor(g),u*=2,u+=2,e.moveTo(n+h[0]*o,a+h[1]*o),m=2;m!==u;m+=2)e.lineTo(n+h[m]*o,a+h[m+1]*o);e.lineTo(n+(h[u-2]*(1-g)+h[u]*g)*o,a+(h[u-1]*(1-g)+h[u+1]*g)*o),e.stroke()}v<1&&(v*=h.length/2-1,v-=d=Math.floor(v),d*=2,f(e,t,n+(h[(d+=2)-2]*(1-v)+h[d]*v)*o,a+(h[d-1]*(1-v)+h[d+1]*v)*o,o,i,c))}var h,p;!function(){var t=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame,n=e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.mozCancelAnimationFrame||e.oCancelAnimationFrame||e.msCancelAnimationFrame;t&&n?(h=function(e){function n(){a.value=t(n),e()}var a={value:null};return n(),a},p=function(e){n(e.value)}):(h=setInterval,p=clearInterval)}();var g=2*Math.PI,v=2/Math.sqrt(2),y=[[-.75,-.18,-.7219,-.1527,-.6971,-.1225,-.6739,-.091,-.6516,-.0588,-.6298,-.0262,-.6083,.0065,-.5868,.0396,-.5643,.0731,-.5372,.1041,-.5033,.1259,-.4662,.1406,-.4275,.1493,-.3881,.153,-.3487,.1526,-.3095,.1488,-.2708,.1421,-.2319,.1342,-.1943,.1217,-.16,.1025,-.129,.0785,-.1012,.0509,-.0764,.0206,-.0547,-.012,-.0378,-.0472,-.0324,-.0857,-.0389,-.1241,-.0546,-.1599,-.0814,-.1876,-.1193,-.1964,-.1582,-.1935,-.1931,-.1769,-.2157,-.1453,-.229,-.1085,-.2327,-.0697,-.224,-.0317,-.2064,.0033,-.1853,.0362,-.1613,.0672,-.135,.0961,-.1051,.1213,-.0706,.1397,-.0332,.1512,.0053,.158,.0442,.1624,.0833,.1636,.1224,.1615,.1613,.1565,.1999,.15,.2378,.1402,.2749,.1279,.3118,.1147,.3487,.1015,.3858,.0892,.4236,.0787,.4621,.0715,.5012,.0702,.5398,.0766,.5768,.089,.6123,.1055,.6466,.1244,.6805,.144,.7147,.163,.75,.18],[-.75,0,-.7033,.0195,-.6569,.0399,-.6104,.06,-.5634,.0789,-.5155,.0954,-.4667,.1089,-.4174,.1206,-.3676,.1299,-.3174,.1365,-.2669,.1398,-.2162,.1391,-.1658,.1347,-.1157,.1271,-.0661,.1169,-.017,.1046,.0316,.0903,.0791,.0728,.1259,.0534,.1723,.0331,.2188,.0129,.2656,-.0064,.3122,-.0263,.3586,-.0466,.4052,-.0665,.4525,-.0847,.5007,-.1002,.5497,-.113,.5991,-.124,.6491,-.1325,.6994,-.138,.75,-.14]],k=[{start:.36,end:.11},{start:.56,end:.16}],w=function(e){this.list=[],this.interval=null,this.color=e&&e.color?e.color:"black",this.resizeClear=!(!e||!e.resizeClear)};w.CLEAR_DAY=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,i=Math.min(a,o);r(e,t,.5*a,.5*o,i,.08*i,n)},w.CLEAR_NIGHT=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,i=Math.min(a,o);s(e,t,.5*a,.5*o,i,.08*i,n)},w.PARTLY_CLOUDY_DAY=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,s=Math.min(a,o);r(e,t,.625*a,.375*o,.75*s,.08*s,n),i(e,t,.375*a,.625*o,.75*s,.08*s,n)},w.PARTLY_CLOUDY_NIGHT=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,r=Math.min(a,o);s(e,t,.667*a,.375*o,.75*r,.08*r,n),i(e,t,.375*a,.625*o,.75*r,.08*r,n)},w.CLOUDY=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,r=Math.min(a,o);i(e,t,.5*a,.5*o,r,.08*r,n)},w.RAIN=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,r=Math.min(a,o);c(e,t,.5*a,.37*o,.9*r,.08*r,n),i(e,t,.5*a,.37*o,.9*r,.08*r,n)},w.SLEET=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,r=Math.min(a,o);l(e,t,.5*a,.37*o,.9*r,.08*r,n),i(e,t,.5*a,.37*o,.9*r,.08*r,n)},w.SNOW=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,r=Math.min(a,o);u(e,t,.5*a,.37*o,.9*r,.08*r,n),i(e,t,.5*a,.37*o,.9*r,.08*r,n)},w.WIND=function(e,t,n){var a=e.canvas.width,o=e.canvas.height,i=Math.min(a,o);m(e,t,.5*a,.5*o,i,.08*i,0,2,n),m(e,t,.5*a,.5*o,i,.08*i,1,2,n)},w.FOG=function(e,t,a){var o=e.canvas.width,i=e.canvas.height,r=Math.min(o,i),s=.08*r;d(e,t,.5*o,.32*i,.75*r,s,a),t/=5e3;var c=Math.cos(t*g)*r*.02,l=Math.cos((t+.25)*g)*r*.02,u=Math.cos((t+.5)*g)*r*.02,f=Math.cos((t+.75)*g)*r*.02,m=.936*i,h=Math.floor(m-.5*s)+.5,p=Math.floor(m-2.5*s)+.5;e.strokeStyle=a,e.lineWidth=s,e.lineCap="round",e.lineJoin="round",n(e,c+.2*o+.5*s,h,l+.8*o-.5*s,h),n(e,u+.2*o+.5*s,p,f+.8*o-.5*s,p)},w.prototype={_determineDrawingFunction:function(e){return"string"==typeof e&&(e=w[e.toUpperCase().replace(/-/g,"_")]||null),e},add:function(e,t){var n;"string"==typeof e&&(e=document.getElementById(e)),null!==e&&"function"==typeof(t=this._determineDrawingFunction(t))&&(n={element:e,context:e.getContext("2d"),drawing:t},this.list.push(n),this.draw(n,500))},set:function(e,t){var n;for("string"==typeof e&&(e=document.getElementById(e)),n=this.list.length;n--;)if(this.list[n].element===e)return this.list[n].drawing=this._determineDrawingFunction(t),void this.draw(this.list[n],500);this.add(e,t)},remove:function(e){var t;for("string"==typeof e&&(e=document.getElementById(e)),t=this.list.length;t--;)if(this.list[t].element===e)return void this.list.splice(t,1)},draw:function(e,t){var n=e.context.canvas;this.resizeClear?n.width=n.width:e.context.clearRect(0,0,n.width,n.height),e.drawing(e.context,t,this.color)},play:function(){var e=this;this.pause(),this.interval=h(function(){var t,n=Date.now();for(t=e.list.length;t--;)e.draw(e.list[t],n)},1e3/60)},pause:function(){this.interval&&(p(this.interval),this.interval=null)}},e.Skycons=w}(this),angular.module("main").directive("tooltip",[function(e){return{link:function(e,t,n){t.addClass("tooltip-wrap").append(angular.element('<div class="tooltip-text">'+n.title+"</div>")).removeAttr("title"),t.bind("click",function(){-1!==t[0].className.indexOf("active")?t.removeClass("active"):t.addClass("active")})}}}]),angular.module("main").filter("removeHTMLTags",function(){return function(e){return e?String(e).replace(/<[^>]+>/gm,""):""}}),angular.module("main").controller("SettingsController",l),angular.module("main").directive("settings",function(){return{scope:{},controller:"SettingsController",controllerAs:"vm",templateUrl:"app/settings/settings.tpl.html"}}),angular.module("main").controller("TvguideController",u),angular.module("main").directive("tvguide",function(){return{scope:{},controller:"TvguideController",controllerAs:"vm",templateUrl:"app/tvguide/tvguide.tpl.html"}}),angular.module("main").controller("WeatherController",d),angular.module("main").directive("weather",function(){return{scope:{},controller:"WeatherController",controllerAs:"vm",templateUrl:"app/weather/weather.tpl.html"}});