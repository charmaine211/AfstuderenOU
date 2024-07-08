import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Switch, Typography } from "@mui/material";
import { pink } from '@mui/material/colors';

function TaskSelector ({ setIsImageClassification, setIsObjectDetection }) {

    const styleSwitch = {
        backgroundColor: "pink",
        padding: 9,

    }

    const handleChangeTask = () => {

        setIsImageClassification((prevValue) => {
            return !prevValue;
        })
        setIsObjectDetection((prevValue) => {
            return !prevValue;
        })
    }

    return (
        <Stack direction="row" 
        spacing={1}
            style={{
                marginBottom: "3em",             
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",}}>
            <Typography>Object detection</Typography> <Switch style={styleSwitch} defaultChecked onChange={handleChangeTask} color={"default"}/> <Typography>Image classification</Typography>
        </Stack>
    );
}

TaskSelector.propTypes = {
    setIsImageClassification: PropTypes.func.isRequired,
    setIsObjectDetection: PropTypes.func.isRequired,
}

export default TaskSelector;