function t(){return angular.injector(["ng"]).get("$http").get("../config.json").then(function(t){u.constant("CONFIG",t.data),u.constant("HOSTLOGIN","username="+t.data.username+"&password="+t.data.password+"&")},function(t){u.constant("CONFIG",void 0)})}function e(){angular.element(document).ready(function(){angular.bootstrap(document,["main"])})}function n(t,e,n,a,o){function i(t,e){n.get(e.location).then(function(e){var n=(new X2JS).xml_str2json(e.data);s.newstitle[t]=n.rss.channel.title,s.news[t]=r(n.rss.channel.item),o(function(){s.changed=!1},1e3)})}function r(t){for(var e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),a=t[e];t[e]=t[n],t[n]=a}return t}var s=this;s.news=[],s.newstitle=[],s.newslimit=1,s.newssources=a.news,s.changed=!0,s.getNews=i,e.$on("$reload",function(t,e){s.changed=!0,angular.forEach(a.news,function(t,e){i(e,t)})})}function a(t,e,n,a){}function o(t,e,n,a,o,i){function r(){for(var t,e={},n=/([^&;=]+)=?([^&;]*)/g,a=window.location.hash.substring(1);t=n.exec(a);)e[t[1]]=decodeURIComponent(t[2]);return e}function s(){var t=encodeURIComponent("http://"+window.location.host+"//#");a.hash()?(l.settings.spotify_access_token=r().access_token,n.post("app/settings/settings.save.php",l.settings)):window.location="https://accounts.spotify.com/authorize/?client_id="+o.spotify_clientid+"&redirect_uri="+t+"&scope=playlist-read-private%20user-read-private%20user-read-email&response_type=token"}function c(t){n.get("https://api.spotify.com/v1/users/dycati/playlists",{headers:{Authorization:"Bearer "+t}}).then(function(t){console.log(t.data)})}var l=this;l.switches=[],l.settings=o,void 0===o.spotify_access_token?s():c(o.spotify_access_token)}function i(t,e,n,a,o){function i(){n.get(a.hostname+"/json.htm?"+o+"type=devices&filter=light&used=true&order=Name").then(function(t){s.switches=t.data.result})}function r(t,e){n.get(a.hostname+"/json.htm?"+o+"type=command&param=switchlight&idx="+t+"&switchcmd=Set%20Level&level="+e).then(function(){i()})}var s=this;s.switches=[],s.switchDevice=function(t){if("Off"===t.Data)e="On";else var e="Off";n.get(a.hostname+"/json.htm?"+o+"type=command&param=switchlight&idx="+t.idx+"&switchcmd="+e).then(function(){i()})},s.dimDevice=r,s.getIcon=function(t){if("Dimmer"===t.SwitchType||"Media Player"===t.SwitchType||"On/Off"===t.SwitchType||"Selector"===t.SwitchType)switch(t.Image){case"Light":return"fa-lightbulb-o";case"Alarm":return"fa-bell";case"Amplifier":return"fa-bullhorn";case"ChristmasTree":return"fa-tree";case"Computer":return"fa-laptop";case"ComputerPC":return"fa-desktop";case"Cooling":return"fa-snowflake-o";case"Fan":return"fa-refresh";case"Fireplace":return"fa-fire";case"Generic":return"fa-power-off";case"Harddisk":return"fa-hdd-o";case"Heating":return"fa-thermometer-full";case"Media":return"fa-youtube-play";case"Phone":return"fa-mobile";case"Printer":return"fa-print";case"Speaker":return"fa-volume-up";case"TV":return"fa-television";case"WallSocket":return"fa-plug";case"Water":return"fa-tint"}else switch(t.SwitchType){case"Blinds":case"Blinds Inverted":case"Blinds Percentage":case"Blinds Percentage Inverted":return"fa-bars";case"Contact":return"fa-exchange";case"Door Lock":return"fa-lock";case"Doorbell":return"fa-bell-o";case"Dusk Sensor":return"fa-sun-o";case"Motion Sensor":return"fa-assistive-listening-systems";case"Push Off Button":return"fa-toggle-off";case"Push On Button":return"fa-toggle-on";case"Smoke Detector":return"fa-cloud";case"Venetian Blinds EU":case"Venetian Blinds US":return"fa-bars";case"X10 Siren":return"fa-bullhorn"}},i(),t.$on("slideEnded",function(t,e){var n=t.targetScope.rzSliderModel;r(t.targetScope.$parent.switch.idx,n)}),e.$on("$reload",function(t,e){i()})}function r(t,e,n){function a(){n.get("../../config.json").then(function(t){o.settings=t.data,o.settings.username=atob(t.data.username),o.settings.password=atob(t.data.password),o.settings.news||(o.settings.news=[]),o.settings.colums||(o.settings.colums=[]),o.settings.blocks||(o.settings.blocks=[]),o.settings.tabs||(o.settings.tabs=[])})}var o=this;o.settings={},o.load=e.load,o.username="",o.password="",o.isActive=!1,o.saveSettings=function(){o.settings.username=btoa(o.settings.username),o.settings.password=btoa(o.settings.password),n.post("app/settings/settings.save.php",o.settings).then(function(t){a()})},o.editNews=function(t,e){if("add"===e)o.settings.news.push({location:""});else{var n=[];angular.forEach(o.settings.news,function(t){t.selected||n.push(t)}),o.settings.news=n}},o.editColums=function(t,e){if("add"===e)o.settings.colums.push({colum:"",class:""});else{var n=[];angular.forEach(o.settings.colums,function(t){t.selected||n.push(t)}),o.settings.colums=n}},o.editBlocks=function(t,e){if("add"===e)o.settings.blocks.push({type:"",class:"",colum:"",title:""});else{var n=[];angular.forEach(o.settings.blocks,function(t){t.selected||n.push(t)}),o.settings.blocks=n}},o.editTabs=function(t,e){if("add"===e)o.settings.tabs.push({tab:"",type:"",class:"",title:""});else{var n=[];angular.forEach(o.settings.tabs,function(t){t.selected||n.push(t)}),o.settings.tabs=n}},o.toggle=function(){o.isActive=!o.isActive},a()}function s(t,e,n,a,o,i){function r(){n.get(s.url).then(function(t){s.traffic=t.data.roadEntries,s.newtrafficlist={},angular.forEach(s.traffic,function(t){s.newtrafficlist=t,angular.forEach(t.events,function(t,e){0!=t.length&&"roadWorks"==e?angular.merge(s.newtrafficlist,{roadwork:t}):0!=t.length&&"trafficJams"==e&&angular.merge(s.newtrafficlist,{trafficjam:t})})})})}var s=this;s.traffic=[],s.newtrafficlist=[],s.url=a.traffic_url,s.activestate="trafficjam",r(),e.$on("$reload",function(t,e){r()})}function c(t,e,n,a,o,i){var r=this;r.tabs=i.tabs,r.activetab=0,r.setTab=function(t){r.activetab=t},r.isSet=function(t){return r.activetab===t}}function l(t,e,n,a,o,i,r){function s(){n.get("Almere-Haven.json").then(function(t){d.weather=t.data.current_observation,d.location=d.weather.display_location.city,u(d.weather.icon,"")})}function c(){n.get("Almere-Haven2.json").then(function(t){d.forecast=t.data.forecast.simpleforecast.forecastday})}function l(){d.time=i("date")(new Date,"HH:mm:ss"),d.day=i("date")(new Date,"EEEE"),d.date=i("date")(new Date,"dd - MM - yyyy")}function u(t,e){o(function(){var n=new Skycons({color:"white"}),a="icon"+e;"chanceflurries"==t&&n.add(a,Skycons.WIND),"chancerain"==t&&n.add(a,Skycons.RAIN),"chancesleet"==t&&n.add(a,Skycons.SLEET),"chancesnow"==t&&n.add(a,Skycons.SNOW),"chancetstorms"==t&&n.add(a,Skycons.WIND),"clear"==t&&n.add(a,Skycons.CLEAR_DAY),"cloudy"==t&&n.add(a,Skycons.CLOUDY),"flurries"==t&&n.add(a,Skycons.WIND),"fog"==t&&n.add(a,Skycons.FOG),"hazy"==t&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"mostlycloudy"==t&&n.add(a,Skycons.CLOUDY),"mostlysunny"==t&&n.add(a,Skycons.CLEAR_DAY),"partlycloudy"==t&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"partlysunny"==t&&n.add(a,Skycons.PARTLY_CLOUDY_DAY),"sleet"==t&&n.add(a,Skycons.SLEET),"rain"==t&&n.add(a,Skycons.RAIN),"snow"==t&&n.add(a,Skycons.SNOW),"sunny"==t&&n.add(a,Skycons.CLEAR_DAY),"tstorms"==t&&n.add(a,Skycons.WIND),n.play()},0)}var d=this;d.time="",d.day="",d.date="",d.active=(l(),s(),void c()),d.getIcon=u;a(function(){s(),c()},r.weather_refresh),a(function(){l()},1e3)}n.$inject=["$scope","$rootScope","$http","CONFIG","$timeout"],a.$inject=["$scope","$rootScope","$http","ngAudio"],o.$inject=["$scope","$rootScope","$http","$location","CONFIG","HOSTLOGIN"],i.$inject=["$scope","$rootScope","$http","CONFIG","HOSTLOGIN"],r.$inject=["$scope","$rootScope","$http"],s.$inject=["$scope","$rootScope","$http","CONFIG","$timeout","$filter"],c.$inject=["$scope","$element","$rootScope","$http","$compile","CONFIG"],l.$inject=["$scope","$rootScope","$http","$interval","$timeout","$filter","CONFIG"];var u=angular.module("main",["rzModule","ngAudio"]);t().then(e),u.config(["$locationProvider",function(t){t.html5Mode({enabled:!0,requireBase:!1})}]),angular.module("main").filter("removeHTMLTags",function(){return function(t){return t?String(t).replace(/<[^>]+>/gm,""):""}}),angular.module("main").run(["$interval","$rootScope","CONFIG","HOSTLOGIN",function(t,e,n,a){if(void 0===n){e.load=!1;var o=5e3,i=1;e.background=1}else{e.load=!0;var o=n.refresh,i=n.bgimages;e.background=n.bgimages}t(function(){e.background=Math.floor(Math.random()*i)+1,e.$broadcast("$reload")},o)}]),angular.module("main").directive("grid",["$compile","CONFIG",function(t,e){return{scope:{},link:function(n,a){function o(t){switch(t.type){case"Heading":angular.element(document.getElementById(t.colum)).append('<div class="heading '+t.class+'">'+t.title+"</div>");break;case"Switches":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><switches></switches></block>');break;case"News":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><news></news></block>');break;case"Tabs":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><tabs id="tabs"></tabs></block>');break;case"Weather":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><weather></weather></block>');break;case"Traffic":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><traffic></traffic></block>');break;case"Spotify":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><spotify></spotify></block>');break;case"Radio":angular.element(document.getElementById(t.colum)).append('<block class="block '+t.class+'"><radio</radio></block>')}}var i=this;i.colums=e.colums,i.blocks=e.blocks,angular.forEach(i.colums,function(t){angular.element(document.getElementById("colums")).append('<div id="colum'+t.colum+'" class="colum '+t.class+'"></div>')}),t(a.contents())(n),angular.forEach(i.blocks,function(t){o(t)}),t(a.contents())(n)}}}]),angular.module("main").controller("NewsController",n),angular.module("main").directive("news",function(){return{scope:{},controller:"NewsController",controllerAs:"vm",templateUrl:"app/news/news.tpl.html"}}),function(t){"use strict";function e(t,e,n,a){t.beginPath(),t.arc(e,n,a,0,g,!1),t.fill()}function n(t,e,n,a,o){t.beginPath(),t.moveTo(e,n),t.lineTo(a,o),t.stroke()}function a(t,n,a,o,i,r,s,c){var l=Math.cos(n*g);e(t,a-Math.sin(n*g)*i,o+l*r+.5*(c-=s),s+(1-.5*l)*c)}function o(t,e,n,o,i,r,s,c){var l;for(l=5;l--;)a(t,e+l/5,n,o,i,r,s,c)}function i(t,e,n,a,i,r,s){e/=3e4;var c=.21*i,l=.12*i,u=.24*i,d=.28*i;t.fillStyle=s,o(t,e,n,a,c,l,u,d),t.globalCompositeOperation="destination-out",o(t,e,n,a,c,l,u-r,d-r),t.globalCompositeOperation="source-over"}function r(t,e,a,o,i,r,s){e/=12e4;var c,l,u,d,f=.25*i-.5*r,h=.32*i+.5*r,m=.5*i-.5*r;for(t.strokeStyle=s,t.lineWidth=r,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(a,o,f,0,g,!1),t.stroke(),c=8;c--;)l=(e+c/8)*g,n(t,a+(u=Math.cos(l))*h,o+(d=Math.sin(l))*h,a+u*m,o+d*m)}function s(t,e,n,a,o,i,r){e/=15e3;var s=.29*o-.5*i,c=.05*o,l=Math.cos(e*g),u=l*g/-16;t.strokeStyle=r,t.lineWidth=i,t.lineCap="round",t.lineJoin="round",n+=l*c,t.beginPath(),t.arc(n,a,s,u+g/8,u+7*g/8,!1),t.arc(n+Math.cos(u)*s*v,a+Math.sin(u)*s*v,s,u+5*g/8,u+3*g/8,!0),t.closePath(),t.stroke()}function c(t,e,n,a,o,i,r){e/=1350;var s,c,l,u,d=.16*o,f=11*g/12,h=7*g/12;for(t.fillStyle=r,s=4;s--;)c=(e+s/4)%1,l=n+(s-1.5)/1.5*(1===s||2===s?-1:1)*d,u=a+c*c*o,t.beginPath(),t.moveTo(l,u-1.5*i),t.arc(l,u,.75*i,f,h,!1),t.fill()}function l(t,e,a,o,i,r,s){e/=750;var c,l,u,d,f=.1875*i;for(t.strokeStyle=s,t.lineWidth=.5*r,t.lineCap="round",t.lineJoin="round",c=4;c--;)l=(e+c/4)%1,n(t,u=Math.floor(a+(c-1.5)/1.5*(1===c||2===c?-1:1)*f)+.5,(d=o+l*i)-1.5*r,u,d+1.5*r)}function u(t,e,a,o,i,r,s){var c,l,u,d,f=.16*i,h=.75*r,m=(e/=3e3)*g*.7,p=Math.cos(m)*h,v=Math.sin(m)*h,w=m+g/3,y=Math.cos(w)*h,b=Math.sin(w)*h,k=m+2*g/3,S=Math.cos(k)*h,C=Math.sin(k)*h;for(t.strokeStyle=s,t.lineWidth=.5*r,t.lineCap="round",t.lineJoin="round",c=4;c--;)l=(e+c/4)%1,n(t,(u=a+Math.sin((l+c/4)*g)*f)-p,(d=o+l*i)-v,u+p,d+v),n(t,u-y,d-b,u+y,d+b),n(t,u-S,d-C,u+S,d+C)}function d(t,e,n,a,i,r,s){e/=3e4;var c=.21*i,l=.06*i,u=.21*i,d=.28*i;t.fillStyle=s,o(t,e,n,a,c,l,u,d),t.globalCompositeOperation="destination-out",o(t,e,n,a,c,l,u-r,d-r),t.globalCompositeOperation="source-over"}function f(t,e,n,a,o,i,r){var s=o/8,c=s/3,l=2*c,u=e%1*g,d=Math.cos(u),f=Math.sin(u);t.fillStyle=r,t.strokeStyle=r,t.lineWidth=i,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.arc(n,a,s,u,u+Math.PI,!1),t.arc(n-c*d,a-c*f,l,u+Math.PI,u,!1),t.arc(n+l*d,a+l*f,c,u+Math.PI,u,!0),t.globalCompositeOperation="destination-out",t.fill(),t.globalCompositeOperation="source-over",t.stroke()}function h(t,e,n,a,o,i,r,s,c){e/=2500;var l,u,d,h,m=w[r],p=(e+r-y[r].start)%s,g=(e+r-y[r].end)%s,v=(e+r)%s;if(t.strokeStyle=c,t.lineWidth=i,t.lineCap="round",t.lineJoin="round",p<1){if(t.beginPath(),p*=m.length/2-1,l=Math.floor(p),p-=l,l*=2,l+=2,t.moveTo(n+(m[l-2]*(1-p)+m[l]*p)*o,a+(m[l-1]*(1-p)+m[l+1]*p)*o),g<1){for(g*=m.length/2-1,g-=u=Math.floor(g),u*=2,u+=2,h=l;h!==u;h+=2)t.lineTo(n+m[h]*o,a+m[h+1]*o);t.lineTo(n+(m[u-2]*(1-g)+m[u]*g)*o,a+(m[u-1]*(1-g)+m[u+1]*g)*o)}else for(h=l;h!==m.length;h+=2)t.lineTo(n+m[h]*o,a+m[h+1]*o);t.stroke()}else if(g<1){for(t.beginPath(),g*=m.length/2-1,g-=u=Math.floor(g),u*=2,u+=2,t.moveTo(n+m[0]*o,a+m[1]*o),h=2;h!==u;h+=2)t.lineTo(n+m[h]*o,a+m[h+1]*o);t.lineTo(n+(m[u-2]*(1-g)+m[u]*g)*o,a+(m[u-1]*(1-g)+m[u+1]*g)*o),t.stroke()}v<1&&(v*=m.length/2-1,v-=d=Math.floor(v),d*=2,f(t,e,n+(m[(d+=2)-2]*(1-v)+m[d]*v)*o,a+(m[d-1]*(1-v)+m[d+1]*v)*o,o,i,c))}var m,p;!function(){var e=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame,n=t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||t.msCancelAnimationFrame;e&&n?(m=function(t){function n(){a.value=e(n),t()}var a={value:null};return n(),a},p=function(t){n(t.value)}):(m=setInterval,p=clearInterval)}();var g=2*Math.PI,v=2/Math.sqrt(2),w=[[-.75,-.18,-.7219,-.1527,-.6971,-.1225,-.6739,-.091,-.6516,-.0588,-.6298,-.0262,-.6083,.0065,-.5868,.0396,-.5643,.0731,-.5372,.1041,-.5033,.1259,-.4662,.1406,-.4275,.1493,-.3881,.153,-.3487,.1526,-.3095,.1488,-.2708,.1421,-.2319,.1342,-.1943,.1217,-.16,.1025,-.129,.0785,-.1012,.0509,-.0764,.0206,-.0547,-.012,-.0378,-.0472,-.0324,-.0857,-.0389,-.1241,-.0546,-.1599,-.0814,-.1876,-.1193,-.1964,-.1582,-.1935,-.1931,-.1769,-.2157,-.1453,-.229,-.1085,-.2327,-.0697,-.224,-.0317,-.2064,.0033,-.1853,.0362,-.1613,.0672,-.135,.0961,-.1051,.1213,-.0706,.1397,-.0332,.1512,.0053,.158,.0442,.1624,.0833,.1636,.1224,.1615,.1613,.1565,.1999,.15,.2378,.1402,.2749,.1279,.3118,.1147,.3487,.1015,.3858,.0892,.4236,.0787,.4621,.0715,.5012,.0702,.5398,.0766,.5768,.089,.6123,.1055,.6466,.1244,.6805,.144,.7147,.163,.75,.18],[-.75,0,-.7033,.0195,-.6569,.0399,-.6104,.06,-.5634,.0789,-.5155,.0954,-.4667,.1089,-.4174,.1206,-.3676,.1299,-.3174,.1365,-.2669,.1398,-.2162,.1391,-.1658,.1347,-.1157,.1271,-.0661,.1169,-.017,.1046,.0316,.0903,.0791,.0728,.1259,.0534,.1723,.0331,.2188,.0129,.2656,-.0064,.3122,-.0263,.3586,-.0466,.4052,-.0665,.4525,-.0847,.5007,-.1002,.5497,-.113,.5991,-.124,.6491,-.1325,.6994,-.138,.75,-.14]],y=[{start:.36,end:.11},{start:.56,end:.16}],b=function(t){this.list=[],this.interval=null,this.color=t&&t.color?t.color:"black",this.resizeClear=!(!t||!t.resizeClear)};b.CLEAR_DAY=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,i=Math.min(a,o);r(t,e,.5*a,.5*o,i,.08*i,n)},b.CLEAR_NIGHT=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,i=Math.min(a,o);s(t,e,.5*a,.5*o,i,.08*i,n)},b.PARTLY_CLOUDY_DAY=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,s=Math.min(a,o);r(t,e,.625*a,.375*o,.75*s,.08*s,n),i(t,e,.375*a,.625*o,.75*s,.08*s,n)},b.PARTLY_CLOUDY_NIGHT=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,r=Math.min(a,o);s(t,e,.667*a,.375*o,.75*r,.08*r,n),i(t,e,.375*a,.625*o,.75*r,.08*r,n)},b.CLOUDY=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,r=Math.min(a,o);i(t,e,.5*a,.5*o,r,.08*r,n)},b.RAIN=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,r=Math.min(a,o);c(t,e,.5*a,.37*o,.9*r,.08*r,n),i(t,e,.5*a,.37*o,.9*r,.08*r,n)},b.SLEET=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,r=Math.min(a,o);l(t,e,.5*a,.37*o,.9*r,.08*r,n),i(t,e,.5*a,.37*o,.9*r,.08*r,n)},b.SNOW=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,r=Math.min(a,o);u(t,e,.5*a,.37*o,.9*r,.08*r,n),i(t,e,.5*a,.37*o,.9*r,.08*r,n)},b.WIND=function(t,e,n){var a=t.canvas.width,o=t.canvas.height,i=Math.min(a,o);h(t,e,.5*a,.5*o,i,.08*i,0,2,n),h(t,e,.5*a,.5*o,i,.08*i,1,2,n)},b.FOG=function(t,e,a){var o=t.canvas.width,i=t.canvas.height,r=Math.min(o,i),s=.08*r;d(t,e,.5*o,.32*i,.75*r,s,a),e/=5e3;var c=Math.cos(e*g)*r*.02,l=Math.cos((e+.25)*g)*r*.02,u=Math.cos((e+.5)*g)*r*.02,f=Math.cos((e+.75)*g)*r*.02,h=.936*i,m=Math.floor(h-.5*s)+.5,p=Math.floor(h-2.5*s)+.5;t.strokeStyle=a,t.lineWidth=s,t.lineCap="round",t.lineJoin="round",n(t,c+.2*o+.5*s,m,l+.8*o-.5*s,m),n(t,u+.2*o+.5*s,p,f+.8*o-.5*s,p)},b.prototype={_determineDrawingFunction:function(t){return"string"==typeof t&&(t=b[t.toUpperCase().replace(/-/g,"_")]||null),t},add:function(t,e){var n;"string"==typeof t&&(t=document.getElementById(t)),null!==t&&"function"==typeof(e=this._determineDrawingFunction(e))&&(n={element:t,context:t.getContext("2d"),drawing:e},this.list.push(n),this.draw(n,500))},set:function(t,e){var n;for("string"==typeof t&&(t=document.getElementById(t)),n=this.list.length;n--;)if(this.list[n].element===t)return this.list[n].drawing=this._determineDrawingFunction(e),void this.draw(this.list[n],500);this.add(t,e)},remove:function(t){var e;for("string"==typeof t&&(t=document.getElementById(t)),e=this.list.length;e--;)if(this.list[e].element===t)return void this.list.splice(e,1)},draw:function(t,e){var n=t.context.canvas;this.resizeClear?n.width=n.width:t.context.clearRect(0,0,n.width,n.height),t.drawing(t.context,e,this.color)},play:function(){var t=this;this.pause(),this.interval=m(function(){var e,n=Date.now();for(e=t.list.length;e--;)t.draw(t.list[e],n)},1e3/60)},pause:function(){this.interval&&(p(this.interval),this.interval=null)}},t.Skycons=b}(this),angular.module("main").controller("RadioController",a),angular.module("main").directive("radio",function(){return{scope:{},controller:"RadioController",controllerAs:"vm",templateUrl:"app/radio/radio.tpl.html"}}),angular.module("main").controller("SpotifyController",o),angular.module("main").directive("spotify",function(){return{scope:{},controller:"SpotifyController",controllerAs:"vm",templateUrl:"app/spotify/spotify.tpl.html"}}),angular.module("main").controller("SwitchesController",i),angular.module("main").directive("switches",function(){return{scope:{},controller:"SwitchesController",controllerAs:"vm",templateUrl:"app/switches/switches.tpl.html"}}),angular.module("main").controller("SettingsController",r),angular.module("main").directive("settings",function(){return{scope:{},controller:"SettingsController",controllerAs:"vm",templateUrl:"app/settings/settings.tpl.html"}}),angular.module("main").controller("TrafficController",s),angular.module("main").directive("traffic",function(){return{scope:{},controller:"TrafficController",controllerAs:"vm",templateUrl:"app/traffic/traffic.tpl.html"}}),angular.module("main").controller("TabsController",c),angular.module("main").directive("tabs",function(){return{scope:{},controller:"TabsController",controllerAs:"vm",templateUrl:"app/tabs/tabs.tpl.html"}}),angular.module("main").controller("WeatherController",l),angular.module("main").directive("weather",function(){return{scope:{},controller:"WeatherController",controllerAs:"vm",templateUrl:"app/weather/weather.tpl.html"}});