import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { useAxios } from '../../services/useAxios';
import useLocalStorage from '../../services/useLocalStorage';
import CredsDisplay from '../../components/CredsDisplay';
import MovieList from './components/MovieList';
import { subscribe, unsubscribe } from '../../services/websocket';

function Admin() {
    const [user, setUser, removeUser] = useLocalStorage('user', undefined);
    const [movies, setMovies] = useState([]);
    const { get, post } = useAxios();

    const getAllMovies = async () => {
        const data = await get('/movies')
        setMovies(data);
    }

    const createNewUser = (name, role) => {
        post('/users', {
            name,
            role
        })
            .then(({ data }) => {
                const { data: newUser } = data;
                setUser(newUser);
            });
    }

    const onUserLeftMovie = (data) => getAllMovies();

    const onUserJoinedMovie = (data) => getAllMovies();

    useEffect(() => {
        getAllMovies();
        removeUser();
        createNewUser('Admin User', 'admin');

        // These events send { movieId, userId }
        subscribe('user-left-movie', onUserLeftMovie);
        subscribe('user-joined-movie', onUserJoinedMovie);

        return () => {
            unsubscribe('user-left-movie');
            unsubscribe('user-joined-movie');

            removeUser();
            createNewUser('John Doe', 'user');
        };
    }, [])


    return (
        <div className="relative">
            <div className="absolute">
                <CredsDisplay />
            </div>

            <div className="w-full h-screen flex justify-center pt-8 bg-gradient-to-b from-gray-700 to-black" >
                <div className="w-2/3 flex flex-col items-center gap-10">
                    <h3 className="text-2xl">Welcome, Admin!</h3>

                    <div className='min-w-full'>
                        <MovieList movies={movies} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
