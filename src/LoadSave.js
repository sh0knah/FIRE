import React, { useEffect, useState } from 'react';
import './fire.css';
var fs = require("fs");


function LoadSave() {

    function download(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function saveFile() {
        var plan = {};
        plan.personal = localStorage.getItem('Personal');
        plan.currentAssets = localStorage.getItem('CurrentAssets');
        plan.expectations = localStorage.getItem('Expectations');
        plan.plans = localStorage.getItem('Plans');

        download(JSON.stringify(plan), "FIRE Plan.json", "text/json");
    }

    useEffect(() => {
        const fileSelector = document.getElementById('file-selector');
        fileSelector.addEventListener('change', (event) => {
            const fileList = event.target.files;
            loadFile(fileList[0]);
            //console.log(fileList);
        });
    });

    function loadFile(file) {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            var plan = JSON.parse(event.target.result);
            localStorage.setItem('Personal', plan.personal);
            localStorage.setItem('CurrentAssets', plan.currentAssets);
            localStorage.setItem('Expectations', plan.expectations);
            localStorage.setItem('Plans', plan.plans);
            alert('loaded');
        });
        reader.readAsText(file);

        // fetch("FIRE Plan.json")
        //     //.then(response => response.json())
        //     .then(response => eval(response.json()))
        //     .then(json => //console.log(json.personal)
        //          localStorage.setItem('Personal', json.Personal)
        //     );
    }

    return (
        <div id="LoadSave" className="Input">
            <fieldset>
                <legend>Save your plan to a file</legend>
                    Plan Name: <input type="text" style={{ width: "20%", minWidth:"250px"}} id="PlanName"/>&nbsp;
                <button onClick={saveFile}>Save</button>
            </fieldset>
            <br/><br/>
            <fieldset>
                <legend>Load a plan from a file</legend>
                <input type="file" id="file-selector" multiple></input>
            </fieldset>
        </div>
    )
}

export default LoadSave
