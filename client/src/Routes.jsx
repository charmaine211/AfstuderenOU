import React from 'react';
// import {
//     // HashRouter as Router,
//     BrowserRouter as Router, 
//     Routes as BrowserRouters, 
//     Route }
// from "react-router-dom";
import { HashRouter as Router, Route, Routes as Routess } from 'react-router-dom';

import CollectDatasetPage from "../src/pages/CollectDatasetPage";
import HomePage from "../src/pages/HomePage";
import NotFoundPage from "../src/pages/NotFoundPage";
import Predictpage from "../src/pages/PredictPage";
import TestPage from "../src/pages/TestPage";
import TrainPage from "../src/pages/TrainPage";


function Routes () {

    return (
<Router>
    <Routess>
        <Route
            path="/"
            exact
            element={<HomePage />} />
        <Route
            path="/collect-dataset"
            element={<CollectDatasetPage />} />
        <Route
            path="/test"
            element={<TestPage />} />
        <Route
            path="/train"
            element={<TrainPage />} />
        <Route
            path="/label"
            element={<LabelPage />} />
        <Route
            path="/predict"
            element={<PredictPage />} />
        <Route
            path="*"
            element={<HomePage />} /> 
        </Routess>
    </Router> 
    );
}

export default Routes;