import * as React from 'react';
import PropTypes from 'prop-types';
import { BarChart } from '@mui/x-charts/BarChart';

export default function AnalyseVideoChart({ videotitle, classes, data }) {

    // CONSTANTS
    // const seriesData = getSeriesData();
    const xLabels = getLabels();        /* Shows the seconds on xAxis */
    const dataKeys = getDataKeys();     /* Per second the percentage of each class will be shown */

    // // FUNCTIONS
    // function getSeriesData(){
    //     let sd = [];
    //     data.map((d) => {
    //         sd.push({
    //             data: d.values()
    //         });
    //     });

    //     return sd;
    // }

    const valueFormatter = (value) => `${value} %`;

    function getDataKeys() {
        const ks = [];
        classes.map((className) => {
            ks.push({ dataKey: className, 
                label: className, 
                valueFormatter });
        });
    
        return ks;
    }

    function getLabels(){
        let labels = [];
        data.map((d, index) =>{
            labels.push(`${index++}s`)
        });

        return labels;
    }

    return (
        <BarChart
        dataset={data}
        xAxis={[{ 
            scaleType: 'band', 
            data: xLabels,
            label: videotitle }]}
        series={ dataKeys }
        width={500}
        height={300}
        />
    );
}

AnalyseVideoChart.propTypes = {
    videotitle: PropTypes.string.isRequired,
    classes: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
}

export default AnalyseVideoChart;

// results = model(image_path) returns a Python list of Results objects