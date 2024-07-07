import React from "react";
import Instruction from "../atoms/Instruction";

function Instructions({ instructions }) {
    return (
        <>
            {instructions.map((instruction, index) => (
                <Instruction key={index} instruction={instruction} />
            ))}
        </>
    );
}

export default Instructions;
