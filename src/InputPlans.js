import React, { useEffect, useState } from 'react';
import './fire.css';



function InputPlans() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Plans');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
            rebalanceAnnually: 1,

            onetimeEvents: [],

            // TODO - Should this be a collection? Allow you to specify contributions during specific times?
            annualContributionsTaxable: 10000,
            annualContributionsRoth: 0,
            annualContributionsTaxDeferred: 20000,

            withdrawalStartYear: 2027,
            withdrawalAmount: 100000,

            withdrawalAdjustments: [
                {
                    startYear: null,
                    percentAdjustment: 0
                }
            ],

            minimumPortfolioValue: 0
        }
    });



    useEffect(() => {
        localStorage.setItem('Plans', JSON.stringify(state));

    }, [state])

    function handleAdd() {
        const year = document.getElementById("ContributionYear").value;
        const description = document.getElementById("ContributionDescription").value;
        const taxable = document.getElementById("ContributionTaxable").value === "" ? 0 : +document.getElementById("ContributionTaxable").value;
        const roth = document.getElementById("ContributionRoth").value === "" ? 0 : +document.getElementById("ContributionRoth").value;
        const taxDeferred = document.getElementById("ContributionTaxDeferred").value === "" ? 0 : +document.getElementById("ContributionTaxDeferred").value;

        const newRow = {
            year: year,
            description: description,
            amountTaxable: taxable,
            amountRoth: roth,
            amountTaxDeferred: taxDeferred
        };
        const events = state.onetimeEvents.concat(newRow).sort((first, second) => { return first.year > second.year });
        setState({
            ...state,
            onetimeEvents:
                events
        });
    };

    function handleRemove(index) {
        const events = state.onetimeEvents.splice(index, 1).sort((first, second) => { return first.year < second.year });
        setState({
            ...state,
            oneTimeEvents: {
                events
            }
        });
    };

    return (
        <div id="InputPlans" className="Input">
            <div id="FutureContributions" className="Section-Body">
                <div className="Section-Label">One-time Contributions / Withdrawals</div>
                <div className="Section-Instructions">Enter negative numbers for withdrawals</div>
                <div className="Section-Subsection">
                    <table id="Table-OnetimeContributions" className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Year</th>
                                <th className="FireData-Table-Header">Description</th>
                                <th className="FireData-Table-Header">Amount Taxable</th>
                                <th className="FireData-Table-Header">Amount Roth</th>
                                <th className="FireData-Table-Header">Amount Tax Deferred</th>
                                <th className="FireData-Table-Header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.onetimeEvents.map(function (event, index) {
                            return (
                                <tr key={index}>
                                    <td className="FireData-Table-Cell Year" >{ event.year }</td>
                                    <td className="FireData-Table-Cell" >{ event.description }</td>
                                    <td className="FireData-Table-Cell Amount">{ event.amountTaxable.toLocaleString('en') }</td>
                                    <td className="FireData-Table-Cell Amount">{ event.amountRoth.toLocaleString('en') }</td>
                                    <td className="FireData-Table-Cell Amount">{event.amountTaxDeferred.toLocaleString('en')}</td>
                                    <td className="FireData-Table-Cell"><button id="btnRemoveContribution" onClick={() => handleRemove(index)}>Remove</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="FireData-Table-Cell"><input type="year" id="ContributionYear" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="ContributionDescription" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionTaxable" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionRoth" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionTaxDeferred" /></th>
                                <th className="FireData-Table-Cell"><button id="btnAddContribution" onClick={handleAdd}>Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InputPlans

