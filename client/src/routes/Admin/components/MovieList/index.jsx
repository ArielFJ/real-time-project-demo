import React, { Fragment } from 'react'
import Button from '../../../../components/Button'
import { emit } from '../../../../services/websocket'

function MovieList({ movies }) {
    const handleKickOut = (movieId, userId) => {
        emit('kick-user', { type: 'kick-out', payload: { movieId, userId } })
    }

    return (
        <table className='border-collapse border-spacing-2'>
            <tbody>
                {movies.map((movie, i) => (
                    <>
                        <tr key={movie.id} className='border-white font-bold'>
                            <td className='py-2 text-lg'>{movie.title} [{movie.id}]</td>
                        </tr>
                        {
                            movie?.viewers?.length > 0 && (
                                <Fragment key={movie.id + 'viewers'}>
                                    <tr className='border border-white font-semibold'>
                                        <td className='w-7/12'>ID</td>
                                        <td className='w-2/12'>Name</td>
                                        <td className='w-2/12'>Role</td>
                                        <td className='w-1/12'></td>
                                    </tr>
                                    {movie.viewers.map((viewer, j) => (
                                        <tr key={viewer.id} className='border border-white text-gray-300'>
                                            <td className='py-2'>{viewer.id}</td>
                                            <td>{viewer.name}</td>
                                            <td>{viewer.role}</td>
                                            <td>
                                                <Button
                                                    color="red"
                                                    onClick={() => handleKickOut(movie.id, viewer.id)}>
                                                    Kick out
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </Fragment>
                            )
                        }
                    </>
                ))}
            </tbody>
        </table>
    )
}

export default MovieList
