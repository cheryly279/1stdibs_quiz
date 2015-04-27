// js/views/items.js

var app = app || {};

app.ItemsView = Backbone.View.extend({
  el: '#items',

  initialize: function() {
    this.collection = new app.ItemList();
    this.collection.fetch({reset: true});
    this.render();

    this.listenTo(this.collection, 'add', this.renderItem);
    this.listenTo(this.collection, 'reset', this.render);
  },

  events: {
    'click #add': 'addItem'
  },

  addItem: function(e) {
    e.preventDefault();

    var formData = {};

    // $('#addItem div').children('input').each(function(i, el) {
    //   if($(el).val() != '') {
    //     formData[el.id] = $(el).val();
    //   }
    // });

    $( '#addItem div' ).children( 'input' ).each( function( i, el ) {
      if( $( el ).val() != "" )
      {
        if( el.id === 'keywords' ) {
          formData[ el.id ] = [];
          _.each( $( el ).val().split( ' ' ), function( keyword ) {
            formData[ el.id ].push({ 'keyword': keyword });
          });
        } else if( el.id === 'releaseDate' ) {
          formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
    });

    this.collection.create(formData);
  },

  render: function() {
    this.collection.each(function(item) {
      this.renderItem(item);
    }, this);
  },

  renderItem: function(item) {
    var itemView = new app.ItemView({
      model: item
    });
    this.$el.append(itemView.render().el);
  }
});