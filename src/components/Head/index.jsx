import React, { Component } from 'react';
import './index.css'
import Profile from "../Profile";
import LogOut from "../LogOut";
import {Registration} from "../FormThings";
import {UserUpdateForm} from "../UserUpdateForm";

const getName = (user) => {
    let data = JSON.parse(localStorage.getItem('data'));
    console.log(data)
    return data[user].name;
};
const getCity = (user) => {
    let data = JSON.parse(localStorage.getItem('data'));
    return data[user].city;
};
const getNumber = (user) => {
    let data = JSON.parse(localStorage.getItem('data'));
    let city = data[user].city;
    let name = data[user].name;
    let number = 0;
    Object.values(data).forEach((elem) => {
        if (elem.city === city && elem.name === name) {
            ++number
        }
    });
    return number - 1;
};

export default class YouInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'Info'}>
                {`Здравствуйте, ${getName(this.props.user)}!`}
                <br/>
                {`Спешим сообщить, что помимо вас в городе ${getCity(this.props.user)}
                     проживает еще ${getNumber(this.props.user)} людей
                     с именем ${getName(this.props.user)}!`}
            </div>
        )
    }
}