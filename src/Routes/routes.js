import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserDetail from '../components/UserDetail';
import Home from '../components/Home';
import NotFound from '../components/NotFound';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/:username/details" component={UserDetail} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;