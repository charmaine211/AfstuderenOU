import React from 'react';
import FooterButton from '../atoms/FooterButton';

function Footer () {
    return (
        <footer>
            <FooterButton 
                text="Privacy Policy" onClick={()=>{ alert("TODO Privacy policy")}}/>
            <FooterButton 
                text="Contact us" onClick={()=>{ alert("TODO Contact form")}}/>
        </footer>
    );
};

export default Footer;