import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardContainer from "./Dashboard/DashboardContainer";
import LandingComponent from "./Component/LandingComponent";

class SocialMediaManagerComponent extends Component {
    render() {
        return (
            <div>
                
                <Router>
                    <Routes>
                        <Route
                            exact path = "/dashboard"
                            
                            element={<DashboardContainer/>}
                        >
                        </Route>

                        <Route
                            exact path="/"
                            element={<LandingComponent/>}
                        >
                        </Route>
                    </Routes>
                </Router>
            </div>
        )
    }
}

export default SocialMediaManagerComponent