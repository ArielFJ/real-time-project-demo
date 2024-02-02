import React from 'react'

const colors = {
    red: `bg-red-700 hover:bg-red-800`,
    green: `bg-green-700 hover:bg-green-800`,
    cyan: `bg-cyan-700 hover:bg-cyan-800`,
    blue: `bg-blue-700 hover:bg-blue-800`,
    purple: `bg-purple-700 hover:bg-purple-800`,
}

function Button({ children, color = 'cyan', ...rest }) {
    const colorClass = colors[color];
    return (
        <button
            className={`flex justify-center items-center rounded h-[2rem] w-[6rem] text-white font-bold ${colorClass}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
