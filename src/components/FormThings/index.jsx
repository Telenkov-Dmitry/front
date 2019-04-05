import React, { Component } from 'react';
import './index.css'
import { CSSTransition } from "react-transition-group";
import {RegisterForm} from '../RegisterForm/index.jsx'

export const errorFuncs = {
    empty: (string) => {return !string ? 'Поле не может быть пустым' : ''},
    nameWrong: (string) => {
        if (!((/^([А-Я][а-я]+ )*[А-Я][а-я]+$/).test(string) || (/^([A-Z][a-z]+ )*[A-Z][a-z]+$/).test(string))) {
            if ( (/^.{0,1}$/).test(string) ) {
                return 'Имя должно состоять из двух или более букв'
            }
            if ( (/ {2}/).test(string) ) {
                return 'Имя не может включать более двух пробелов подряд'
            }
            if ( (/ $/).test(string) ) {
                return 'Имя не может оканчиваться на пробел'
            }
            if ( !(/^([А-Я][а-я]* ?)+$/).test(string) && !(/^([A-Z][a-z]* ?)+$/).test(string) ) {
                return 'Имя должно содержать буквы (или пробелы), и только из одного алфавита. Отдельные слова начинаются с большой буквы'
            }
            if ( !(/^([А-Я][а-я]+ ?)+$/).test(string) && !(/^([A-Z][a-z]+ ?)+$/).test(string) ) {
                return 'Отдельные части имени содержат не менее двух букв'
            }
            return 'Что-то я не допрогал))'
        } else {
            return ''
        }
    },
    usrExists: (string) => {
        let data = JSON.parse(localStorage.getItem('data'));
        if (string in data) {
            return 'Такой пользователь уже существует';
        } else {
            return '';
        }
    },
    cityNameWrong: (string) => {
        if (!((/^([А-Я][а-я]+[ -])*[А-Я][а-я]+$/).test(string) || (/^([A-Z][a-z]+[ -])*[A-Z][a-z]+$/).test(string))) {
            if ( (/^.{0,1}$/).test(string) ) {
                return 'Имя города должно состоять более, чем из двух букв'
            }
            if ( (/[ -]{2}/).test(string) ) {
                return 'Имя города не может включать более двух пробелов или тире подряд'
            }
            if ( (/[ -]$/).test(string) ) {
                return 'Имя города не может оканчиваться на пробел или тире'
            }
            if ( !(/^([А-Я][а-я]*[ -]?)+$/).test(string) && !(/^([A-Z][a-z]*[ -]?)+$/).test(string) ) {
                return 'Имя города должно содержать буквы (или пробелы, или тире), и только из одного алфавита. Отдельные слова начинаются с большой буквы'
            }
            if ( !(/^([А-Я][а-я]+[ -]?)+$/).test(string) && !(/^([A-Z][a-z]+[ -]?)+$/).test(string) ) {
                return 'Отдельные части имени города содержат не менее двух букв'
            }
            return 'Что-то я не допрогал))'
        } else {
            return '';
        }
    }
};

export const findErrors = (string, possibleErrors) => {
    let error = ''
    for (let i in possibleErrors) {
        error = possibleErrors[i](string)
        if (error) {
            return error
        }
    }
    return error
};
export class InputAndError extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
        findErrors(this.props.value, this.props.possibleErrors) === '' ? this.isError=false : this.isError=true
    }

    change = e => {
        let error = findErrors(e.target.value, this.props.possibleErrors);
        if (error === '' && this.isError) {
            this.isError = false;
            this.props.removeError()
        }
        if (error !== '' && !this.isError) {
            this.isError = true
            this.props.addError()
        }
        this.setState({error: error})
        this.props.change(e)
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <input
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={e => this.change(e)}
                    className={this.props.className}
                />
                <p className={"Error"}>
                    {this.state.error}
                </p>
            </div>
        )
    }
}

export const existsPerson = (user, password) => {
    let data = JSON.parse(localStorage.getItem('data'));
    return user in data && data[user].password === password;
};

export class Registration extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <CSSTransition in={this.props.on}
                       timeout={0}
                       classNames={"Black-nothingness-holder"}>
            <div className={"Black-nothingness-holder"}>
                <CSSTransition in={this.props.on}
                               timeout={0}
                               classNames={"Black-nothingness"}>
                    <div className={"Black-nothingness"}
                         onClick={()=>this.props.regOff()}/>
                </CSSTransition>
                <this.props.Form on={this.props.on} regOff={()=>this.props.regOff()} user={this.props.user}/>
            </div>
        </CSSTransition>
        )
    }
}

export const addPerson = (person) => {
    if (!person.user || !person.password || !person.mail || !person.name || !person.city) {
        return false
    }
    let data = JSON.parse(localStorage.getItem('data'));
    data[person.user] = person;
    localStorage.setItem('data', JSON.stringify(data));
    return true;
};

export const getPersonData = (user) => {
    let data = JSON.parse(localStorage.getItem('data'));
    console.log(data);
    console.log(user);
    console.log(data[user]);
    delete data[user].user;
    return data[user];
};

export const changePerson = (user, newData) => {
    let data = JSON.parse(localStorage.getItem('data'));
    console.log(data[user]);
    data[user] = newData;
    console.log(data[user])
    localStorage.setItem('data', JSON.stringify(data));
    return true;
};