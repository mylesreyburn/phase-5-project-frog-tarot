import { Switch, Route } from "react-router-dom";
import Comment from "./Comment";
import TarotPostForm from "./TarotPostForm";

function Tarot( { name, imageUrl, description, fortune, comments } ){
    return (
        <div>
            <p>{name}</p>
            <img src={imageUrl}/>
            <p>{description}</p>
            <p>{fortune}</p>
            <TarotPostForm name={name} description={description} fortune={fortune} />
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