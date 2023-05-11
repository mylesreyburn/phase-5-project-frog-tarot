import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { useFormik } from "formik";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function Signup(){

    const setLoggedInUser = useSetRecoilState(userAtom)
    const setLoggedInBool = useSetRecoilState(loggedInAtom)

    const formik = useFormik({

        initialValues: {
            username: "",
            email: "",
            password: "",
        },
   
        onSubmit: values => {
            fetch(`http://localhost:5555/sign_up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if (response.ok){
                    response.json().then((json) => {
                        setLoggedInUser(json)
                        setLoggedInBool(true)
                    })
                }
                else {
                    return {

                    }
                }
            })
            
        },
      });

    return (
        <div className="signUp">
            <Navbar/>
            <div id="signUp">
            <h1 id="signUpHeader">Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
            <br></br>
            <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
            <br></br>
            <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            <br></br>
            <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            <br></br>
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Signup