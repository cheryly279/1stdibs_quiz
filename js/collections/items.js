// js/collections/items.js

var app = app || {};

// Item collection
// ---------------

// The collection of items is backed by a mongo database accessed via a REST api.
app.ItemList = Backbone.Collection.extend({
  model: app.Item
});