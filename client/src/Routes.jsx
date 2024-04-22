import React from 'react';
import {
    BrowserRouter as Router, 
    Switch, 
    Route }
from "react-router-dom";

import { CollectDatasetPage } from "../src/pages/CollectDatasetPage";
import { HomePage } from "../src/pages/HomePage";
import { NotFoundPage } from "../src/pages/NotFoundPage";
import { Predictpage } from "../src/pages/PredictPage";
import { TestPage } from "../src/pages/TestPage";
import { TrainPage } from "../src/pages/TrainPage";


function Routes () {

    return (
    <Router>
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/collect-dataset">
                <CollectDatasetPage/>
            </Route>
            <Route path="/test">
                <TestPage/>
            </Route>
            <Route path="/train">
                <TrainPage/>
            </Route>
            <Route path="/predict">
                <Predictpage/>
            </Route>
            <Route>
                <NotFoundPage/>
            </Route>
        </Switch>
    </Router>    
    );
}

export default Routes;