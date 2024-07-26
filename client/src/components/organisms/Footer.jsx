import React from 'react';
import FooterButton from '../atoms/FooterButton';

function Footer () {

    const handleGetDocumentation = () => {
        window.open("https://github.com/charmaine211/Automatic_Driver_Gaze_Detection/blob/main/README.md");
    };

    const handeGetPrivacyPolicy = () => {
        window.open("https://github.com/charmaine211/Automatic_Driver_Gaze_Detection/blob/main/PRIVACY_POLICY.md")
    };

    // handleContact = () => {
    //     alert("TODO Contact form")
    // }

    return (
        <footer>
            <FooterButton 
                text="Privacy Policy" onClick={handeGetPrivacyPolicy}/>
            {/* <FooterButton 
                text="Contact us" onClick={()=>{ }}/> */}
            <FooterButton 
                text="Instructions" onClick={handleGetDocumentation}/>
        </footer>
    );
};

export default Footer;