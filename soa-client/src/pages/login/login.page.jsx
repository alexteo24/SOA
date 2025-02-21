import './login.page.css';
import UserService from "../../services/user.service";
import {User} from "../../models/user";
import React from "react";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        if (UserService.currentUserValue) {
            this.props.history.push('/');
        }

        this.state = {
            user: new User('', ''),
            submitted: false,
            loading: false,
            errorMessage: ''
        };
    }

    handleChange(e) {
        var {name, value} = e.target;
        var user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        if (!(user.username && user.password)) {
            return;
        }

        this.setState({loading: true});
        UserService.login(user).then(data => {
            this.props.history.push('/home');
        }, error => {
            this.setState({errorMessage: 'Username or password is incorrect', loading: false});
        });
    }

    render() {
        const { user, submitted, loading, errorMessage } = this.state;
        return (
            <div className="login-container fade-in">
                <div className="login-card">
                    <img className="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Profile" />
                    <h2 className="text-center mb-4">Login</h2>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            <strong>Error! </strong> {errorMessage}
                        </div>
                    )}
                    <form name="form" onSubmit={(e) => this.handleLogin(e)}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={user.username}
                                onChange={(e) => this.handleChange(e)}
                                required
                            />
                            {submitted && !user.username && <div className="invalid-feedback d-block">Username is required</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={user.password}
                                onChange={(e) => this.handleChange(e)}
                                required
                            />
                            {submitted && !user.password && <div className="invalid-feedback d-block">Password is required</div>}
                        </div>
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}