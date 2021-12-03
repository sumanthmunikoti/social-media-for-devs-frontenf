import { Component } from "react";
import { API_URL } from "../common/constants";
// import { Link } from "react-router-dom";

export default class SignInComponent extends Component {
    state = {
        email: ''
    }

    login = async () => {
        await fetch(`${API_URL}/users/auth`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email
            })
        }).then(response =>
            console.log(response.json())
        )
    }

    render() {
        return (
            <div>
                Login Page
                <form className="form">
                    <div className="form-group">
                        <input onChange={async (e) =>
                            await this.setState({
                                email: e.target.value
                            })
                        }
                            placeholder="Email Address"
                            name={"email"}
                            required
                            type={"email"}
                            value={this.state.email}
                        />
                    </div>
                </form>
                <button type="submit" onClick={this.login} className="btn btn-primary">
                    Sign In
                </button>
            </div>
        )
    }
}