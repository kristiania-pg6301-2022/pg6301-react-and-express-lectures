import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

function FrontPage() {
    return <div>
        <h1>Front page</h1>
        <ul>
            <li><Link to={"/login"}>Login</Link></li>
        </ul>
    </div>;
}

function Login() {
    return <div>
        <h1>Login</h1>
        <form action={"/login"}>
            <li><Link to={"/login"}>Login</Link></li>
        </form>
    </div>;
}

function Application() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(<Application/>, document.getElementById("app"));
