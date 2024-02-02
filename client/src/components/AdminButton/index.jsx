import React from 'react'
import { Link } from 'react-router-dom';

function AdminButton() {
    return (
        <Link
            to='/admin'
            className="flex justify-center items-center rounded h-[2rem] w-[6rem] font-bold bg-cyan-700 hover:bg-cyan-800"
        >
            Admin
        </Link>
    )
}

export default AdminButton
