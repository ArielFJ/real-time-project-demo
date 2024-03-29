import userService from './services/user.js';
import movieService from './services/movie.js';
import { EVENTS } from './utils/constants.js';
import loggingService from './services/logging/index.js';

movieService.addMovie({ id: 'star-wars', title: 'Star Wars' });
movieService.addMovie({ id: 'indiana-jones', title: 'Indiana Jones' });

let socketIoInstance;

export const initWebSocket = (socketIo) => {
    socketIoInstance = socketIo;
    socketIo.on('connection', (socket) => {
        loggingService.log('A user connected', socket.id);

        // Handle client events
        socket.on(EVENTS.SELECT_MOVIE, (data) => onSelectMovie(data, socket));
        socket.on(EVENTS.LEAVE_MOVIE, (data) => onLeaveMovie(data, socket));
        socket.on(EVENTS.KICK_USER, (data) => onKickUser(data, socket));

        socket.on(EVENTS.DISCONNECT, onDisconnect);
    });
}

const onSelectMovie = async (data, socket) => {
    // socket.broadcast.emit('in-movie', 'from broadcast');
    const { movie, user } = data.payload;
    await movieService.addViewer(movie, user);
    loggingService.log(`User ${user.id} joined movie ${movie}`);
    socketIoInstance.emit(EVENTS.USER_JOINED_MOVIE, { movieId: movie, user });
}

const onLeaveMovie = async (data, socket) => {
    const { movie: movieId, user } = data.payload;
    await movieService.removeViewer(movieId, user.id);
    const movie = await movieService.getMovie(movieId);
    loggingService.log(`User ${user.id} left movie ${movieId}`);
    socketIoInstance.emit(EVENTS.USER_LEFT_MOVIE, { movie, userId: user.id });
}

const onKickUser = async (data, socket) => {
    const { movieId, userId } = data.payload;
    await movieService.removeViewer(movieId, userId);
    const movie = await movieService.getMovie(movieId);
    loggingService.log(`User ${userId} was kicked from movie ${movieId}`);
    socketIoInstance.emit(EVENTS.USER_LEFT_MOVIE, { movie, userId });
}

const onDisconnect = () => {
    loggingService.log('A user disconnected');
}