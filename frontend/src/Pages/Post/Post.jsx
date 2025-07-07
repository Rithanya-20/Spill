import React, { useEffect, useState } from 'react'
import './Post.css'
import { IoMdHeartEmpty } from "react-icons/io";
import { FcLike} from "react-icons/fc";
import {AiOutlineDislike, AiTwotoneDislike} from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { getFromPosts } from '../../app/feature/postSlice';
import { updatePost } from '../../app/feature/postSlice';
import Comments from '../Comments/Comments';
import { getActivity, postActivity } from '../../app/feature/activitySlice';
import { updateActivity } from '../../app/feature/activitySlice';
import { BiCommentDots } from "react-icons/bi";
import { addComment } from '../../app/feature/postSlice';
import Card from '../Comments/Card';
import Button from '../../Components/Button/Button';


function Post() {
 const activity = useSelector(state => state.activities.activities)
 const user = useSelector(state => state.users)

 const posts_json = useSelector(state => state.posts.posts)
 const dispatch = useDispatch()

//  const [likeMe, setLikeMe] = useState({})
 
 const [commentInputs, setCommentInputs] = useState({})
 const [toggle, setToggle] = useState({})

// console.log(activity);
 
const userIndex = activity?.findIndex(u => u.userId === user.id)
// console.log('User index: '+ userIndex);

const userPosts = userIndex !== -1 && activity[userIndex]?.posts ? activity[userIndex].posts : [];

useEffect(()=> {
    
    dispatch(getFromPosts())
    dispatch(getActivity())   
    // console.log('Before dispatch to postAcitivity' +user.id);
   
    if(user?.id){
        dispatch(postActivity({
            userId: user.id,    
        }))
    }
    

}, [dispatch, user?.id])





//  console.log(posts_json);
 
 
// useEffect(()=>{ 
//     // console.log("likeMe object" + JSON.stringify(likeMe))
// }, [likeMe])
 

 const toggleComments = (postId) => {
    const existingPost = Object.hasOwn(toggle, postId)
    // let comment = likeMe[postId] ?? false

    if(!existingPost){
        setToggle(p => (
            {
                ...p,
                [postId]: p[postId] !== undefined ? !p[postId] : true 
            }
        ))
    }
    else{
        setToggle(p => ({
            ...p,
            [postId] : !p[postId]
        }))
    }
  
 }

 const handleLikeTrue = (post) => {
    const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: false,
                like: 0,
                isDislike: false,
                dislike: 0,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, like: post.like - 1}
     dispatch(updatePost(updatePost1))
    

     
 }

 const handleGoingToBeDisliked = (post) => {
      const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: false,
                like: 0,
                isDislike: true,
                dislike: 1,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, like: post.like - 1, dislike: post.dislike + 1}
     dispatch(updatePost(updatePost1))
 }

  const handleLiked = (post) => {
      const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: true,
                like: 1,
                isDislike: false,
                dislike: 0,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, like: post.like + 1}
     dispatch(updatePost(updatePost1))
 }



 const handleDisLikeTrue = (post) => {
    const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: false,
                like: 0,
                isDislike: false,
                dislike: 0,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, dislike: post.dislike - 1}
     dispatch(updatePost(updatePost1))
    

     
 }

 const handleGoingToBeLiked = (post) => {
      const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: true,
                like: 1,
                isDislike: false,
                dislike: 0,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, like: post.like + 1, dislike: post.dislike - 1}
     dispatch(updatePost(updatePost1))
 }

 const handleDisLiked = (post) => {
      const updateActivity1 = {userId: user.id, 
        posts: [
            {
                postId: post.postId,
                isLike: false,
                like: 0,
                isDislike: true,
                dislike: 1,
                
            }
        ]
    }
    dispatch(updateActivity(updateActivity1))

     const updatePost1 = {postId: post.postId, dislike: post.dislike + 1}
     dispatch(updatePost(updatePost1))
 }



 const addComments = (postId) => {
    const commentTemplate = {
      userId: user.id,
      commentedBy: user.name,
      postId: postId,
      comment: commentInputs[postId]

    }
    // setIsComment("")
    setCommentInputs(prev => ({...prev, [postId]:""}))

    dispatch(addComment(commentTemplate))
     .then(() => {
      dispatch(getFromPosts()); // ✅ force refresh from backend
    });
    // console.log(commentTemplate);
    

  }


  return (
    
        <div className='post-wrapper' >
            {
                Array.from(posts_json)?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
                    <div className='post-box'>
                        <p className='post-title'>{post.title}</p>
                        <p className='post-username'><span >{post.userName} </span><span>{post.date}</span></p>
                        <p className='post-post'>{post.post}</p>
                    <div className='post-bottom'>    
                     <div className='post-count'>
                       
                       {
                        // console.log('Post like? '+userPosts[userPosts.findIndex(p => p.postId === post.postId)]?.isLike)

                       }
                        
                        {
            user.name !== "" ? (<>

            {                      
                       

                        userPosts[userPosts.findIndex(p => p.postId === post.postId)]?.isLike ? 
                        <div className='post-like'> 
                            <FcLike onClick={() => handleLikeTrue(post)} /> 
                            <span>{post.like}</span> </div>
                            : 
                            <div className='post-like'>
                            <IoMdHeartEmpty onClick={() => 
                                 { 

                            if(userPosts[userPosts.findIndex(p => p.postId === post.postId)]?.isDislike) {
                                handleGoingToBeLiked(post)
                            }
                            else{
                                // handleLike(post)
                                handleLiked(post)
                            }
                            
                           
                           }
                                
                                
                               
                                }/>
                            <span>{post.like}</span>
                            </div>
                        }
                         
                        {
                        
                        userPosts[userPosts.findIndex(p => p.postId === post.postId)]?.isDislike ? 
                        
                        <div className='post-like'> 
                        <AiTwotoneDislike onClick={() => handleDisLikeTrue(post)} />
                        <span>{post.dislike}</span> </div>
                        : 
                        <div className='post-like'>
                        <AiOutlineDislike onClick={() => 
                           { 

                            if(userPosts[userPosts.findIndex(p => p.postId === post.postId)]?.isLike) {
                                handleGoingToBeDisliked(post)
                            }
                            else{
                                //  handleDisLike(post)
                                handleDisLiked(post)
                            }
                            
                           
                           }
                            
                            } />
                        <span>{post.dislike}</span> </div> 
                        
                        }
            
            
                              </>) : (<>
                              
                              
                              
                            <div className='post-like'>
                            <IoMdHeartEmpty style={{cursor: 'not-allowed'}} title="Sign In to Like the post"/>
                            <span>{post.like}</span>
                            </div>
                        
                         
                        
                        <div className='post-like'>
                        <AiOutlineDislike style={{cursor: 'not-allowed'}} title="Sign In to Dislike the post"/>
                        <span>{post.dislike}</span> </div> 
                        
                             
                              </>) 
                        }

                        

                        <div className='post-like'>
                            <BiCommentDots onClick={() => toggleComments(post.postId)}/>
                            <span>{post.comments.length}</span>
                        </div>
                        
                      </div>  
                    

                    </div>    
                    {/* <Comments comments = {post.comments} postId = {post.postId} index={index}/>  */}
                    
                     <div >
      
      
      <div className={`comment-section ${toggle[post.postId]}`}>
    <span className='comment-wrapper comments'>{post.comments.length} Comments </span>

      {
        
       Array.isArray(post.comments)
    ? post.comments.map((c) => 
    // <Card key={i} {...c} />
    <div className='comment-wrapper'>
            <p className='comment-text'>{c.commentedBy}</p>
            <p className='comment-text'>{c.comment}</p>

        </div>

)
    : <p>No comments available</p>
      }
      {
        user.name !== '' ? (
            <div className='add-comment-div'>
      <input 
      className='comment-input' 
      placeholder='Add a comment'
      value={commentInputs[post.postId] || ""}
      onChange={e => setCommentInputs({
        ...commentInputs,
        [post.postId]:e.target.value
      })} />
      <Button onClick={() => addComments(post.postId)} >Add</Button>
      </div>
        ) : (
            <></>
        )
      }
      
      </div>
      </div>
                    
                    </div>
                ))
            }
        </div>
    
  )
}

export default Post