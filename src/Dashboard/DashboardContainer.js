import React from "react";
// import ExperienceTableComponent from "./ExperienceTableComponent";
import { API_URL } from "../common/constants";

class DashboardContainer extends React.Component {
    state = {
        user: { name: '' }
    }

    componentDidMount() {
        fetch(`${API_URL}/profile/me`)
            .then(response => response.json())
            .then(results => this.setState({
                user: results.user
                
            }))
    }

    // componentDidMount() {
    //     console.log("Hello")
    // }

    render() {
        return (
            <div>
                Hi
                {/* <div className="dashboard-div">
                    <h2 className="large">Dashboard</h2>
                    <p className="lead">
                        <i className="fas fa-child"> </i>
                        Welcome, {this.state.user.name}</p>
                </div>
                

                <br />

                {/* <div className="dashboard-div">
                    <h2 className="my-2">Experience Credentials</h2>
                    <ExperienceTableComponent
                        experienceId={this.props.experienceId}
                        user={this.state.user}
                    />
                </div> */}
                <br />
                <br /> 

            </div>
        )
    }
}

export default DashboardContainer