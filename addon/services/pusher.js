import Ember from 'ember';
import Mapping from '../utils/mapping';

export default Ember.Service.extend({
  key: null,
  _service: null,
  _mappings: null,
  _handlers: null,

  _mappingFor(channelName) {
    return this._mappings[channelName] || this._registerMapping(channelName);
  },

  _registerMapping(channelName) {
    return this._mappings[channelName] = Mapping.create({
      channel: this._service.subscribe(channelName)
    });
  },

  _handlerFor(target) {
    return this._handlers[target.toString()] || this._registerHandler(target);
  },

  _registerHandler(target) {
    return this._handlers[target.toString()] = function(eventName, data) {
      const actionName = Ember.String.camelize(eventName.replace(':', '-'));

      if (Ember.typeOf(target._actions[actionName]) === 'function') {
        Ember.run(target, target.send, actionName, data);
      }
    }
  },

  _removeChannel(channelName) {
    this._service.unsubscribe(channelName)
    delete this._mappings[channelName];
  },

  connect(token) {
    this._handlers = {};
    this._mappings = {};
    this._service = new Pusher(this.key, this.configFor(token));
  },

  configFor(token) {
    return {};
  },

  subscribe(target, channelName) {
    const mapping = this._mappingFor(channelName);
    const handler = this._handlerFor(target);
    mapping.addTarget(target);
    mapping.channel.bind_all(handler);
  },

  unsubscribe(target, channelName) {
    const mapping = this._mappingFor(channelName);
    mapping.removeTarget(target);
    if (!mapping.get('hasTargets')) {
      this._removeChannel(channelName);
    }
  }
});
