import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import Comment from "./Comment";
import TarotPostForm from "./TarotPostForm";
import TarotEmail from "./SendTarotEmail";
import TarotCommentForm from "./TarotCommentForm";

function Tarot( { id, name, imageUrl, description, fortune, luckyNumbers, comments } ){

    const [visible, setVisible] = useState(false)

    function revealPost(){
        setVisible(true)
    }

    return (
        <div className="tarotBody">
            <div id="tarotCard">
                <h2 id="tarotName">{name}</h2>
                <img src={imageUrl} id="tarotImage"/>
                <p id="tarotDescription">{description}</p>
                <h2>Your Fortune</h2>
                <p id="tarotFortune">{fortune}</p>
                <h2>Lucky Numbers</h2>
                <p id="luckyNumbers">{luckyNumbers}</p>
            </div>
            <button id="revealForm" onClick={revealPost}>Share Results</button>
            <br></br>
            {visible ? <TarotPostForm name={name} description={description} fortune={fortune} /> : <></>}
            <TarotEmail name={name} imageUrl={imageUrl} description={description} fortune={fortune}/>
            <TarotCommentForm tarotId={id}/>
            <div id="comments">
                {comments.map((comment) => {
                return (<Comment 
                        key={comment.id}
                        userId={comment.user_id}
                        commentId={comment.id}
                        content={comment.content}
                        userName={comment.user.username}
                    />)
                })}
            </div>
        </div>
    )
}

export default Tarot