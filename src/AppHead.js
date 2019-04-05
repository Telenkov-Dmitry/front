import React, { Component } from 'react';
import './App.css';
import YouInfo from "./components/Head";
import {withRouter} from "react-router";
import {logOutTime, pingTime} from './constants'
import {Registration} from "./components/FormThings";
import {UserUpdateForm} from "./components/UserUpdateForm";
import Profile from  "./components/Profile"
import LogOut from  "./components/LogOut"

class TopRight extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'Top-right'}>
                <Profile open={()=>this.props.open()}/>
                <div className={'Fence'}/>
                <LogOut/>
            </div>
        )
    }
}

class AppHead extends Component {
    constructor(props) {
        super(props);
        let lastLog = JSON.parse(localStorage.getItem('lastLog'));
        console.log(this.props.match.params.id);
        if (!lastLog || lastLog[0] !== this.props.match.params.id || (lastLog[1] - Date.now()) / 60000 > logOutTime) {
            this.props.history.push('/');
            console.log('NO');
        }
        console.log('YES');
        this.state = {
            update: false,
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            localStorage.setItem('lastLog', JSON.stringify([this.props.match.params.id, Date.now()]));
            console.log('pinged');
        }, pingTime * 60 * 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div className={'App'}>
                <YouInfo user={this.props.match.params.id}/>
                <TopRight open={()=>this.setState({update: true})}/>
                <Registration on={this.state.update}
                              regOff={()=>this.setState({update: false})}
                              Form={UserUpdateForm}
                              user={this.props.match.params.id}/>
            </div>
        );
    }
}

export default withRouter(AppHead);