import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import SingleShoppingList from "./SingleShoppingList";

const LoggedinHome = () => {
    const [lists, setLists] = useState([])

    useEffect(
        () => {
            fetch('/shopping_list/shopping_lists')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setLists(data)
                })
                .catch(err => console.log(err))
        }, []
    )

    return (
        <div className="containerClass">
            <br/>
            <h1>All Shopping Lists</h1>
            <br/>
            {
                lists.map(
                    (list) => (
                        <SingleShoppingList title={list.title} description={list.description}/>
                    )
                )
            }
        </div>
    )
}
const LoggedOutHome = () => {
    return (
        <div className="containerClass">
            <h1 className="heading">Welcome to ShopWithMe</h1>
            <br/>
            <Link to='signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}

const HomePage = () => {

    const [logged] = useAuth()
    return (
        <div>
            {logged ? <LoggedinHome/> : <LoggedOutHome/>}
        </div>
    )
}

export default HomePage