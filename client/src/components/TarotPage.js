import { Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tarot from "./Tarot";
import Comment from "./Comment";

function TarotPage( { tarots } ){

    const [randTarot, setRandTarot] = useState(0)

    function getRandomTarot(){
        setRandTarot(Math.floor(Math.random() * 23) + 1)
    }

    let currentTarot = []

    if (randTarot !== 0){
        currentTarot = tarots.filter((tarot) => {
            return tarot.id === randTarot
        })
    }

    return (
        <div>
            <Navbar/>
            <h1>WEED Weed weeeed</h1>
            <button onClick={getRandomTarot}>GENERATE TAROT</button>
            {currentTarot.map((tarot) => {
                    return( 
                        <div>
                            <Tarot 
                                key={tarot.id}
                                name={tarot.name}
                                imageUrl={tarot.image_url}
                                description={tarot.description}
                                fortune={tarot.fortune}
                                comments={tarot.comments.filter((comment) =>{
                                    return comment.tarot_id === tarot.id
                                })}
                            />
                        </div>
                    )
                })}
        </div>
    )
}

export default TarotPage