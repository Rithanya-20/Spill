import React from 'react'
import './Card.css'
function Card({userName, comment}) {
  return (
    <div>
        <div className='comment-wrapper'>
            <p>{userName}</p>
            <p>{comment}</p>

        </div>
        

    </div>
  )
}

export default Card