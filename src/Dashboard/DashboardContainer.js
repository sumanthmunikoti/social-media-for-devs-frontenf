
// import ExperienceTableComponent from "./ExperienceTableComponent";
import { Component } from "react";
import { API_URL } from "../common/constants";
import { connect } from 'react-redux'
import PhoneNumberComponent from "./PhoneNumberComponent";
import ExperienceTableComponent from "./ExperienceTableComponent";

class DashboardContainer extends Component {

    state = {
        user: {}
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
                user: results.user
            }))
    }

    render() {
        return (
            <div>

                <PhoneNumberComponent />
                <br />

                <div className="dashboard-div">
                    <h2 className="my-2">Experience Credentials</h2>
                    <ExperienceTableComponent
                        experienceId={this.props.experienceId}
                        user={this.state.user}
                    />
                </div>
            </div>
        )
    }
}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { id } = state
    return {
        userId: id
    }
}

export default connect(mapStateToProps)(DashboardContainer)