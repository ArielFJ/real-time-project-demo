"use client";
import { useAxios } from '@/services/useAxios';
import useLocalStorage from '@/services/useLocalStorage'
import React, {
    useEffect,
    useState
} from 'react'
// import { getId } from '../../services/websocket';

function CredsDisplay() {
    const [user, setUser] = useLocalStorage('user', undefined);
    const [isClient, setIsClient] = useState(false);
    const { get, post } = useAxios();

    useEffect(() => {
        setIsClient(true);

        if (user) return;
        // const id = getId();
        post('/users', {
            // id,
            name: 'John Doe'
        })
            .then(({ data }) => {
                const { data: newUser } = data;
                setUser(newUser);
            })
    }, [])

    if (!isClient) return null;

    return (
        <div>
            <p>
                {user ? <>ID: {user.id}</> : <>Loading...</>}
            </p>
        </div>
    )
}

export default CredsDisplay
