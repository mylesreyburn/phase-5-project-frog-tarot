import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { userAtom, loggedInAtom } from "./lib/atoms";
import DeleteButton from "./DeleteButton";
import { useEffect } from "react";
import Navbar from "./Navbar";

function UserPage(){

    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        console.log(id)
        fetch(`http://localhost:5555/user/${id}`, {
            method: "GET"
        }
        )
        .then((response) => response.json())
        .then((json) => setUser(json))
        }, [])

    return(
        <div>
            <Navbar />
            <h1 id="userHeader">{user ? user.username : null}'s Page</h1>
            <h1 id="userBio">Bio: {user ? user.bio : null}</h1>
            <DeleteButton type={"User"} itemId={id}/>
        </div>
    )
}

export default UserPage