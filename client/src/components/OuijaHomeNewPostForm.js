import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function OuijaForm(){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
            title: "",
            content: "",
            user_id: currentUser ? currentUser.id : null,
        },
   
        onSubmit: values => {
        if (isUserLoggedIn){
        fetch("http://localhost:5555/post/new", {
            method: "POST",
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
            window.alert("Must be logged in!")
        }
        },
   
      });


    return(
        <form onSubmit={formik.handleSubmit} class="newPostForm">
        <h2 id="formTitle">New Post</h2>
        <label htmlFor="title" id="titleHeader">Title</label>
        <br></br>
            <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
            />
        <br></br>
        <label htmlFor="content" id="contentHeader">Content</label>
        <br></br>
            <textarea
                id="content"
                name="content"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.content}
            />
        <br></br>
        <button type="submit">Submit</button>
       </form>
    )
}

export default OuijaForm