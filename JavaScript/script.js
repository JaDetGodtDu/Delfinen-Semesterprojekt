"use strict";

var app = angular.module("myAPP", ["ngRoute"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", { templateURL: "main.htm" })
    .when("/nav1", { templateURL: "nav1.htm" })
    .when("/nav2", { templateURL: "nav2.htm" });
});
