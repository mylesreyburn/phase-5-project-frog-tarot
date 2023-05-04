
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom, loggedInAtom } from "./lib/atoms";
import { useRef } from "react";
import emailjs from '@emailjs/browser';


function TarotEmail( { name, imageUrl, description, fortune } ){

    const currentUser = useRecoilValue(userAtom)
    const loggedIn = useRecoilValue(loggedInAtom)

    const emailObject = {
        to_name: loggedIn ? currentUser.username : null,
        to_email: loggedIn ? currentUser.email : null,
        message: `${name} \n ${imageUrl} \n ${description} \n ${fortune}`
    }

    function sendEmail(){

        if(loggedIn){
            emailjs.send('service_borxuld', 'template_ug2fyku', emailObject, 'KzEAESR5sONgz4lCY')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }
        else {
            window.alert("Must be logged in!")
        }
    }
    return(
        <button id="sendEmailButton" onClick={sendEmail}>Email Tarot</button>
    )
}

export default TarotEmail