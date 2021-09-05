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
        className="flex flex-col items-center px-20 py-4 text-white bg-black"
      >
        <img
          className="flex items-center justify-center object-cover w-20 h-20 text-black bg-white border-2 border-white rounded-full"
          src={imageUrl ?? ''}
          alt={tag ?? 'U'}
        />
        <h1 className="mt-2 text-center">{tag} just joined the server</h1>
        <p className="text-center text-gray-500">Member #{count}</p>
      </div>
    </div>
  )
}

export default WelcomeMessage
