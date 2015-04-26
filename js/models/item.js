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
      restricted: 'N',
    },
    measurement: {
      unit: 'in',
      shape: ''
    },
    condition: {
      description: ''
    }
  },

  // Toggle the 'completed' state of this todo item.
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});


/*

id: 123 // how do we handle ids again?
title: "Lorem Ipsum"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
dealerInternalNotes: "none available"
material: 
  description: "Ceramic"
  restricted: "N"
measurement:
  unit: "in"
  shape: ""
  length: "4.5" // add these in as we fill them out?
  depth: "4.5"
  height: "12"
condition: // why is there a sub field? why not just value "Good"?
  description: "Good"

*/



