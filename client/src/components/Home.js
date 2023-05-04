import { Switch, Route, Link } from "react-router-dom";
import Logout from "./Logout";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function Home(){

    const loggedInUser = useRecoilValue(userAtom)
    const userLoggedIn = useRecoilValue(loggedInAtom)

    return (
        <div>
            <div className="directory">
                <Link to = "/tarot">
                    <button id="tarotButton"> Frog Tarot </button>
                </Link>
                <Link to = "/ouija">
                    <button id="ouijaButton"> Ouija Boards </button>
                </Link>
                    {
                        userLoggedIn ? 
                        <div>
                        <Link to ={`/user/${loggedInUser.id}`}>
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
            <div className="home">
                <p>1</p>
            </div>
        </div>
    )
}

export default Home