// js/views/item.js

var app = app || {};

app.ItemEditView = Backbone.View.extend({
  tagName: 'div',
  className: 'editContainer',
  template: _.template($('#edit-item-template').html()),

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});