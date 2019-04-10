import React, { Component } from 'react';
import './App.css';
import EnterForm from "./components/EnterForm";
import {withRouter} from "react-router";
import {CSSTransition} from "react-transition-group";
import {Registration} from "./components/FormThings";
import {RegisterForm} from "./components/RegisterForm";
import {logOutTime, pingTime} from "./constants";

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
    componentDidMount() {
        let lastLog = JSON.parse(localStorage.getItem('lastLog'));
        console.log(lastLog);
        if ((Date.now() - lastLog[1]) / 60000 < logOutTime) {
            console.log('Already logged')
            this.props.history.push(`/${lastLog[0]}`);
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