'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('BeerListController', ['$scope', '$http',
    function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/beers'
    }).
    success(function (data, status, headers, config) {
      $scope.beers = data;
      $scope.msg = 'Listagem completa!';
    }).
    error(function (data, status, headers, config) {
      $scope.msg = 'Error!';
    });

  }]).
  controller('BeerCreateController', ['$scope', '$http',
    function ($scope, $http) {
    $scope.msg = '';

    $scope.create = function(entity){
      $http({
        method: 'POST',
        url: '/api/beers',
        data: entity
      }).
      success(function (data, status, headers, config) {
        $scope.beer = data;
        $scope.msg = 'Cadastro da cerveja '+data.name+ ' completa!';
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!';
      });
    }

  }]).
  controller('BeerShowController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

    var id = $routeParams.id;
    var url = '/api/beers/'+id; 

    $http({
      method: 'GET',
      url: url
    }).
    success(function (data, status, headers, config) {
      $scope.beer = data;
      $scope.msg = 'Consulta completa!';
    }).
    error(function (data, status, headers, config) {
      $scope.msg = 'Error!';
    });

  }]).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
