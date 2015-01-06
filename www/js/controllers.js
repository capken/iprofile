angular.module('iprofile.controllers', [])

.controller('MainCtrl', 
  function($scope, $ionicModal, $ionicPopup, $cordovaTouchID, $ionicPlatform) {

    var initProfile = function() {
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
    }

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
      //$scope.profileURL = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + 
      //  encodeURIComponent(JSON.stringify($scope.profile));
      $scope.profileURL = 'http://tool.oschina.net/action/qrcode/generate?data=' +
        encodeURIComponent(JSON.stringify($scope.profile)) +
        '&output=image%2Fpng&error=M&type=0&margin=0&size=4';
      
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

    $scope.auth = {
      passed: false
    }

    var showAuthPopup = function() {
      $scope.auth.pin = '';
      var authPopup = $ionicPopup.show({
        template: '<input id="password" autofocus type="password" ng-model="auth.pin">',
        title: 'Enter your password',
        scope: $scope,
        buttons: [
          {
            text: 'OK',
            type: 'button-positive',
            onTap: function(e) {
              return $scope.auth.pin;
            }
          }
        ]
      });

      authPopup.then(function(res) {
        console.log('res => [' + res + ']');
        if($scope.auth.pin === '123456') {
          $scope.auth.passed = true;
          initProfile();
        } else {
          showAuthPopup();
        }
      });
    }

    $ionicPlatform.ready(function() {
      $cordovaTouchID.checkSupport().then(function() {
        $cordovaTouchID.authenticate("Please use your touch ID").then(function() {
          $scope.auth.passed = true;
          initProfile();
        }, function () {
          showAuthPopup();
        });
      }, function (error) {
        showAuthPopup();
      });
    });

  }
);
