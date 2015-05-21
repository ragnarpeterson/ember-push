import Pusher from 'ember-push/services/pusher';
import config from '../config/environment';

export default Pusher.extend({
  key: config['ember-push'].key
});
