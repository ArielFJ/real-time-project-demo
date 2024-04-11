import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { useAxios } from '../../services/useAxios';
import useLocalStorage from '../../services/useLocalStorage';
import CredsDisplay from '../../components/CredsDisplay';
import MovieList from './components/MovieList';
import { subscribe, unsubscribe } from '../../services/websocket';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Admin() {
    const [user, setUser, removeUser] = useLocalStorage('user', undefined);
    const [movies, setMovies] = useState([]);
    const { get, post, del } = useAxios();
    const navigate = useNavigate();

    const getAllMovies = async () => {
        const data = await get('/movies')
        setMovies(data);
    }

    const deleteAdmin = async (id) => {
        console.log('deleting...', id);
        await del(`/users/${id}`);
        getAllMovies();
    }

    const createNewUser = async (name, role) => {
        await deleteAdmin(user.id);
        try {

            const { data } = await post('/users', {
                name,
                role
            })
            setUser(data.data);
        } catch (err) {
            const { data } = err.response;
            if (data.message === 'ADMIN_LIMIT_REACHED' && role === 'admin') {
                toast.error('Only one admin is allowed', {
                    theme: 'dark',
                });
                navigate('/');
            }
        }
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

            deleteAdmin(user.id);
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
