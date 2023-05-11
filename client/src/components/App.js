import { Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import Navbar from "./Navbar"
import Tarot from "./Tarot"
import OuijaHome from "./OuijaHome"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import TarotPage from "./TarotPage"
import OuijaPost from "./OuijaPost";
import Logout from "./Logout";
import UserPage from "./UserPage";

import "./style.css"

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

import BrowserRouter from 'react-router-dom/BrowserRouter'



function App() {

    const history = useHistory()
    const [users, setUsers] = useState()
    const [posts, setPosts] = useState([])
    const [tarots, setTarots] = useState([])
    const [comments, setComments] = useState([])
    
    const loggedInUser = useRecoilValue(userAtom)
    const isLoggedIn = useRecoilValue(loggedInAtom)

    
    const { id } = useParams()

    useEffect(() => {
        fetch("http://localhost:5555/users")
        .then((response) => response.json())
        .then((json) => setUsers(json));

        fetch("http://localhost:5555/comments")
        .then((response) => response.json())
        .then((json) => setComments(json));

        fetch("http://localhost:5555/posts")
        .then((response) => response.json())
        .then((json) => setPosts(json))

        fetch("http://localhost:5555/tarots")
        .then((response) => response.json())
        .then((json) => setTarots(json))
    }, []);

    return (
    
      <div className="App" id="App">
        <div id="homeNav">
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/tarot">
                <TarotPage tarots={tarots}/>
            </Route>
            <Route exact path="/ouija">
                <OuijaHome />
            </Route>
            <Route exact path="/ouija/:id">
                <OuijaPost />
            </Route>
            <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <Signup/>
            </Route>
            <Route exact path="/user/:id">
                <UserPage />
            </Route>
        </Switch>
        </div>
      </div>
    );
  }

  export default App