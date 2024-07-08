import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Stack, InputAdornment, IconButton } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import InfoButton from './InfoButton';

function DirectoryInputField({ hasInfo, isRequired, info, onChange, value, defaultValue, label, type, ariaLabel }) {

    const handleSelectDirectory = () => {

    }

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
                    InputProps={{
                         endAdornment: (
                          <InputAdornment position="end">
                            <IconButton aria-label="Open filesystem"   
                            onClick={handleSelectDirectory}>
                                <FolderRoundedIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                />
                {hasInfo && <InfoButton text={info} />}
            </Stack>
        </Box>
    );
}

DirectoryInputField.propTypes = {
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

DirectoryInputField.defaultProps = {
    defaultValue: "",
    info: "",
    type: "text",
    isRequired: false,
};

export default DirectoryInputField;
