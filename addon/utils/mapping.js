import Ember from 'ember';

export default Ember.Object.extend({
  channel: null,
  targets: null,
  hasTargets: Ember.computed.notEmpty('targets'),

  setup: Ember.on('init', function() {
    this.targets = [];
  }),

  addTarget(target) {
    const index = this.targets.indexOf(target.toString());
    if (index === -1) {
      this.targets.push(target);
    }
  },

  removeTarget(target) {
    const index = this.targets.indexOf(target.toString());
    if (index === -1) {
      this.targets.splice(index, 1);
    }
  }
});
