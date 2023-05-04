import { Switch, Route, Link } from "react-router-dom";
import Tarot from "./Tarot"
import OuijaHome from "./OuijaHome"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Logout from "./Logout";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function Navbar(){

    const userLoggedIn = useRecoilValue(loggedInAtom)
    const loggedInUser = useRecoilValue(userAtom)

    return (
        <div className="navbar">
            <Link to = "/">
                <button id="homeButton"> Home </button>
            </Link>
            <Link to = "/tarot">
                <button id="tarotButton"> Frog Tarot </button>
            </Link>
            <Link to = "/ouija">
                <button id="ouijaButton" > Ouija Boards </button>
            </Link>
            {
                userLoggedIn ? 
                <div>
                <Link to ={loggedInUser ? `/user/${loggedInUser.id}` : `/`}>
                    <button id="userPageButton"> Your Page </button>
                </Link>
                <Logout />
                </div>
                :
                <div>
                <Link to = "/login">
                    <button id="loginButton"> Log In </button>
                </Link>
                <Link to = "/signup">
                    <button id="signupButton"> Sign Up </button>
                </Link>
                </div>
            }  
        </div>
    )
}

export default Navbar