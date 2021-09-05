import React from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const WelcomeMessage: React.FC = () => {
  const query = useQuery()

  const tag = query.get('tag')
  const count = query.get('count')
  const imageUrl = query.get('image_url')

  console.log({ tag, count, imageUrl })

  return (
    <div className="flex items-center justify-center">
      <div
        id="welcome_message"
        className="flex flex-col items-center flex-shrink-0 px-56 py-20 text-white bg-black"
      >
        <img
          className="flex items-center justify-center object-cover text-black bg-white border-4 border-white rounded-full w-52 h-52"
          src={imageUrl ?? ''}
          alt={tag ?? 'U'}
        />
        <h1 className="mt-8 text-5xl text-center">
          {tag} just joined the server
        </h1>
        <p className="mt-4 text-4xl text-center text-gray-500">
          Member #{count}
        </p>
      </div>
    </div>
  )
}

export default WelcomeMessage
