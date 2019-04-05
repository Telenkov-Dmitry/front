import React, { Component } from 'react';
import {withRouter} from "react-router";
import './index.css'

const addTrash = () => {
    localStorage.setItem('lastLog', JSON.stringify(['trash', new Date(42)]));
};

class LogOut extends Component {
    render() {
        return (
            <div className={'LogOut'} onClick={() =>
            {
                addTrash();
                this.props.history.push('/');
            }}/>
        )
    }
}

export default withRouter(LogOut);