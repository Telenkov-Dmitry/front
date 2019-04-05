import {addPerson, errorFuncs, InputAndError} from "../FormThings";
import {CSSTransition} from "react-transition-group";
import React, { Component } from 'react';
import './index.css'
import '../FormThings/index.css'

export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            mail: '',
            name: '',
            city: '',
            attention: false,
            success: false,
            errors: 5
        }
    }
    change = e => {
        this.setState({[e.target.name]: e.target.value})
    };
    addError = () => this.setState({errors: this.state.errors + 1});
    removeError = () => this.setState({errors: this.state.errors - 1});
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.errors === 0 && addPerson(this.state)) {
            this.setState({success: true});
            this.setState({attention: !this.state.attention});
            this.setState({
                user: '',
                password: '',
                mail: '',
                name: '',
                city: ''
            });
            this.props.regOff();
        } else {
            this.setState({success: false});
            this.setState({attention: !this.state.attention})
        }
        console.log(localStorage.getItem('data'));
    };
    render() {
        return (
            <CSSTransition
                classNames={"Register-form"}
                in={this.props.on}
                timeout={0}>
                <div className={'Form-handler'}>
                    <form className={"Register-form"} onSubmit={(e)=>this.onSubmit(e)}>
                        <div className={"Form-inputs"}>

                            <div className={"Enter"}>
                                <div className={"Enter-text"}>
                                    Регистрация
                                </div>
                                <div className={"Line"}/>
                            </div>

                            <InputAndError
                                name={"user"}
                                placeholder={"Логин"}
                                type={"text"}
                                value={this.state.user}
                                change={e => this.change(e)}
                                possibleErrors={[errorFuncs.empty, errorFuncs.usrExists]}
                                className={'Input-and-error'}
                                addError={()=>this.addError()}
                                removeError={()=>this.removeError()}/>
                            <InputAndError
                                name={"password"}
                                placeholder={"Пароль"}
                                type={"password"}
                                value={this.state.password}
                                change={e => this.change(e)}
                                possibleErrors={[errorFuncs.empty]}
                                className={'Input-and-error'}
                                addError={()=>this.addError()}
                                removeError={()=>this.removeError()}/>
                            <InputAndError
                                name={"mail"}
                                placeholder={"Почта"}
                                type={"text"}
                                value={this.state.mail}
                                change={e => this.change(e)}
                                possibleErrors={[errorFuncs.empty]}
                                className={'Input-and-error'}
                                addError={()=>this.addError()}
                                removeError={()=>this.removeError()}/>
                            <InputAndError
                                name={"name"}
                                placeholder={"Имя"}
                                type={"text"}
                                value={this.state.name}
                                change={e => this.change(e)}
                                possibleErrors={[errorFuncs.nameWrong]}
                                className={'Input-and-error'}
                                addError={()=>this.addError()}
                                removeError={()=>this.removeError()}/>
                            <InputAndError
                                name={"city"}
                                placeholder={"Город"}
                                type={"text"}
                                value={this.state.city}
                                change={e => this.change(e)}
                                possibleErrors={[errorFuncs.cityNameWrong]}
                                className={'Input-and-error'}
                                addError={()=>this.addError()}
                                removeError={()=>this.removeError()}/>

                            <button type={"submit"} className={"Form-button"} style={{width: '60%'}}>Зарегистрироваться</button>
                        </div>
                    </form>
                    <CSSTransition
                        classNames={"Attention"}
                        in={this.state.attention}
                        timeout={1500}>
                        <div className={this.state.success ? 'Success' : 'Failure'}>
                            {this.state.success ? 'Удача!' : 'Ошибка!'}
                            <br/>
                            {this.state.success ? 'Вы можете зайти под своим логином!' : 'Исправьте все ошибки, все поля должны быть заполненны'}
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        )
    }
}