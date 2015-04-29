// js/models/item.js

var app = app || {};

// Item model
// ----------
// Our basic **Item** model.

app.Item = Backbone.Model.extend({

  // Default attributes ensure that each item created has various fields.
  defaults: {
    title: '',
    description: '',
    dealerInternalNotes: '',
    material: {
      description: '',
      restricted: false,
    },
    measurement: {
      unit: 'in',
      shape: ''
    },
    condition: {
      description: ''
    }
  },

  idAttribute: '_id'
});
