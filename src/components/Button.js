import React from 'react';
//precisa colocar o css separado?

function Button(props){
    return(
      <button className="button" onClick={props.onClick}>
               {props.text}
            </button>
  
    );
  }

export default Button;