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
                    return {
                        
                    }
                }
            })
            
        },
      });

      return(
        <div>
            <Navbar />
            <form onSubmit={formik.handleSubmit}>
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

export default Login