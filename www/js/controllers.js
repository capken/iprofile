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

    $scope.saveProfile = function() {
      $scope.profile = $scope.newProfile;
      $scope.updateModal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/share.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.shareModal = modal;
    });

    $scope.openShareModal = function() {
      $scope.profileURL = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + 
        encodeURIComponent(JSON.stringify($scope.profile));
      console.log($scope.profileURL);
      $scope.shareModal.show();
    };

    $scope.closeShareModal = function() {
      $scope.shareModal.hide();
    };

    $scope.formatTel = function(tel) {
      if(angular.isDefined(tel)) {
        return tel.replace(/(1\d{2})(\d{4})(\d{4})/, "$1 $2 $3");
      } else {
        return null;
      }
    }

  }
);
