import { Switch, Route } from "react-router-dom";
import { useFormik } from 'formik';
import Navbar from "./Navbar";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";
// import * as yup from 'yup'

// useSetRecoilState to set value
// useRecoilState to get whole state functionality
// 

function Logout(){

    const setLoggedInUser = useSetRecoilState(userAtom)
    const setLoggedInBool = useSetRecoilState(loggedInAtom)

    function logOutButton(){
        fetch("http://localhost:5555/log_out")
        .then(response => {
            if (response.ok){
                return response.json().then(json => {
                    setLoggedInUser(null)
                    setLoggedInBool(false)
                })
            }
            else {
                return {
                    
                }
            }
        })
    }

    return (
        <div>
            <button onClick={logOutButton}>Log Out</button>
        </div>
    )
}

export default Logout