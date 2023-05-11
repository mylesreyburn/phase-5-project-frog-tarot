import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function TarotCommentForm( { tarotId } ){

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const formik = useFormik({

        initialValues: {
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
        .then(() => window.location.reload(false))
        }
        else {
            window.alert("Must be logged in!")
        }
        },
   
      });


    return(
        <form onSubmit={formik.handleSubmit} id="tarotCommentForm">
        <label id="tarotCommentLabel" htmlFor="content">New Comment</label>
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

export default TarotCommentForm