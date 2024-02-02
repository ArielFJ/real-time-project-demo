import React from 'react'

function ImagePoster({ src, alt = "Image Poster" }) {
    return (
        <div className="w-full h-full object-cover rounded-lg border-gray-700 border-2 hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-gray-500" >
            <img src={src} alt={alt} width={1080} height={1920} className="h-full object-cover" />
        </div>
    )
}

export default ImagePoster
