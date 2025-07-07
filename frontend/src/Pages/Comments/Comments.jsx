import React, { useEffect, useState } from 'react'
import './Comments.css'
import Card from './Card';
import Button from '../../Components/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, getFromPosts } from '../../app/feature/postSlice';

function Comments({comments, postId, index}) {
  // console.log(comments);
  const [isComment, setIsComment] = useState("")
  const user = useSelector(state => state.users)
  const posts = useSelector(state => state.posts.posts)
  const dispatch = useDispatch()
 
  // console.log('Post: ' + JSON.stringify(posts[index]));

  // const actualPost = posts[index]
  

  const addComments = () => {
    const commentTemplate = {
      userId: user.id,
      userName: user.name,
      postId: postId,
      comment: isComment

    }
    setIsComment("")

    dispatch(addComment(commentTemplate))
    // console.log(commentTemplate);
    

  }

  useEffect(() => {getFromPosts()}, [posts[index].comments])
  return (
    <div >
      
      <span className='comments'>{comments.length} Comments </span>
      
      <div className='comment-section'>
      {
        comments?.map((c) => (
          
           <Card {...c}/>
        ))
      }
      <div className='add-comment-div'>
      <input 
      className='comment-input' 
      placeholder='Add a comment'
      value={isComment || ""}
      onChange={e => setIsComment(e.target.value)} />
      <Button onClick={addComments}>Add</Button>
      </div>
      </div>
      </div>
  )
}

export default Comments