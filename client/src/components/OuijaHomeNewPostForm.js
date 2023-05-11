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
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
            <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.title}
            />
        <label htmlFor="content">Content</label>
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

export default OuijaForm