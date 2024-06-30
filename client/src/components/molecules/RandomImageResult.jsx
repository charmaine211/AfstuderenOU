import React from 'react';
import PropTypes from 'prop-types';

function RandomImageResult({ 
    avFile,
    result,
}) {
    return (
        <article
          style={{ backgroundImage: `url(${avFile})`,     
          height: "100%;",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "grid",
          placeItems: "center", 
        }}
        >
          <h1 style={{          
            fontSize: "80px",
            color: "white",
            textAlign: "center",
              }}>{result}</h1>
        </article>
      );
}

RandomImageResult.propTypes = {
    avFile: PropTypes.string.isRequired,
    results: PropTypes.string.isRequired,
}

export default RandomImageResult;

// results = model(image_path) returns a Python list of Results objects