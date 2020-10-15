import React, { Component } from 'react'
    import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'aris',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container"></div>
                {/* TRUE && STRING WILL GIVE STRING
                    FALSE && STRING WILL GIVE FALSE (JAVASCRIPT) */}
                {this.state.hasLoginFailed && <div className="alet alert-warning">Invalid Credenials</div>}
                {this.state.showSuccessMessage && <div>Successful Login</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

    loginClicked = () => {
        if (this.state.username === 'aris'
            && this.state.password === 'test') {
                AuthenticationService.registerSuccessfullLogin(this.state.username,this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else {

        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
}

export default LoginComponent