import React, { Component } from 'react';
import { Route, Switch, HashRouter as Router, Redirect, Link, NavLink } from 'react-router-dom';
import api from './api';
import './App.css';
import Logo from './TCClogo.png';

import Homepage from './pages/Homepage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import FindPartner from './pages/FindPartner';
import FindVendor from './pages/FindVendor';
import ManagePartner from './pages/ManagePartner';
import Results from './pages/Results';
import ManageVendor from './pages/ManageVendor';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            api.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !api.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: api.isAuthenticated(),
            type: ''
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.refresh();
    }

    refresh() {
        api.profile((error, response) => {
            if (error) {
                sessionStorage.removeItem(api.tokenKey);
            this.setState({ isAuthenticated: false });
            } else {
                this.setState({
                    isAuthenticated: true,
                    type: response.companyType
                });
            }
        });
    }

    handleLogout(event) {
        api.logout(() => {
            this.setState({ isAuthenticated: false });
        });
        event.preventDefault();
    }

    handleLogin() {
        this.refresh();
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <header>
                        <div id="logo">
                            <img src={Logo} alt="Logo" />
                        </div>
                        <nav>
                            {this.state.isAuthenticated ? (
                                <ul>
                                    <li><NavLink exact to="/">Dashboard</NavLink></li>
                                    <li><NavLink to="/find-partner">Find Partner</NavLink></li>
                                    <li><NavLink to="/find-vendor">Find Vendor</NavLink></li>
                                    <li><NavLink to="/contact">Contact</NavLink></li>
                                    <li><Link to="/" onClick={this.handleLogout}>Sign Out</Link></li>
                                </ul>
                            ) : (
                                    <ul>
                                        <li><NavLink exact to="/">Home</NavLink></li>
                                        <li><NavLink to="/contact">Contact</NavLink></li>
                                        <li><NavLink to="/login">Log in</NavLink></li>
                                        <li><NavLink to="/signup">Sign Up</NavLink></li>
                                    </ul>
                                )}
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path="/" render={() => {
                            return this.state.isAuthenticated ? (
                                <Dashboard type={this.state.type} />
                            ) : (
                                    <Homepage />
                                )
                        }} />
                        <Redirect path="/home" to="/" />
                        <Route path="/contact" render={() => {
                            return (
                                <div className="content">
                                    <h1>Coming Soon</h1>
                                </div>
                            )
                        }} />

                        <PublicRoute path="/login" component={() => <Login onLoggedIn={this.handleLogin} />} />
                        <PublicRoute path="/signup" component={SignUp} />

                        <PrivateRoute path="/find-partner" component={FindPartner} />
                        <PrivateRoute path="/find-vendor" component={FindVendor} />
                        <PrivateRoute path="/results/:type/:query" component={Results} />
                        <PrivateRoute path="/manage-partner" component={ManagePartner} />
                        <PrivateRoute path="/manage-vendor" component={ManageVendor} />
                    </Switch>
                    <footer>
                        <section>
                            <p>footer</p>
                        </section>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default App;
