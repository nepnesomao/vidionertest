angular.module('vidioner.controllers', [])

.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
})

.controller('DashCtrl', function($scope,$ionicModal) {
    $scope.videos = [
        {
        title: "My first video",
        date: "1-1-2015",
        content : "testtt tetete dfdfdf dtr tr ",
        thumbnails: "http://i.ytimg.com/vi/bJp1ptX4F3M/maxresdefault.jpg",
        likeCount : 2,
        commentCount : 5
        }, 
        {
        title: "My second video",
        date: "5-7-2015",
         content : "testtt tetete dfdfdf dtr tr ",
        thumbnails: "http://i.ytimg.com/vi/NA2VerbOyt0/maxresdefault.jpg",
        likeCount : 2,
        commentCount : 10
    }]
    
    
    $scope.openModal = function name(id) {
        switch(id){
            case 'videoplayer':
                $scope.videoPlayerModal.show();
            break;
        }
    }
    $scope.closeModal =function name(id) {
         switch(id){
            case 'videoplayer':
                $scope.videoPlayerModal.hide();
            break;
        }
    }
    $scope.playVideo = function name(video) {
        $scope.selectedVideo = {
            title : 'Test',
            source : 'I0riVRmp6G0'
        };
        $scope.code = $scope.selectedVideo.source;
        $scope.openModal('videoplayer');
        console.log(video);
    }
    
    $scope.initializeModals = function name() {
        $ionicModal.fromTemplateUrl('templates/partials/video_player.html', {
            scope: $scope,
            animation: 'slide-in-up',
            id : 'videoplayer'
        }).then(function(modal) {
            $scope.videoPlayerModal = modal;
        });
    }
    
    $scope.initializeModals();
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
