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

    useEffect(() => {
        fetch("http://localhost:5555/posts")
        .then((response) => response.json())
        .then((json) => setPosts(json))
    }, []);

    

    return (
        <div>
            <Navbar/>
            <h1>The Ouija Boards</h1>
                {posts.map((post) => {
                return <OuijaPostCard key={post.id} post={post}/>
            })}
            <OuijaForm/>
        </div>
    )
}

export default OuijaHome