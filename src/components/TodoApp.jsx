import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/welcome/:name" component={WelcomeComponent} />
                        <Route path="/todos" component={ListTodosComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                </Router>

            </div>
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
                {/* TRUE && STRING WILL GIVE STRING
                    FALSE && STRING WILL GIVE FALSE (JAVASCRIPT) */}
                {this.state.hasLoginFailed && <div>Invalid Credenials</div>}
                {this.state.showSuccessMessage && <div>Successful Login</div>}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

    loginClicked = () => {
        if (this.state.username === 'aris'
            && this.state.password === 'test') {
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
        return <div>
            Welcome {this.props.match.params.name}
            Manage your todos <Link to="/todos">here</Link>.
            </div>
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
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>description</th>
                                <th>is completed?</th>
                                <th>target date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                     </tr>
                                )
                            
                            }
                        </tbody>
                    </table>
                </div>
    }
}

export default TodoApp