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
            content: `${name} \n ${description} \n ${fortune}`,
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
                    return {
                        
                    }
                }
            })
            }
            else {
                window.alert("Must be logged in!")
            }},
        });

      return(
        <div>
            <form onSubmit={formik.handleSubmit}>
            <label>New Post</label>
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
       </div>
    )
}

export default TarotPostForm