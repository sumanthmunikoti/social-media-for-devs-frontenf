import { Component } from "react";
import { API_URL } from "../common/constants";
import { Link } from 'react-router-dom';
import NavBarComponent from "../Component/NavBar/NavBarComponent";

export default class ProfilesContainer extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        this.findAllUser()
    }

    findAllUser = () => {
        fetch(`${API_URL}/profile/all`)
            .then(response => response.json())
            .then(results => this.setState({
                users: results
            }))

    }

    render() {
        return (
            <div>
                <NavBarComponent />

                <div className="row profiles">
                    <div className="col-sm-12">
                        {/* {this.state.users.length !== 0 && console.log("user", this.state.users) } */}
                        {this.state.users.length !== 0 && this.state.users.map(user => (
                            
                            <div className="card profile-card"
                                style={{ float: "left", marginLeft: "1em" }}
                                key={user.user._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.user.name}</h5>
                                    <Link to={`/profile/${user.user._id}`}>
                                        <button href="#" className="btn btn-primary">
                                            See Profile
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}