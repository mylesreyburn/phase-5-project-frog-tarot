import { Switch, Route, Link } from "react-router-dom";



function OuijaPostCard( { post } ){

    function clickTest(){
        console.log(post.id)
    }

    return (
        <tr>
            <td>
                {post.user.username}
            </td>
            <td>
                <a href={`http://localhost:4000/ouija/${post.id}`}>
                    {post.title}
                </a>
            </td>
            <td>
                {post.created_at}
            </td>
        </tr>
    )
}

export default OuijaPostCard