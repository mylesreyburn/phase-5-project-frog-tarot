import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function TarotCommentForm( { tarotId } ){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
            title: "",
            content: "",
            user_id: currentUser ? currentUser.id : null,
            tarot_id: tarotId
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
        .then(json => console.log(json))
   
        }
        else {
            window.alert("Must be logged in!")
        }
        },
   
      });


    return(
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="content">New Comment</label>
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