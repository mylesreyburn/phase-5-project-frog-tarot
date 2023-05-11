import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import EditCommentForm from "./EditCommentForm";
import DeleteButton from "./DeleteButton";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";


function Comment( { userId, content, userName, commentId } ){
    console.log(userId)

    const [isHidden, setIsHidden] = useState(true)

    const currentUser = useRecoilValue(userAtom)

    function toggleVisibilityOn(){
        if(userId === (currentUser ? currentUser.id : null)){
            setIsHidden(false)
        }
    }

    function toggleVisibilityOff(){
        setIsHidden(true)
    }

    // onMouseOut={toggleVisibilityOff}

    return (
        <div onMouseOver={toggleVisibilityOn} className="comment" >
            <h4 id="commentUsername">{userName}</h4>
            <p id="commentText">{content}</p>
            {isHidden ? <></> : <DeleteButton type="Comment" itemId={commentId}/>}
            {isHidden ? <></> : <EditCommentForm commentId={commentId} userId={userId} />}
        </div>
    )
}

export default Comment