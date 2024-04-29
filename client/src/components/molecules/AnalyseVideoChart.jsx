import React from 'react';
import PropTypes from 'prop-types';
import { BarChart } from '@mui/x-charts';

function AnalyseVideoChart({ 
    videotitle, 
    classes, 
    data 
}) {

    // FUNCTIONS
    const valueFormatter = (value) => `${value*100} %`;

    function getDataKeys() {
        const ks = [];
        classes.map((className) => {
            return ks.push({ dataKey: className, 
                label: className, 
                valueFormatter });
        });
    
        return ks;
    }

    function getLabels(){
        let labels = [];
        data.map((d, index) => {
            return labels.push(`${index++}s`);
        });

        return labels;
    }

    // CONSTANTS
    // const seriesData = getSeriesData();
    const xLabels = getLabels();        /* Shows the seconds on xAxis */
    const dataKeys = getDataKeys();     /* Per second the percentage of each class will be shown */

    return (
        <BarChart
        dataset={data}
        xAxis={[{ 
            scaleType: 'band', 
            data: xLabels,
            label: videotitle }]}
        series={ dataKeys }
        width={1000}
        height={300}
        margin={{ 
            top: 100, 
            bottom: 10, 
            left: 150, 
            right:150 }}
        slotProps={{
            legend: {
              direction: 'column',
              position: { 
                vertical: 'middle', horizontal: 'left' },
              padding: 0,
              margin: 100,
            },
        }}
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