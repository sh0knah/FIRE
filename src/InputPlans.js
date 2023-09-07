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

            annualContributions: [],

            expenditures: [],

            minimumPortfolioValue: 0
        }
    });



    useEffect(() => {
        localStorage.setItem('Plans', JSON.stringify(state));

    }, [state])

    function handleAddEvent() {
        const year = document.getElementById("ContributionYear").value;
        const description = document.getElementById("ContributionDescription").value;
        const taxable = document.getElementById("ContributionTaxable").value === "" ? 0 : +document.getElementById("ContributionTaxable").value;
        const roth = document.getElementById("ContributionRoth").value === "" ? 0 : +document.getElementById("ContributionRoth").value;
        const taxDeferred = document.getElementById("ContributionTaxDeferred").value === "" ? 0 : +document.getElementById("ContributionTaxDeferred").value;

        const newRow = {
            year: +year,
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

    function handleRemoveEvent(index) {
        const events = state.onetimeEvents;
        events.splice(index, 1).sort((first, second) => { return first.year < second.year });
        setState({
            ...state,
            onetimeEvents: events
        });
    };

    function handleAddAnnual() {
        const startYear = document.getElementById("AnnualStartYear").value;
        const endYear = document.getElementById("AnnualEndYear").value;
        const owner = document.getElementById("AnnualOwner").value;
        const description = document.getElementById("AnnualDescription").value;
        const taxable = document.getElementById("AnnualTaxable").value === "" ? 0 : +document.getElementById("AnnualTaxable").value;
        const roth = document.getElementById("AnnualRoth").value === "" ? 0 : +document.getElementById("AnnualRoth").value;
        const taxDeferred = document.getElementById("AnnualTaxDeferred").value === "" ? 0 : +document.getElementById("AnnualTaxDeferred").value;

        const newRow = {
            startYear: +startYear,
            endYear: +endYear,
            owner: owner,
            description: description,
            amountTaxable: +taxable,
            amountRoth: +roth,
            amountTaxDeferred: +taxDeferred
        };
        const events = state.annualContributions.concat(newRow).sort((first, second) => { return first.year > second.year });
        setState({
            ...state,
            annualContributions:
                events
        });
    };

    function handleRemoveAnnual(index) {
        const contributions = JSON.parse(JSON.stringify(state.annualContributions)); // Deep Clone array
        contributions.splice(index, 1).sort((first, second) => { return first.year + first.owner < second.year + second.owner });
        setState({
            ...state,
            annualContributions: contributions
        });
    };

    function handleAddExpenses() {
        const year = document.getElementById("ExpenseYear").value;
        const description = document.getElementById("ExpenseDescription").value;
        const expenses = document.getElementById("ExpenseAmount").value === "" ? 0 : +document.getElementById("ExpenseAmount").value;

        const newRow = {
            year: +year,
            description: description,
            expenses: +expenses
        };
        const expenditures = state.expenditures.concat(newRow).sort((first, second) => { return first.year - second.year });
        setState({
            ...state,
            expenditures:
                expenditures
        });
    };

    function handleRemoveExpenses(index) {
        const expenses = JSON.parse(JSON.stringify(state.expenditures)); // Deep Clone array
        expenses.splice(index, 1).sort((first, second) => { return first.year - second.year });
        setState({
            ...state,
            expenditures: expenses
        });
    };



    return (
        <div id="InputPlans" className="Input">
            <div id="AnnualContributions" className="Section-Body">
                <div className="Section-Label">Annual Contributions</div>
                <div className="Section-Instructions">An empty "End Year" will assume the contribution ends at retirement.</div>
                <div className="Section-Subsection">
                    <table id="Table-AnnualContributions" className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Start Year</th>
                                <th className="FireData-Table-Header">End Year</th>
                                <th className="FireData-Table-Header">Owner (self/partner)</th>
                                <th className="FireData-Table-Header">Description</th>
                                <th className="FireData-Table-Header">Amount Taxable</th>
                                <th className="FireData-Table-Header">Amount Roth</th>
                                <th className="FireData-Table-Header">Amount Tax Deferred</th>
                                <th className="FireData-Table-Header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.annualContributions.map(function (annual, index) {
                                return (
                                    <tr key={index}>
                                        <td className="FireData-Table-Cell Year" >{annual.startYear}</td>
                                        <td className="FireData-Table-Cell Year" >{annual.endYear}</td>
                                        <td className="FireData-Table-Cell" >{annual.owner}</td>
                                        <td className="FireData-Table-Cell" >{annual.description}</td>
                                        <td className="FireData-Table-Cell Amount">{annual.amountTaxable.toLocaleString('en')}</td>
                                        <td className="FireData-Table-Cell Amount">{annual.amountRoth.toLocaleString('en')}</td>
                                        <td className="FireData-Table-Cell Amount">{annual.amountTaxDeferred.toLocaleString('en')}</td>
                                        <td className="FireData-Table-Cell"><button id="btnRemoveAnnual" onClick={() => handleRemoveAnnual(index)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="FireData-Table-Cell"><input type="year" id="AnnualStartYear" /></th>
                                <th className="FireData-Table-Cell"><input type="year" id="AnnualEndYear" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="AnnualOwner" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="AnnualDescription" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="AnnualTaxable" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="AnnualRoth" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="AnnualTaxDeferred" /></th>
                                <th className="FireData-Table-Cell"><button id="btnAddAnnual" onClick={handleAddAnnual}>Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div id="Expenditures" className="Section-Body">
                <div className="Section-Label">Annual Expenses</div>
                <div className="Section-Instructions">This is your total POST-TAX expenses per year. Withdrawals will be calculated to adjust for tax rates as predicted on the Expectations tab. <br/>Enter numbers in today's dollars. Don't account for inflation. Expenses with later dates will replace earlier expenses.</div>
                <div className="Section-Subsection">
                    <table id="Table-OnetimeContributions" className="FireData-Table">
                        <thead>
                            <tr>
                                <th className="FireData-Table-Header">Year</th>
                                <th className="FireData-Table-Header">Description</th>
                                <th className="FireData-Table-Header">Post-tax living expenses</th>
                                <th className="FireData-Table-Header">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.expenditures.map(function (expenses, index) {
                                return (
                                    <tr key={index}>
                                        <td className="FireData-Table-Cell Year" >{expenses.year}</td>
                                        <td className="FireData-Table-Cell" >{expenses.description}</td>
                                        <td className="FireData-Table-Cell Amount">{expenses.expenses.toLocaleString('en')}</td>
                                        <td className="FireData-Table-Cell"><button id="btnRemoveExpenses" onClick={() => handleRemoveExpenses(index)}>Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className="FireData-Table-Cell"><input type="year" id="ExpenseYear" /></th>
                                <th className="FireData-Table-Cell Text"><input type="test" id="ExpenseDescription" /></th>
                                <th className="FireData-Table-Cell Amount"><input type="number" id="ExpenseAmount" /></th>
                                <th className="FireData-Table-Cell"><button id="btnAddExpense" onClick={handleAddExpenses}>Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

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
                                    <td className="FireData-Table-Cell"><button id="btnRemoveContribution" onClick={() => handleRemoveEvent(index)}>Remove</button></td>
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
                                <th className="FireData-Table-Cell"><button id="btnAddContribution" onClick={handleAddEvent}>Add</button></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InputPlans