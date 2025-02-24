import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Stack, InputAdornment, IconButton } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import InfoButton from './InfoButton';

function DirectoryInputField({ hasInfo, onChange, value, defaultValue="", label, ariaLabel, setPath, info = "", type = "text", isRequired = false, }) {
    const fileInputRef = useRef(null);

    const handleSelectDirectory = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const filePath = event.target.files[0]?.path;
        if (filePath) {
            setPath(filePath);
        }
    };

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
            <input
                type="file"
                webkitdirectory="true"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </Box>
    );
}

DirectoryInputField.propTypes = {
    hasInfo: PropTypes.bool.isRequired,
    isRequired: PropTypes.bool,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired, 
    setPath: PropTypes.func.isRequired, 
    value: PropTypes.string.isRequired, 
    type: PropTypes.string, 
    defaultValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
}

export default DirectoryInputField;
