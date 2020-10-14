import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import '../bootstrap.css';
import '../App.css';
import AuthenticationService from './AuthenticationService.js'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/welcome/:name" component={WelcomeComponent} />
                        <Route path="/todos" component={ListTodosComponent} />
                        <Route path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent></FooterComponent>
                </Router>

            </div>
        )
    }

}

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLogged()
        console.log(isUserLoggedIn)
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Aris</div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/aris">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Log in</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Log out</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">All rights reserved.</span>
            </footer>
        )
    }
}

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

class WelcomeComponent extends Component {
    render() {
        
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    Manage your todos <Link to="/todos">here</Link>.
                </div>
            </>


        )
    }
}

function ErrorComponent() {
    return <div>An Error Occurred.</div>
}

class ListTodosComponent extends Component{
    constructor(props){
        super()
        this.state={
            todos :
            [
                {id: 1, description: 'Learn React', done: false, targetDate: new Date()},
                {id: 2, description: 'Learn to Dance', done: false, targetDate: new Date()},
                {id: 3, description: 'Go to Paris', done: false, targetDate: new Date()}
            ]
        }
    }
    render() {
        return <div>
                    <h1>List Todos</h1>
                    <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed</th>
                                <th>Target date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                     </tr>
                                )
                            
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for using our Application
                </div>
            </div>
        )
    }
}

export default TodoApp