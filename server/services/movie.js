import Movie from '../models/movie.js';

class MovieService {
    constructor() {
        this.movies = [];
    }

    async addMovie(data) {
        const movie = new Movie(data);
        this.movies.push(movie);
        return movie;
    }

    async addViewer(movieId, viewer) {
        const movie = this.movies.find(m => m.id === movieId);
        movie.addViewer(viewer);
    }

    async removeViewer(movieId, viewerId) {
        const movie = this.movies.find(m => m.id === movieId);
        movie.removeViewer({ id: viewerId });

        this.movies = this.movies.map(m => {
            if (m.id === movieId) {
                return movie;
            }
            return m;
        });
    }

    async getMovieViewers(movieId) {
        const movie = this.movies.find(m => m.id === movieId);
        return movie.getViewerIDs();
    }

    async getAll() {
        return this.movies;
    }

    async getMovie(movieId) {
        return this.movies.find(m => m.id === movieId);
    }
}

const instance = new MovieService();

export default instance;