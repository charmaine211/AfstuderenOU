import React from "react";
import PropTypes from 'prop-types';
import "../../styles.css";

import { ThemeProvider } from '@mui/material/styles';
import { THEME } from "../../constants/theme";

import Footer from "./Footer";


function PageWrapper({ children }) {
    
    return (
        <ThemeProvider theme={THEME}>
                {children}
                <Footer />
        </ThemeProvider>
    );
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
}



export default PageWrapper;