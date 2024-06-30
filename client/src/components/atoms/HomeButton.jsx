import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

import { Link } from "@mui/material";

function HomeButton() {
    return (
        <Link href="/">
            <FontAwesomeIcon icon={faBrain} color="accent" style={{marginRight: "0.5em"}}/>
        </Link>
    );
}

export default HomeButton;