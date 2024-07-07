import React from 'react';
import {
    BrowserRouter as Router, 
    Routes as BrowserRouters, 
    Route }
from "react-router-dom";

import CollectDatasetPage from "../src/pages/CollectDatasetPage";
import HomePage from "../src/pages/HomePage";
import NotFoundPage from "../src/pages/NotFoundPage";
import PredictPage from "../src/pages/PredictPage";
import TestPage from "../src/pages/TestPage";
import TrainPage from "../src/pages/TrainPage";
import LabelPage from "../src/pages/LabelPage";


function Routes () {

    return (
    <Router>
        <BrowserRouters>
            <Route 
                path="/" 
                exact 
                element={<HomePage />}/>
            
            <Route 
                path="/collect-dataset" 
                element={ <CollectDatasetPage/>}/>
            
            <Route 
                path="/test"
                element={<TestPage/>}/>
            
            <Route 
                path="/train"
                element={<TrainPage/>}/>
            <Route 
                path="/label"
                element={<LabelPage/>}/>
            <Route 
                path="/predict"
                element={<PredictPage/>}/>

            <Route 
                path="*"
                element={<NotFoundPage/>}/>
            
        </BrowserRouters>
    </Router>    
    );
}

export default Routes;