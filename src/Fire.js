import React, { useState } from 'react';
import Input_Personal from './Input_Personal';
import './fire.css';


function saveValues(fireData) {
    debugger;
    localStorage.setItem("fireData", fireData)
}

function Fire () {
    
    //this.saveValues = () => {
        // save data to localStorage 
        //localStorage.setItem('state', JSON.stringify(this.state));
    //}

    //this.getStateFromLocalStorage = () => {
        //let data = localStorage.getItem('state');
        //if (data !== undefined) {
//            this.setState(JSON.parse(data));
  //      }
    //}


    return <>
        <div>
            <Input_Personal />

            {/* <div>{fireData.name}</div>

            <button onClick={() => saveValues(fireData)}>Save Values</button> */}
        </div>
    </>;
}

export default Fire;