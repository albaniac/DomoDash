function WeatherController($scope, $rootScope, $http, $interval, $timeout, $filter, CONFIG) {

    var vm                = this;

    vm.time               = '';
    vm.day                = '';
    vm.date               = '';

    //vm.active             = activate();
    vm.getIcon            = getIcon;


    ///////////////////////////////

    function activate(){
        getDate();
        getWeather();
        getForecast();
    }

    //// Public interface

    function getWeather(){
        $http.get('https://api.wunderground.com/api/' + CONFIG.weather_wunderground_api + '/conditions/q/' + CONFIG.weather_country + '/' + CONFIG.weather_location + '.json').then(function(res) {
            vm.weather = res.data.current_observation;
            vm.location = vm.weather.display_location.city;

            getIcon(vm.weather.icon, '');
        });
    }

    function getForecast(){
        $http.get('https://api.wunderground.com/api/' + CONFIG.weather_wunderground_api + '/forecast10day/q/' + CONFIG.weather_country + '/' + CONFIG.weather_location + '.json').then(function(res) {
            vm.forecast = res.data.forecast.simpleforecast.forecastday;
        });
    }

    function getDate(){
        vm.time = $filter('date')(new Date(),'HH:mm:ss');
        vm.day  = $filter('date')(new Date(),'EEEE');
        vm.date = $filter('date')(new Date(),'dd - MM - yyyy');
    }

    function getIcon(code, key){
        $timeout(function() {
            var skycons = new Skycons({"color": "white"});
            var icon = 'icon' + key;

            if(code=='chanceflurries') 	  skycons.add(icon, Skycons.WIND);
            if(code=='chancerain') 		    skycons.add(icon, Skycons.RAIN);
            if(code=='chancesleet') 	    skycons.add(icon, Skycons.SLEET);
            if(code=='chancesnow') 		    skycons.add(icon, Skycons.SNOW);
            if(code=='chancetstorms') 	  skycons.add(icon, Skycons.WIND);
            if(code=='clear') 			      skycons.add(icon, Skycons.CLEAR_DAY);
            if(code=='cloudy') 			      skycons.add(icon, Skycons.CLOUDY);
            if(code=='flurries') 		      skycons.add(icon, Skycons.WIND);
            if(code=='fog') 			        skycons.add(icon, Skycons.FOG);
            if(code=='hazy') 			        skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
            if(code=='mostlycloudy') 	    skycons.add(icon, Skycons.CLOUDY);
            if(code=='mostlysunny') 	    skycons.add(icon, Skycons.CLEAR_DAY);
            if(code=='partlycloudy') 	    skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
            if(code=='partlysunny') 	    skycons.add(icon, Skycons.PARTLY_CLOUDY_DAY);
            if(code=='sleet') 			      skycons.add(icon, Skycons.SLEET);
            if(code=='rain') 			        skycons.add(icon, Skycons.RAIN);
            if(code=='snow') 			        skycons.add(icon, Skycons.SNOW);
            if(code=='sunny') 			      skycons.add(icon, Skycons.CLEAR_DAY);
            if(code=='tstorms') 		      skycons.add(icon, Skycons.WIND);

            skycons.play();
        }, 0);
    }

    //// Update

    var polling = $interval(function() {
        //getWeather();
        //getForecast();
    }, CONFIG.weather_refresh);

    var timepolling = $interval(function() {
        getDate();
    }, 1000);

}

angular.module('main').controller('WeatherController', WeatherController);
