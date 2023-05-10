import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCommentForm from "./EditCommentForm";
import DeleteButton from "./DeleteButton";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function Comment( { userId, content, userName, commentId } ){

    const [isHidden, setIsHidden] = useState(true)

    const currentUser = useRecoilValue(userAtom)

    // TODO:
    // MOUSEOVER FUNCTIONALITY
    // CHECKS userId AND, IF IT'S THE SAME AS session["u_token"], REVEALS BUTTON WHICH THEN
    // REVEALS EditCommentForm
    function toggleVisibility(){
        if(userId === (currentUser ? currentUser.id : null)){
            setIsHidden(false)
        }

    }

    return (
        <div onMouseOver={toggleVisibility}>
            <h4>{userName}</h4>
            <p>{content}</p>
            {isHidden ? <></> : <DeleteButton type="Comment" itemId={commentId}/>}
            {isHidden ? <></> : <EditCommentForm commentId={commentId} userId={userId} />}
        </div>
    )
}

export default Comment