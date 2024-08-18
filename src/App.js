import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RepoDetails from './pages/RepoDetails';
import SignIn from './pages/SignIn';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSignIn = () => {
        setIsAuthenticated(true);
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/repo/:owner/:repo" component={RepoDetails} />
                    <Route path="/signin" component={() => <SignIn onSignIn={handleSignIn} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
