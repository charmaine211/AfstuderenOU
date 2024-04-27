import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

function FooterButton ({ text, onClick }) {

    function handleOnClick(){
        onClick();
    }

    return (
        <Button variant="text" onClick={handleOnClick}>{ text }</Button>
    );
}

FooterButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default FooterButton;