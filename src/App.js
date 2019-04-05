import React, { Component } from 'react';
import './App.css';
import EnterForm from "./components/EnterForm";
import {withRouter} from "react-router";
import {CSSTransition} from "react-transition-group";
import {Registration} from "./components/FormThings";
import {RegisterForm} from "./components/RegisterForm";

class AppRegistration extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify({}));
        }
        this.state = {
            registration: false
        }
    }
    render() {
        return (
            <div className="App">
                    <EnterForm user={this.props.match.params.id} open={() => this.setState({registration: true})}/>
                    <Registration on={this.state.registration}
                              regOff={()=>this.setState({registration: false})}
                              Form={RegisterForm}
                              user={this.props.user}/>
            </div>
        );
    }
}

export default withRouter(AppRegistration);