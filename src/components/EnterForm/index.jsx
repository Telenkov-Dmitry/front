import {CSSTransition} from "react-transition-group";
import React, { Component } from 'react';
import {withRouter} from "react-router";
import './index.css'
import '../FormThings/index.css'
import {existsPerson, InputAndError, Registration} from '../FormThings/index'
import {RegisterForm} from "../RegisterForm";

class EnterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            forgot: false,
            registration: false,
            attention: false,
            success: false,
        }
    }
    change = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    enter = (user) => {
        localStorage.setItem('lastLog', JSON.stringify([user, Date.now()]));
        this.props.history.push(`/${user}`);
    };
    onSubmit = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem('data'));
        if (existsPerson(this.state.user, this.state.password)) {
            this.setState({success: true});
            this.setState({attention: !this.state.attention});
            this.enter(this.state.user);
        } else {
            this.setState({success: false});
            this.setState({attention: !this.state.attention})
        }
    };
    render() {
        return <div className={'Enter-form-holder'}>
            <form className={"Form"} onSubmit={(e)=>this.onSubmit(e)}>
                <header className={"Form-head"}>
                    Добро пожаловать на AllYou!
                </header>
                <div className={"Form-inputs"}>

                    <div className={"Enter"}>
                        <div className={"Enter-text"}>
                            Вход
                        </div>
                        <div className={"Line"}/>
                    </div>

                    <InputAndError
                        name={"user"}
                        placeholder={"Логин"}
                        type={"text"}
                        value={this.state.user}
                        change={e => this.change(e)}
                        possibleErrors={[]}
                        className={'Input-wo-error'}
                        addError={()=>1}
                        removeError={()=>1}/>
                    <InputAndError
                        name={"password"}
                        placeholder={"Пароль"}
                        type={"password"}
                        value={this.state.password}
                        change={e => this.change(e)}
                        possibleErrors={[]}
                        className={'Input-wo-error'}
                        addError={()=>1}
                        removeError={()=>1}/>

                    <div className={"Forgot"} onClick={()=>this.setState({forgot: !this.state.forgot})}>Забыли пароль?</div>
                    <div className={"Forgot-text"}>{this.state.forgot ? 'Мы тоже!' : ''}</div>
                    <button type={"submit"} className={"Form-button"}>Зайти</button>
                    <div className={"Forgot"} onClick={()=>this.props.open()}>Регистрация</div>
                </div>
            </form>
            <CSSTransition
                classNames={"Attention"}
                in={this.state.attention}
                timeout={1500}>
                <div className={this.state.success ? 'Success' : 'Failure'}>
                    {this.state.success ? 'Удача!' : 'Ошибка!'}
                    <br/>
                    {this.state.success ? 'Добро пожаловать!' : 'Неверные имя пользователя или пароль'}
                </div>
            </CSSTransition>
        </div>
    }
}

export default withRouter(EnterForm);