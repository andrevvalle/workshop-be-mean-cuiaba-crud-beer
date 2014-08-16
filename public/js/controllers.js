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

    $scope.remove = function(entity){
      console.log('Remove: ', entity._id);

      var url = '/api/beers/'+entity._id
      var method = 'DELETE';
      
      if(confirm('Gostaria mesmo de deletar a cerveja ' + entity.name + '?')){

        $http({
          method: method,
          url: url
        }).
        success(function (data, status, headers, config) {
          $scope.msg = 'Exclusão da cerveja '+entity.name+ ' completa!';
          // Remover cerveja do $scope.beers
          var index = $scope.beers.indexOf(entity);
          $scope.beers.splice(index, 1);
        }).
        error(function (data, status, headers, config) {
          $scope.msg = 'Error!';
        }); 
      }
      
    }

  }]).
  controller('BeerCreateController', ['$scope', '$http',
    function ($scope, $http) {
    $scope.msg = '';

    $http({
      method: 'GET',
      url: '/api/beers'
    }).
    success(function (data, status, headers, config) {
      $scope.beers = data;
    }).
    error(function (data, status, headers, config) {
      $scope.msg = 'Error!';
    });

    $scope.create = function(entity){
      $http({
        method: 'POST',
        url: '/api/beers',
        data: entity
      }).
      success(function (data, status, headers, config) {
        $scope.beers.push(entity);
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
  controller('BeerEditController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
    $scope.msg = '';

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

    $scope.save = function(entity){
      $http({
        method: 'PUT',
        url: url,
        data: entity
      }).
      success(function (data, status, headers, config) {
        $scope.beer = entity;
        $scope.msg = 'Alteração da cerveja '+entity.name+ ' completa!';
      }).
      error(function (data, status, headers, config) {
        $scope.msg = 'Error!';
      });
    }

  }]).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
