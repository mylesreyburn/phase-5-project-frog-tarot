import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCommentForm from "./EditCommentForm";

function Comment( { userId, content, userName, commentId } ){

    const [isHidden, setIsHidden] = useState(true)

    // TODO:
    // MOUSEOVER FUNCTIONALITY
    // CHECKS userId AND, IF IT'S THE SAME AS session["u_token"], REVEALS BUTTON WHICH THEN
    // REVEALS EditCommentForm
    function toggleVisibility(){

    }

    return (
        <div>
            <h4>{userName}</h4>
            <p>{content}</p>
            <EditCommentForm commentId={commentId} userId={userId} />
        </div>
    )
}

export default Comment