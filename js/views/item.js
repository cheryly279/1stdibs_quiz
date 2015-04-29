// js/views/item.js

var app = app || {};

app.ItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'itemContainer',
  itemTemplate: _.template($('#item-template').html()),
  materialsTemplate: _.template($('#materials-template').html()),
  conditionsTemplate: _.template($('#conditions-template').html()),

  initialize: function(options) {
    this.materialsList = options.materialsList;
    this.conditionsList = options.conditionsList;
  },

  events: {
    'click .edit': 'editItem',
    'click .delete': 'deleteItem',
    'click .save': 'saveItem',
    'change [name=shape]': 'updateShape',
    'change [name=unit]': 'updateUnit'
  },

  editItem: function(e) {
    this.$editItem = this.$('#edit-item');

    e.preventDefault();
    this.$editItem.toggle();
  },

  saveItem: function(e) {
    this.$editItem = this.$('#edit-item');
    this.$itemForm = this.$('#item-form');
    e.preventDefault();

    var formArray = this.$itemForm.serializeArray(),
        formLength = formArray.length,
        currentObj = {},
        formData = {};

    console.dir(formArray);

    for (var i=0; i < formLength; i++) {
      currentObj = formArray[i];

      // simple text fields
      if (currentObj.name === 'title' || 
          currentObj.name === 'description' || 
          currentObj.name === 'dealerInternalNotes') {
        formData[currentObj.name] = currentObj.value;
      }

      // materials obj
      formData['material'] = formData['material'] || {description: '', restricted: false};
      if (currentObj.name === 'materials') {
        formData['material'].description = currentObj.value;
      }
      if (currentObj.name === 'restricted' && currentObj.value === 'on') {
        formData['material'].restricted = true;
      }

      // condition obj
      formData['condition'] = formData['condition'] || {description: ''};
      if (currentObj.name === 'condition') {
        formData['condition'].description = currentObj.value;
      }

      // measurement obj
      formData['measurement'] = formData['measurement'] || {unit: 'in', shape: ''};
      if (currentObj.name === 'unit') {
        formData['measurement'].unit = currentObj.value;
      }
      if (currentObj.name === 'shape') {
        formData['measurement'].shape = currentObj.value;
      }
      if (currentObj.name === 'length' || currentObj.name === 'depth' || currentObj.name === 'height' || currentObj.name === 'diameter') {
        formData['measurement'][currentObj.name] = currentObj.value;
      }
    }

    console.dir(formData);

    this.model.set(formData);
    this.model.save();

    this.$editItem.toggle();
    this.render();
  },

  updateShape: function(e) {
    var $clicked = $(e.target);

    if ($clicked.val() === 'Rectangular') {
      this.$('.measurement-values input.rectangular').prop('disabled', false);
      this.$('.measurement-values input.circular').prop('disabled', true);
    }
    else if ($clicked.val() === 'Circular') {
      this.$('.measurement-values input.rectangular').prop('disabled', true);
      this.$('.measurement-values input.circular').prop('disabled', false);
    }
  },

  updateUnit: function(e) {
    var $clicked = $(e.target);
    this.$('.measurement-values span').text($clicked.val());
  },

  deleteItem: function() {
    this.model.destroy();
    this.remove();
  },

  render: function() {
    this.$el.html(this.itemTemplate(this.model.toJSON()));
    this.$('#materialsContainer').html(this.materialsTemplate({materialsList: this.materialsList, materialIndex: this.materialsList.indexOf(this.model.get('material').description)}));
    this.$('#conditionsContainer').html(this.conditionsTemplate({conditionsList: this.conditionsList, conditionIndex: this.conditionsList.indexOf(this.model.get('condition').description)}));
    return this;
  }
});