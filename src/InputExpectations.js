import React, { useEffect, useState } from 'react';
import './fire.css';



function InputExpectations() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Expectations');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
            inflationRates: [
                {
                    startYear: 2021,
                    rate: .0324
                }
            ],
            pensions: [],
            
            ssyear: 0,
            ssamount: 0,
            ssyear_Partner: 0,
            ssamount_Partner: 0,
            
            taxRates: [
                {
                    startYear: 2021,
                    deductions: 25100,
                    brackets: [
                        {
                            earningsUpTo: 19900,
                            rate: .1
                        },
                        {
                            earningsUpTo: 81050,
                            rate: .12
                        },
                        {
                            earningsUpTo: 172750,
                            rate: .22
                        },
                        {
                            earningsUpTo: 329850,
                            rate: .24
                        },
                        {
                            earningsUpTo: 418850,
                            rate: .32
                        },
                        {
                            earningsUpTo: 628300,
                            rate: .35
                        },
                        {
                            earningsUpTo: 1000000000,
                            rate: .37
                        }
                    ]
                }
            ]
        }
    });



    useEffect(() => {
        localStorage.setItem('Expectations', JSON.stringify(state));

    }, [state])

    function handleAddPension() {
        const startYear = document.getElementById("PensionStartYear").value;
        const owner = document.getElementById("PensionOwner").value;
        const description = document.getElementById("PensionDescription").value;
        const amount = document.getElementById("PensionAmount").value === "" ? 0 : +document.getElementById("PensionAmount").value;

        const newRow = {
            startYear: +startYear,
            owner: owner,
            description: description,
            amount: +amount
        };
        const pensions = state.pensions.concat(newRow).sort((first, second) => { return first.year > second.year });
        setState({
            ...state,
            pensions:
                pensions
        });
    };

    function handleRemovePension(index) {
        const pensions = JSON.parse(JSON.stringify(state.pensions)); // Deep Clone array
        pensions.splice(index, 1).sort((first, second) => { return first.startYear + first.owner < second.startYear + second.owner });
        setState({
            ...state,
            pensions: pensions
        });
    };

    return (
        <div id="InputExpectations" className="Input">
            <div id="SocialSecurity" className="Section-Body">
                <div className="Section-Label">Social Security</div>
                <div className="Section-Instructions"></div>
                <div className="Section-Subsection">
                    <div className="Section-Subsection Grid2">
                        <div className="SubGrid2">
                            <label htmlFor="Name" className="Field-label G1">Self </label>
                            <label htmlFor="SSYear" className="Field-label G1">Start payments (year): </label><input type="number" onChange={e => setState({ ...state, ssyear: +(e.target.value) })} className="Field-value Year G2" id="SSYear" value={state.ssyear} />
                            <label htmlFor="SSAmount" className="Field-label G1">Amount: </label><input type="number" onChange={e => setState({ ...state, ssamount: +(e.target.value) })} className="Field-value Currency G2" id="SSAmount" value={state.ssamount} />
                        </div>

                        <div className="SubGrid2">
                            <label htmlFor="Name_Partner" className="Field-label G1">Partner </label>
                            <label htmlFor="SSYear_Partner" className="Field-label G1">Start payments (year): </label><input type="number" onChange={e => setState({ ...state, ssyear_Partner: +(e.target.value) })} className="Field-value Year G2" id="SSYear_Partner" value={state.ssyear_Partner} />
                            <label htmlFor="SSAmount_Partner" className="Field-label G1">Amount: </label><input type="number" onChange={e => setState({ ...state, ssamount_Partner: +(e.target.value) })} className="Field-value Currency G2" id="SSAmount_Partner" value={state.ssamount_Partner} />
                        </div>
                    </div>
                </div>
            </div>

            <div id="Pensions" className="Section-Body">
                <div className="Section-Label">Pensions</div>
                <div className="Section-Instructions"></div>
                <div className="Section-Subsection">
                    <table id="Table-Pensions" className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Start Year</th>
                                <th className="FireData-Table-Header">Owner (self/partner)</th>
                                <th className="FireData-Table-Header">Description</th>
                                <th className="FireData-Table-Header">Amount</th>
                                <th className="FireData-Table-Header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.pensions.map(function (pension, index) {
                                return (
                                    <tr key={index}>
                                        <td className="FireData-Table-Cell Year" >{pension.startYear}</td>
                                        <td className="FireData-Table-Cell" >{pension.owner}</td>
                                        <td className="FireData-Table-Cell" >{pension.description}</td>
                                        <td className="FireData-Table-Cell Amount">{pension.amount.toLocaleString('en')}</td>
                                        <td className="FireData-Table-Cell"><button id="btnRemovePension" onClick={() => handleRemovePension(index)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="FireData-Table-Cell"><input type="year" id="PensionStartYear" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="PensionOwner" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="PensionDescription" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="PensionAmount" /></th>
                                <th className="FireData-Table-Cell"><button id="btnAddPension" onClick={handleAddPension}>Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InputExpectations

