import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('connect', () => {
    // Event fired when the client is connected
});

socket.on('connect_error', (error) => {
    console.error("❌ ~ socket.on ~ connect_error", error)
});

socket.on("disconnect", (reason, details) => {
    console.log("🚀 ~ socket.on ~ reason, details:", { reason, details })
});

const getID = () => socket.id;

const emit = (event, data) => {
    socket.emit(event, data);
}

const subscribe = (event, callback) => {
    socket.on(event, callback);
}

const unsubscribe = (event, callback) => {
    socket.off(event, callback);
}

export {
    // socket,
    getID,
    emit,
    subscribe,
    unsubscribe
}