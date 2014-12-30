angular.module('iprofile.controllers', [])

.controller('MainCtrl', 
  function($scope, $ionicModal) {
    $scope.profile = {
      name: 'Steven Huang',
      email: 'steven.huang@gmail.com',
      tel: '13912345678',
      plates: '沪A6U666'
    };

    $scope.newProfile = {
      name: $scope.profile.name,
      email: $scope.profile.email,
      tel: $scope.profile.tel,
      plates: $scope.profile.plates,
      auth: 'pin'
    };

    $scope.authMethods = [
      { name: 'Touch ID', value: 'tid' },
      { name: 'Password', value: 'pin' },
      { name: 'None', value: 'non' }
    ];

    $ionicModal.fromTemplateUrl('templates/update.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.updateModal = modal;
    });

    $scope.openUpdateModal = function() {
      $scope.updateModal.show();
    };

    $scope.closeUpdateModal = function() {
      $scope.updateModal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/share.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.shareModal = modal;
    });

    $scope.openShareModal = function() {
      $scope.shareModal.show();
    };

    $scope.closeShareModal = function() {
      $scope.shareModal.hide();
    };

  }
);
