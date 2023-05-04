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
        <div>
            <Navbar/>
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
            <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup