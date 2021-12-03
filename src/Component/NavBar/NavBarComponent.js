import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { Container, Navbar } from "react-bootstrap";

class NavBarComponent extends Component {

    state = {
        selectedTab: ''
    }

    render() {
        return (
            <Navbar bg="dark">
                <Container>
                <Nav.Link href="/socmed-client/login">Login</Nav.Link>
                </Container>
            </Navbar>

        )
    }

}

export default NavBarComponent