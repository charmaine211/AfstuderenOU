import React from 'react';
import PropTypes from 'prop-types';
import  {List, ListItem, ListItemIcon, IconButton, ListItemText  } from '@mui/material';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

import {VIDEO_FORMATS, IMAGE_FORMATS } from "../../config";

import {getFileExtension} from "../../common/utils/formatters";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function UploadedFiles ({ files, removeFiles }) {
    
    const getIcon = (file) => {

        if (VIDEO_FORMATS.includes(getFileExtension(file))){
            return <VideocamRoundedIcon color="accent"/>;
        } else if (IMAGE_FORMATS.includes(getFileExtension(file))) {
            return <PhotoCameraRoundedIcon color="accent"/>;
        }
            
        return <SettingsSuggestRoundedIcon color="accent"/>

    }

    const handeDelete = (file) => {
        removeFiles(file);
    }


    return (
        <List>
            {files.map((file)=>{
                return (<ListItem disablePadding key={file}                   
                secondaryAction={
                    <IconButton 
                        edge="end" 
                        aria-label="delete"
                        onClick={() => {
                            handeDelete(file);
                          }}>
                      <DeleteRoundedIcon color="accent"/>
                    </IconButton>
                  }>
                <ListItemIcon>
                    {getIcon(file)}
                </ListItemIcon>
                <ListItemText style={{width: "20em"}} primary={`... ${file.slice(-30)}`} />
            </ListItem>);
            })}
        
      </List>
    );
}

UploadedFiles.propTypes = {
   files: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default UploadedFiles;