import { Switch, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import EditPostForm from "./EditPostForm";
import Navbar from "./Navbar";

function OuijaPost( { } ){

    const [post, setPost] = useState([])
    const [postUser, setPostUser] = useState([])
    const [postComments, setPostComments] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:5555/post/${id}`)
        .then((response) => response.json())
        .then((json) => {
            setPost(json)
            setPostUser(json.user)
            setPostComments(json.comments)
        })
        }, []);

    return (
        <div>
            <Navbar/>
            <h2>{post.title}</h2>
            <h3>{postUser.username}</h3>
            <h4>content: {post.content}</h4>
            <EditPostForm postId={post.id} userId={postUser.id} />
            {postComments.map( (comment) => {
                return <Comment key={comment.id} userId={comment.user.id} content={comment.content} userName={comment.user.username} commentId={comment.id}/>
            })}
        </div>
    )
}

export default OuijaPost