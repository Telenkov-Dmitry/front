import React, { Component } from 'react';
import {Route, Switch, withRouter} from "react-router";
import AppRegistration from '../App.js'
import AppHead from '../AppHead.js'

const MainRouter = () => (
    <Switch>
        <Route exact path={'/'} component={AppRegistration}/>
        <Route path={'/:id'} component={AppHead}/>
    </Switch>
);

export default withRouter(MainRouter)