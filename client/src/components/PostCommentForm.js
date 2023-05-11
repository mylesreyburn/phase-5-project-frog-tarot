import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function PostCommentForm( { postId } ){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
            content: "",
            user_id: currentUser ? currentUser.id : null,
            post_id: postId
        },
   
        onSubmit: values => {
        if (isUserLoggedIn){
        fetch("http://localhost:5555/comment/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(json => { 
            console.log(json) 
            console.log(values)
        })
        .then(() => window.location.reload(false))
   
        }
        else {
            window.alert("Must be logged in!")
        }
        },
   
      });


    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="content">New Comment</label>
            <br></br>
            <textarea
                id="content"
                name="content"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.content}
            />
            <br></br>
        <button className="commentButton" type="submit">Submit Comment</button>
       </form>
       
    )
}

export default PostCommentForm