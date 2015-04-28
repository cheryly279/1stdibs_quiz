// js/views/item.js

var app = app || {};

app.ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'itemContainer',
  itemTemplate: _.template($('#item-template').html()),

  events: {
    'click .edit': 'editItem',
    'click .delete': 'deleteItem',
    'click .save': 'saveItem',
    'change [name=shape]': 'updateShape',
    'change [name=unit]': 'updateUnit'
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

  updateShape: function(e) {
    var $clicked = $(e.target);

    if ($clicked.val() === 'rectangle') {
      this.$('.length input').prop('disabled', false);
      this.$('.height input').prop('disabled', false);
      this.$('.depth input').prop('disabled', false);
      this.$('.diameter input').prop('disabled', true);
    }
    else if ($clicked.val() === 'circle') {
      this.$('.length input').prop('disabled', true);
      this.$('.height input').prop('disabled', true);
      this.$('.depth input').prop('disabled', true);
      this.$('.diameter input').prop('disabled', false);
    }
  },

  updateUnit: function(e) {
    var $clicked = $(e.target);

    this.$('.length span').text($clicked.val());
    this.$('.height span').text($clicked.val());
    this.$('.depth span').text($clicked.val());
    this.$('.diameter span').text($clicked.val());
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