import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import OuijaPostCard from "./OuijaPostCard"
import OuijaForm from "./OuijaHomeNewPostForm";
import Navbar from "./Navbar";

import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";

function OuijaHome( ){

    const [posts, setPosts] = useState([])

    const loggedInUser = useRecoilValue(userAtom)
    const [displayForm, setDisplayForm] = useState(false)

    function toggleDisplayForm(){
        if(displayForm){
            setDisplayForm(false)
        }
        else{
            setDisplayForm(true)
        }
    }

    useEffect(() => {
        fetch("http://localhost:5555/posts")
        .then((response) => response.json())
        .then((json) => setPosts(json))
    }, []);

    

    return (
        <div>
            <Navbar/>
            <div className="ouijaHome" id="ouijaHome">
            <h1>The Ouija Boards</h1>
            <div className="newPostForm">
                <button id="newOuijaPostButton" onClick={toggleDisplayForm}>Make New Post</button>
                {displayForm ? <OuijaForm/> : <></>}
            </div>
            <table className="postsTable">
                <tr className="postsHeader" id="postsHeader">
                    <th>User</th>
                    <th>Title</th>
                    <th>Posted At</th>
                </tr>
                <tbody>
                    {posts.map((post) => {
                    return <OuijaPostCard key={post.id} post={post}/>
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default OuijaHome