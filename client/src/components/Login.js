import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import Navbar from "./Navbar";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function Login(){

    const setLoggedInUser = useSetRecoilState(userAtom)
    const setLoggedInBool = useSetRecoilState(loggedInAtom)

    const formik = useFormik({

        initialValues: {
            email: "",
            password: "",
        },
   
        onSubmit: values => {
            fetch(`http://localhost:5555/log_in`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then(response => {
                if (response.ok){
                    return response.json().then(json => {
                        setLoggedInUser(json)
                        setLoggedInBool(true)
                    })
                }
                else {
                    window.alert("Encountered an error when signing in, likely an invalid username or password. \nPlease try again.")
                }
            })
            
        },
      });

      return(
        <div className="login">
            <Navbar />
            <div id="login">
            <h1 id="loginHeader">Log In</h1>
            <br></br>
            <form onSubmit={formik.handleSubmit} id="loginForm">
            <label htmlFor="email">Email</label>
            <br></br>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            <br></br>
            <label htmlFor="password">Password</label>
            <br></br>
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

export default Login