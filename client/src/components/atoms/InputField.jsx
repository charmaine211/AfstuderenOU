import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Stack } from '@mui/material';
import InfoButton from './InfoButton';

function InputField({ hasInfo, isRequired=false, info="", onChange, value, defaultValue="", label, type="text", ariaLabel }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: "30ch" },
                display: 'flex',
                alignItems: 'center'
            }}
            noValidate
            autoComplete="off"
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField 
                    id="outlined-basic" 
                    label={label} 
                    variant="outlined" 
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    aria-label={ariaLabel}
                    sx={{ flex: 1 }}
                    type={type}
                    required={isRequired}
                />
                {hasInfo && <InfoButton text={info} />}
            </Stack>
        </Box>
    );
}

InputField.propTypes = {
    hasInfo: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired, 
    value: PropTypes.string.isRequired, 
    type: PropTypes.string, 
    defaultValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
}

export default InputField;
