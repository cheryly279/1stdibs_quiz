// js/views/item.js

var app = app || {};

app.ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'itemContainer',
  itemTemplate: _.template($('#item-template').html()),

  events: {
    'click .edit': 'editItem',
    'click .delete': 'deleteItem',
    'click .save': 'saveItem'
  },

  editItem: function(e) {
    this.$editItem = this.$('.edit-item');

    e.preventDefault();
    this.$editItem.toggle();
  },

  saveItem: function(e) {
    this.$editItem = this.$('.edit-item');

    e.preventDefault();
    this.model.set({title: this.$('.title').val()});
    this.model.save();

    // TODO: check for error?

    this.$editItem.toggle();
    this.render();
  },

  deleteItem: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    this.$el.html(this.itemTemplate(this.model.toJSON()));
    return this;
  }
});