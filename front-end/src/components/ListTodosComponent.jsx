import React, { Component } from 'react'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component{
    constructor(props){
        super()
        this.state={
            todos :[],message:null
        }
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos = () =>{
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
          .then(
              response => {  
                  console.log(response.data)
                this.setState({todos : response.data})
              }
          ) 
    }
    

    render() {
        return <div>
                    <h1>List Todos</h1>
                    { this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed</th>
                                <th>Target date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('DD-MM-YYYY')}</td>
                                        <td><button onClick={() => this.updateTodoClicked(todo.id)} className="btn btn-success">Update</button></td>
                                        <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Delete</button></td>
                                     </tr>
                                )
                            
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                    </div>
                </div>
    }

    deleteTodoClicked = (id) =>{
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username,id)
        .then(
            response =>{
                this.setState({message : 'delete succesful'})
                this.refreshTodos();
            }
        )
    }

    updateTodoClicked = (id) =>{
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked = () =>{
        this.props.history.push(`/todos/-1`)
    }
}

export default ListTodosComponent