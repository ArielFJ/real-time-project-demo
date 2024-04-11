import StarWarsMovie from '@/components/StarWarsAnimation'
import IndianaJonesMovie from '@/components/IndianaJonesAnimation'
import React, { useEffect, useState } from 'react'
import useLocalStorage from '@/services/useLocalStorage'
import MovieLayout from '@/layouts/MovieLayout'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { emit, subscribe, unsubscribe } from '../../services/websocket'
import { toast } from 'react-toastify'

const movies = {
    'indiana-jones': <IndianaJonesMovie />,
    'star-wars': <StarWarsMovie />,
}

export async function loader({ params }) {
    return params
}

function Movie() {
    const { movieId } = useLoaderData();
    const [user] = useLocalStorage('user', undefined);
    const Movie = movies[movieId];
    const navigate = useNavigate();

    const onUserLeftMovie = (data) => {
        const { movie, userId } = data;
        if (movie.id !== movieId || userId !== user.id) {
            return;
        }

        toast.error(`You have been kicked from ${movie.title} by the admin!`, {
            theme: 'dark',
        });
        navigate('/');
    }

    useEffect(() => {
        subscribe('user-left-movie', onUserLeftMovie);

        return () => {
            unsubscribe('user-left-movie');
        };
    }, [])

    useEffect(() => {
        emit('select-movie', { type: 'select-movie', payload: { movie: movieId, user } })

        return () => {
            emit('leave-movie', { type: 'leave-movie', payload: { movie: movieId, user } })
            unsubscribe('user-left-movie');
        }
    }, [])

    return (
        <MovieLayout>
            <div className="w-full h-full">
                {Movie}
            </div>
        </MovieLayout>
    )
}

export default Movie
