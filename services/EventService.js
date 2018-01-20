const eventListeners = {};

export default class EventService {
    static addEventListener(type, callback) {
        if (!eventListeners[type]) {
            eventListeners[type] = []
        }
        eventListeners[type].push(callback);
    }

    static dispatch(event) {
        let type = event.type;
        for (let callback of eventListeners[type]) {
            callback(event);
        }
    }
}