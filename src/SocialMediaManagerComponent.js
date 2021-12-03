import { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashboardContainer from "./Dashboard/DashboardContainer";

class SocialMediaManagerComponent extends Component {
    render() {
        return (
            <div>
                <Router basename="/socmed-client">
                    <Route
                        path="/dashboard"
                        exact={true}
                        render={
                            (props) =>
                                <DashboardContainer
                                    {...props}
                                />
                        }
                    >
                    </Route>
                </Router>
            </div>
        )
    }
}

export default SocialMediaManagerComponent