import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from "./components/Navbar"
import './styles/main.css'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import HomePage from "./components/Home";
import SignUpPage from "./components/SignUp";
import LoginPage from "./components/Login";
import CreateShoppingListPage from "./components/CreateShoppingList";


const App = () => {


    return (
        // <h1>Hello from index</h1>
        <Router>
            <NavBar/>
            <div className="container">
                <Routes>

                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/signup" element={<SignUpPage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/create_shopping_list" element={<CreateShoppingListPage/>}></Route>

                </Routes>
            </div>
        </Router>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))
