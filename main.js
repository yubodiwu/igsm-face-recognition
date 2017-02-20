'use strict';
// jshint esversion: 6
// jshint devel: true
// jshint node: true
// jshint browser: true
// jshint mocha: true

var app = angular.module("redditClone", [
    "ngResource"
]);

app.factory("PostList", function($resource) {
    return $resource("https://www.reddit.com/r/all/.json");
});

app.controller("PostsController", function($scope, PostListService, PostList) {
    $scope.loading = PostListService.isLoading;
    $scope.posts = PostListService.posts;

    PostList.get(function(redditData) {
        angular.forEach(redditData.data.children, function(post) {
            var {thumbnail, title} = post.data;

            var imgSrc = "https://static5.businessinsider.com/image/51d5c5f769bedde53d000002-480/reddit-alien-blue.jpg";

            if (thumbnail != "default" && thumbnail !== "image" && thumbnail !== "self") {
                imgSrc = thumbnail;
            }

            if (thumbnail === "nsfw") {
                imgSrc = "https://i.imgur.com/rd6jDiP.gif";
            }

            if (title.length > 70) {
                title = title.substring(0, 67) + "...";
            }

            post.imgSrc = imgSrc;
            post.data.title = title;

            $scope.posts.push(post);
        });

        $scope.loading = false;
    });
});

app.controller("PostActionController", function($scope) {

})

app.service("PostListService", function(PostList) {
    var self = {
        isLoading: true,
        posts: []
    };

    return self;
});
