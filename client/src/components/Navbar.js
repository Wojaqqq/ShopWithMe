import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useAuth, logout} from "../auth"

const LoggedInLinks = () => {
    return (
        <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create_shopping_list">Create Shopping list</Nav.Link>
            <Nav.Link href="#" onClick={()=>{logout()}}>Log Out</Nav.Link>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
        </>
    )
}
const NavBar = () => {

    const [logged] = useAuth()

    return (

        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home">ShopWithMe</Navbar.Brand>
                <Nav className="me-auto">
                    {logged?<LoggedInLinks/>:<LoggedOutLinks/>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar