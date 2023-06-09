import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./components/App";

ReactDOM.render(

    <Router basename={process.env.PUBLIC_URL}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </Router>, document.getElementById("root"));