import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function EditCommentForm( { commentId, userId } ){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
            content: ""
        },
   
        onSubmit: values => {
            
            if(isUserLoggedIn && currentUser.id === userId){
                fetch(`http://localhost:5555/comment/${commentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => window.location.reload(false))
            }
            else {
                window.alert("Must be logged in as the correct user!")
            }
        },
      });

      return(
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="content">Edit Comment</label>
            <br></br>
            <textarea
                id="commentContent"
                name="content"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.content}
            />
            <br></br>
        <button type="submit">Submit Changes</button>
       </form>
    )

}

export default EditCommentForm