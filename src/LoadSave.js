import React, { useEffect } from 'react';
import './fire.css';


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
        var fileName = document.getElementById("PlanName").value + ".json";
        download(JSON.stringify(plan), fileName, "text/json");
    }

    useEffect(() => {
        const fileSelector = document.getElementById('file-selector');
        fileSelector.addEventListener('change', (event) => {
            const fileList = event.target.files;
            loadFile(fileList[0]);
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
            window.location.reload();
        });
        reader.readAsText(file);
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
                <input type="file" id="file-selector"></input>
            </fieldset>
        </div>
    )
}

export default LoadSave