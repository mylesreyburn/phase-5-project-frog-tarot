import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function TarotPostForm( { name, imageUrl, description, fortune } ){

    const loggedInUser = useRecoilValue(userAtom)
    const userLoggedIn = useRecoilValue(loggedInAtom)

    const formik = useFormik({

        initialValues: {
            user_id: loggedInUser ? loggedInUser.id : null, 
            title: userLoggedIn ? `${loggedInUser.username}'s Tarot Reading` : "",
            content: `Tarot Name: ${name} \n Description: ${description} \n Fortune: ${fortune}`,
        },
   
        onSubmit: values => {
            if (userLoggedIn) {
            fetch(`http://localhost:5555/post/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if (response.ok){
                    return response.json()
                }
                else {
                    window.alert("Error creating post.")
                }
            })
            .then(() => window.location.reload(false))
            }
            else {
                window.alert("Must be logged in!")
            }},
        });

      return(
        <div className="tarotPostForm">
            <form onSubmit={formik.handleSubmit}>
            <label>Post Your Results!</label>
            <br></br>
            <label htmlFor="title">Title</label>
            <br></br>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
            <br></br>
            <label htmlFor="content">Content</label>
            <br></br>
                <textarea
                    id="postContent"
                    name="content"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                />
            <br></br>
            <button type="submit">Post Results</button>
            </form>
       </div>
    )
}

export default TarotPostForm