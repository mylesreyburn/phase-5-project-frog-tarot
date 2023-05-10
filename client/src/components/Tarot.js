import { Switch, Route } from "react-router-dom";
import Comment from "./Comment";
import TarotPostForm from "./TarotPostForm";
import TarotEmail from "./SendTarotEmail";
import TarotCommentForm from "./TarotCommentForm";

function Tarot( { id, name, imageUrl, description, fortune, luckyNumbers, comments } ){

    return (
        <div className="tarotBody">
            <div id="tarotCard">
                <h2 id="tarotName">{name}</h2>
                <img src={imageUrl} id="tarotImage"/>
                <p id="tarotDescription">{description}</p>
                <p id="tarotFortune">{fortune}</p>
                <p id="luckyNumbers">Lucky Numbers: {luckyNumbers}</p>
            </div>
            <TarotPostForm name={name} description={description} fortune={fortune} />
            <TarotEmail name={name} imageUrl={imageUrl} description={description} fortune={fortune}/>
            <TarotCommentForm tarotId={id}/>
            <div id="comments">
                {comments.map((comment) => {
                return (<Comment 
                        key={comment.id}
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