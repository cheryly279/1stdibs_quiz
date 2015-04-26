// js/views/items.js

var app = app || {};

app.ItemsView = Backbone.View.extend({
  el: '#items',

  initialize: function(initialItems) {
    console.log('in ItemsView initializer');
    this.collection = new app.ItemList(initialItems);
    this.render();
  },

  render: function() {
    console.log('in render');
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    console.log('in render item');
    var itemView = new app.ItemView({
      model: item
    });
    this.$el.append(itemView.render().el);
  }
});