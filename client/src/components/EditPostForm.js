import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function EditPostForm( { postId, userId } ){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
            content: ""
        },
   
        onSubmit: values => {
            
            if(isUserLoggedIn && currentUser.id === userId){
                fetch(`http://localhost:5555/post/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
                })
                .then(response => response.json())
                .then(json => console.log(json))
                .then()
            }
            else {
                window.alert("Must be logged in as the correct user!")
            }
        },
      });

      return(
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="content">Post Content</label>
            <input
                id="content"
                name="content"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.content}
            />
        <button type="submit">Submit</button>
       </form>
    )

}

export default EditPostForm