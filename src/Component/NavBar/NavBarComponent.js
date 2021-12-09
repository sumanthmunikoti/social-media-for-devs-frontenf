import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Container, Navbar } from "react-bootstrap";
import {Link} from 'react-router-dom'

class NavBarComponent extends Component {

    state = {
        selectedTab: ''
    }

    render() {
        return (
            <Navbar bg="dark">
                <Container>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/profiles"}>Devs</Link>
                    <Link to={"/posts"}>Posts</Link>
                </Container>
            </Navbar>

        )
    }

}

export default NavBarComponent