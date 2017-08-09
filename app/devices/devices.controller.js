function DevicesController($scope, $rootScope, $http, devicesService, $timeout, CONFIG, HOSTLOGIN) {

    var vm                = this;
    vm.deviceid           = $scope.id;
    vm.blocktitle         = $scope.name;
    vm.device             = {};

    vm.devicesService     = devicesService;
    vm.switchDevice       = switchDevice;
    vm.dimDevice          = dimDevice;
    vm.getIcon            = getIcon;

    activate();

    ///////////////////////////////

    function activate(){
        getDevice(false);
    }

    //// Public interface

    function getDevice(update){
        devicesService.get($scope.id, update).then(function(res) {
            vm.device = res[0];
        });
    }

    function switchDevice(device){

        if(device.Data === 'Off'){
            var status = 'On';
        } else {
            var status = 'Off';
        }

        $http.get(devicesService.getHost() + '/json.htm?' + HOSTLOGIN + 'type=command&param=switchlight&idx=' + device.idx + '&switchcmd=' + status).then(function() {
            getDevice(true);
        });
    }

    function dimDevice(id, level){
        $http.get(devicesService.getHost() + '/json.htm?' + HOSTLOGIN + 'type=command&param=switchlight&idx=' + id + '&switchcmd=Set%20Level&level=' + level).then(function() {
            getDevice(true);
        });
    }

    function getIcon(device){
        if(device.SwitchType === 'Dimmer'
        || device.SwitchType === 'Media Player'
        || device.SwitchType === 'On/Off'
        || device.SwitchType === 'Selector'){
            switch (device.Image) {
                case 'Light':         return 'fa-lightbulb-o'; break;
                case 'Alarm':         return 'fa-bell'; break;
                case 'Amplifier':     return 'fa-bullhorn'; break;
                case 'ChristmasTree': return 'fa-tree'; break;
                case 'Computer':      return 'fa-laptop'; break;
                case 'ComputerPC':    return 'fa-desktop'; break;
                case 'Cooling':       return 'fa-snowflake-o'; break;
                case 'Fan':           return 'fa-refresh'; break;
                case 'Fireplace':     return 'fa-fire'; break;
                case 'Generic':       return 'fa-power-off'; break;
                case 'Harddisk':      return 'fa-hdd-o'; break;
                case 'Heating':       return 'fa-thermometer-full'; break;
                case 'Media':         return 'fa-youtube-play'; break;
                case 'Phone':         return 'fa-mobile'; break;
                case 'Printer':       return 'fa-print'; break;
                case 'Speaker':       return 'fa-volume-up'; break;
                case 'TV':            return 'fa-television'; break;
                case 'WallSocket':    return 'fa-plug'; break;
                case 'Water':         return 'fa-tint'; break;
                default:
            }
        } else {
            switch (device.SwitchType) {
                case 'Blinds':                      return 'fa-bars'; break;
                case 'Blinds Inverted':             return 'fa-bars'; break;
                case 'Blinds Percentage':           return 'fa-bars'; break;
                case 'Blinds Percentage Inverted':  return 'fa-bars'; break;
                case 'Contact':                     return 'fa-exchange'; break;
                case 'Door Lock':                   return 'fa-lock'; break;
                case 'Doorbell':                    return 'fa-bell-o'; break;
                case 'Dusk Sensor':                 return 'fa-sun-o'; break;
                case 'Motion Sensor':               return 'fa-assistive-listening-systems'; break;
                case 'Push Off Button':             return 'fa-toggle-off'; break;
                case 'Push On Button':              return 'fa-toggle-on'; break;
                case 'Smoke Detector':              return 'fa-cloud'; break;
                case 'Venetian Blinds EU':          return 'fa-bars'; break;
                case 'Venetian Blinds US':          return 'fa-bars'; break;
                case 'X10 Siren':                   return 'fa-bullhorn'; break;
                default:
            }
        }
    }

    //// Update

    $scope.$on("slideEnded", function(event, args) {
        var ngmodel   = event.targetScope.rzSliderModel;
        var id        = vm.deviceid;
        dimDevice(id, ngmodel);
    });


}

angular.module('main').controller('DevicesController', DevicesController);
