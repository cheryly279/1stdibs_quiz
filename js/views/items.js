// js/views/items.js

var app = app || {};

app.ItemsView = Backbone.View.extend({
  el: '#items',

  initialize: function() {
    this.collection = new app.ItemList();
    this.collection.fetch({reset: true});

    // get lists for edit form
    $.ajax({
      url: "http://localhost:4711/api/enums",
      context: this
    }).done(function(data) {
      this.materialsList = data.itemEnums.material;
      this.conditionsList = data.itemEnums.condition.description;

      this.render();

      this.listenTo(this.collection, 'add', this.renderItem);
      this.listenTo(this.collection, 'reset', this.render); 
    });
  },

  events: {
    'click #add': 'addItem'
  },

  addItem: function(e) {
    e.preventDefault();

    var formData = {};
    this.collection.create(formData);
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    var itemView = new app.ItemView({
      model: item,
      materialsList: this.materialsList,
      conditionsList: this.conditionsList
    });
    this.$el.append(itemView.render().el);
  }
});