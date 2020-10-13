import React, { Component } from 'react'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <LoginComponent/>
            </div>
        )
    }

}

class LoginComponent extends Component {
    
    constructor(props){
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
                {this.state.showSuccessMessage &&  <div>Successful Login</div>}
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials>
                <ShowLoginSuccessMessage showSuccessMessage= {this.state.showSuccessMessage}></ShowLoginSuccessMessage>*/}
                User Name: <input type="text" name="username" value = {this.state.username} onChange= {this.handleChange} />
                Password: <input type="password" name="password" value = {this.state.password} onChange= {this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

    loginClicked = () =>{
        if (this.state.username==='aris' 
        && this.state.password==='test'){
            this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
        } 
        else{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]:event.target.value
            }
        )
    }
}

function ShowInvalidCredentials(props){
    if (props.hasLoginFailed){
        return <div>Invalid Credenials</div>
    }
    return null
}

function ShowLoginSuccessMessage(props){
    if (props.showSuccessMessage){
        return <div>Successful Login</div>
    }
    return null
}


export default TodoApp