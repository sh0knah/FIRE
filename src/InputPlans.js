import React, { useEffect, useState } from 'react';
import './fire.css';



function InputPlans() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Plans');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
            rebalanceAnnually: 1,

            onetimeEvents: [
                {
                    date: '10/31/2041',
                    amountTaxable: 100000,
                    amountRoth: 0,
                    amountTaxDeferred: 0
                }
            ],

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

    return (
        <div id="InputPlans" className="Input">
            <div id="FutureContributions" className="Section-Body">
                <div className="Section-Label">Future Contributions</div>
                <div className="Section-Subsection">
                    <table className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Date</th>
                                <th className="FireData-Table-Header">Amount Taxable</th>
                                <th className="FireData-Table-Header">Amount Roth</th>
                                <th className="FireData-Table-Header">Amount Tax Deferred</th>
                                <th className="FireData-Table-Header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {state.onetimeEvents.map(event => {
                            return (
                                <tr key="event">
                                    <td className="FireData-Table-Cell" >{ event.date }</td>
                                    <td className="FireData-Table-Cell Amount">{ event.amountTaxable.toLocaleString('en') }</td>
                                    <td className="FireData-Table-Cell Amount">{ event.amountRoth.toLocaleString('en') }</td>
                                    <td className="FireData-Table-Cell Amount">{event.amountTaxDeferred.toLocaleString('en')}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="FireData-Table-Cell"><input type="date" id="ContributionDate" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionTaxable" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionRoth" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ContributionTaxDeferred" /></th>
                                <th className="FireData-Table-Cell"><button id="btnAddContribution">Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InputPlans

