// js/views/item.js

var app = app || {};

app.ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'itemContainer',
  template: _.template($('#item-template').html()),

  events: {
    'click .delete': 'deleteItem'
  },

  deleteItem: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});