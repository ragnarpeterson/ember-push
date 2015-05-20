/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-push',

  contentFor: function(type) {
    if (type === 'body') {
      return '<script src="//js.pusher.com/2.2/pusher.min.js"></script>';
    }
  }
};
