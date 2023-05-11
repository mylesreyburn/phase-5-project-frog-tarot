import { Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import EditPostForm from "./EditPostForm";
import Navbar from "./Navbar";
import DeleteButton from "./DeleteButton";
import PostCommentForm from "./PostCommentForm";
import React from "react";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function OuijaPost( { } ){

    const [post, setPost] = useState([])
    const [postUser, setPostUser] = useState([])
    const [postComments, setPostComments] = useState([])
    const { id } = useParams()

    const [isHidden, setIsHidden] = useState(true)

    const currentUser = useRecoilValue(userAtom)

    function toggleVisibilityOn(){
        console.log("weed")
        console.log(post.id)
        if(post.user_id === (currentUser ? currentUser.id : null)){
            setIsHidden(false)
        }
    }

    function toggleVisibilityOff(){
        setIsHidden(true)
    }

    useEffect(() => {
        fetch(`http://localhost:5555/post/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setPost(json)
            setPostUser(json.user)
            setPostComments(json.comments)
        })
        .then(() => toggleVisibilityOn())
        }, []);

    return (
        <div className="post">
            <Navbar/>
            <h2>{post.title}</h2>
            <h3>{postUser.username}</h3>
            <h4>content: {post.content}</h4>
            {isHidden ? <></> : <EditPostForm postId={post.id} userId={postUser.id} />}
            {isHidden ? <></> : <DeleteButton type="Post" itemId={post.id}/>}
            <PostCommentForm postId={id} />
            {postComments.map( (comment) => {
                return <Comment key={comment.id} userId={comment.user.id} content={comment.content} userName={comment.user.username} commentId={comment.id}/>
            })}
        </div>
    )
}

export default OuijaPost