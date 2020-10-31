import moment from 'moment'
import React, { Component } from 'react'
import { Form,Field, Formik } from 'formik'
class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state= {
            id: this.props.match.params.id,
            description : 'Learn Forms Now',
            targetDate : moment(new Date()).format('DD-MM-YYYY')
        }
    }

    onSubmit= (values) =>{
                            
    }
    render(){
        let {description,targetDate }= this.state
        return(
            <div>
                <h1>TODO</h1>
                <div className="container">
                    <Formik initialValues={{
                        description:description,
                        targetDate: targetDate
                        }}
                        onSubmit={this.onSubmit}>
                        {
                            (props) => (
                                <Form>
                                    
                                    <fieldset className="form-group">
                                        <label>Description</label>  
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>  
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                               
                            )
                        }
                    </Formik>
                </div>
                Todo Component for id {this.props.match.params.id}</div>
        )
    }
}

export default TodoComponent