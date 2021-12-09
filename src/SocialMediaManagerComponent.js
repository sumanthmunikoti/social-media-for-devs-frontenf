import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardContainer from "./Dashboard/DashboardContainer";
import LandingComponent from "./Component/LandingComponent";
import SignInComponent from "./SignIn/SignInComponent";
import { createBrowserHistory } from 'history';
import ProfilesContainer from "./Profile/ProfilesContainer";
import NeoPosts from './Post/NeoPosts';

const history = createBrowserHistory();

function SocialMediaManagerComponent() {

    return (
        <div>

            <Router history={history}>

                <Routes>
                    <Route
                        exact path="/dashboard"
                        element={<DashboardContainer />}
                    >
                    </Route>

                    <Route
                        exact path="/"
                        element={<LandingComponent />}
                    >
                    </Route>

                    <Route
                        exact path="/login"
                        element={<SignInComponent />}
                    >
                    </Route>

                    <Route
                        exact path="/profiles"
                        element={<ProfilesContainer />}
                    >
                    </Route>

                    <Route
                        exact path="/posts"
                        element={<NeoPosts />} >
                    </Route>

                </Routes>
            </Router>
        </div>
    )
}


export default SocialMediaManagerComponent