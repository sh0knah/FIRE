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

            withdrawalStartDate: '03/22/2027',
            withdrawalAmount: 100000,

            withdrawalAdjustments: [
                {
                    startDate: null,
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
        const date = document.getElementById("ContributionDate").value;
        const description = document.getElementById("ContributionDescription").value;
        const taxable = document.getElementById("ContributionTaxable").value === "" ? 0 : document.getElementById("ContributionTaxable").value * 1;
        const roth = document.getElementById("ContributionRoth").value === "" ? 0 : document.getElementById("ContributionRoth").value * 1;
        const taxDeferred = document.getElementById("ContributionTaxDeferred").value === "" ? 0 : document.getElementById("ContributionTaxDeferred").value * 1;

        const newRow = {
            date: date,
            description: description,
            amountTaxable: taxable,
            amountRoth: roth,
            amountTaxDeferred: taxDeferred
        };
        const events = state.onetimeEvents.concat(newRow).sort((first, second) => { return first.date > second.date });
        setState({
            ...state,
            onetimeEvents: 
                events 
        });
    };

    function handleRemove(index) {
        const events = state.onetimeEvents.splice(index, 1).sort((first, second) => { return first.date < second.date });
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
                <div className="Section-Label">Future Contributions</div>
                <div className="Section-Subsection">
                    <table id="Table-OnetimeContributions" className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Date</th>
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
                                    <td className="FireData-Table-Cell" >{ event.date }</td>
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
                                <th className="FireData-Table-Cell"><input type="date" id="ContributionDate" /></th>
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

