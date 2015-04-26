// js/app.js

var app = app || {};

$(function() {

  var items = [
    {title: 'item1'},
    {title: 'another item'},
    {title: 'what title?'}
  ];

  console.log('kicking off app');
  new app.ItemsView(items);
});