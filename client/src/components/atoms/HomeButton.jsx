import React from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { Link as UILink} from "@mui/material";



function HomeButton() {

    return (
        <UILink href="#/" underline="none">
            <FontAwesomeIcon icon={faBrain} color="accent" style={{marginRight: "0.5em"}}/>
        </UILink>
    );
}

export default HomeButton;