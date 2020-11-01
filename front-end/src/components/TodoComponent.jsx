import moment from 'moment'
import React, { Component } from 'react'
import { Form,Field, Formik, ErrorMessage } from 'formik'
import TodoDataService from '../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state= {
            id: this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount(){

        if (this.state.id == -1)
            return

        let username = AuthenticationService.getLoggedInUserName()
        
        TodoDataService.retrieveTodo(username, this.state.id)
             .then(response => this.setState({
                 description: response.data.description,
                 targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
             }))
    }

    validate = (values) =>{
        let errors ={}
        if (!values.description){
            errors.description = 'Enter a Description'
        }else if ( values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }

        if (!moment(values.targetDate).isValid() ){
            errors.targetDate= 'Enter a valid Date'
        }
        return errors
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }
    }

    render(){
        let {description,targetDate }= this.state
        return( <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik initialValues={{description,targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>  
                                        <Field className="form-control" type="text" name="description" ></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>  
                                        <Field className    ="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                               
                            )
                        }
                    </Formik>
                    Todo Component for id {this.props.match.params.id}</div>
                </div>
            )

    }
}

export default TodoComponent