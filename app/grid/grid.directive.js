angular.module('main').directive('grid', function($rootScope, $compile, $http, devicesService, CONFIG, HOSTLOGIN) {
    return {
        scope: {},
        controller: 'GridController',
        controllerAs: 'vm',
        link: function(scope, element) {
            var vm = this;

            vm.colums  = CONFIG.colums;
            vm.blocks  = CONFIG.blocks;

            setColums();
            setBlocks();

            function setColums(){
                angular.forEach(vm.colums, function (res) {
                    angular.element(document.getElementById('colums')).append('<div id="colum' + res.colum + '" class="colum ' + res.class +'"></div>');
                });

                $compile(element.contents())(scope);
            }

            function setBlocks(){
                angular.forEach(vm.blocks, function (res) {
                    getCorrectBlock(res);
                });

                $compile(element.contents())(scope);
            }

            function getCorrectBlock (res){

                switch (res.type) {
                    case 'Heading':
                        angular.element(document.getElementById(res.colum)).append('<div class="heading ' + res.class +'">' + res.title +'</div>');
                        break;
                    case 'Device':
                        angular.element(document.getElementById(res.colum)).append('<block class="block dev ' + res.class +'"><device class="device" name="' + res.title +'" id="' + res.idx + '"></device></block>');
                        break;
                    case 'News':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><news></news></block>');
                        break;
                    case 'Tabs':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><tabs id="tabs"></tabs></block>');
                        break;
                    case 'Weather':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><weather></weather></block>');
                        break;
                    case 'Traffic':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><traffic></traffic></block>');
                        break;
                    case 'Spotify':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><spotify></spotify></block>');
                        break;
                    case 'Calendar':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><calendar></calendar></block>');
                        break;
                    case 'Tvguide':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><tvguide></tvguide></block>');
                        break;
                    case 'Sabnzb':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><sabnzb name="' + res.title +'"></sabnzb></block>');
                        break;
                    case 'Garbage':
                        angular.element(document.getElementById(res.colum)).append('<block class="block ' + res.class +'"><garbage name="' + res.title +'"></garbage></block>');
                        break;
                    default:
                }
            }

            //// Update

            $rootScope.$on('$render', function (event, data) {
                vm.colums  = data.colums;
                vm.blocks  = data.blocks;
                var myEl = angular.element( document.querySelector( '#colums' ) );
                myEl.empty();
                setColums();
                setBlocks();

            });


        }
    }
});
