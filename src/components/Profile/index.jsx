import React, { Component } from 'react';
import './index.css'

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'Profile'} onClick={() => this.props.open()}>
                <div className={'Profile-text'}>Profile</div>
                <div className={'Profile-img'}/>
            </div>
        )
    }
}

export default Profile;