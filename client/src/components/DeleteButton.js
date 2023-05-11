import { Switch, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";
import { useHistory } from "react-router-dom";

function DeleteButton( { type, itemId } ){

    const history = useHistory();

    const currentUser = useRecoilValue(userAtom)
    const isUserLoggedIn = useRecoilValue(loggedInAtom) 

    const setLoggedInUser = useSetRecoilState(userAtom)
    const setLoggedInBool = useSetRecoilState(loggedInAtom)

    const typeToDelete = () => {
        if(type === "User"){
            return "user"
        }
        else if(type === "Post"){
            return "post"
        }
        else if(type === "Comment") {
            return "comment"
        }
        else {
            return "error"
        }
    }

    function deleteThing(){
        if(isUserLoggedIn){
            fetch(`http://localhost:5555/${typeToDelete()}/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((response) => {
                if (response.ok){
                    response.json()
                    .then((json) => {
                        window.alert(json.success)
                    })
                    .then(() => {
                        if (typeToDelete() === "user"){
                            fetch("http://localhost:5555/log_out")
                            .then(response => {
                                if (response.ok){
                                    return response.json().then(json => {
                                        setLoggedInUser(null)
                                        setLoggedInBool(false)
                                    }).then(() => {
                                            history.push("/")
                                        })
                                }
                                else {
                                    return {
                                        
                                    }
                                }
                            })
                        }
                    })
                    .then(() => {
                        if (typeToDelete() === "post"){
                            history.push("/ouija")
                        }
                        else if (typeToDelete() === "comment"){
                            window.location.reload(false)
                        }
                    })
                }
                else{
                    response.json()
                    .then((json) => {
                        window.alert(json.error)
                    })
                }
            })

        }
    }

    return(
        <button id="deleteButton" onClick={deleteThing}>Delete {type}</button>
    )
}

export default DeleteButton