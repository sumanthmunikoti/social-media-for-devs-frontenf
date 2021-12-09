import { Component } from "react";
import { API_URL } from "../common/constants";

export default class NeoPostItem extends Component {

    state = {
        currentUser: {}
    }

    componentDidMount() {
        fetch(`${API_URL}/profile/me`, {        
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.userId
            })
        })
            .then(response => response.json())
            .then(results => this.setState({
                currentUser: results.user
            }))

    }

    render() {
        return(
            <div></div>
        )
    }
}