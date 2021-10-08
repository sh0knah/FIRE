import React, { useEffect, useState } from 'react';
import Chart from "react-google-charts";
import './fire.css';

import modelResults from './Calculations';



function Results() {

    // Prevent multiple rendering

    const personal = JSON.parse(localStorage.getItem('Personal')) ||
    {
        name: '',
        dob: '',
        regoal: '',
        lifeExpectancy: 90,

        partner: '',
        dob_Partner: '',
        regoal_Partner: '',
        lifeExpectancy_Partner: 90
    };

    const currentAssets = JSON.parse(localStorage.getItem('CurrentAssets')) ||
    {
        taxableStocks: 0,
        taxableBonds: 0,
        taxableCash: 0,

        rothStocks: 0,
        rothBonds: 0,
        rothCash: 0,

        taxDeferredStocks: 0,
        taxDeferredBonds: 0,
        taxDeferredCash: 0
    };

    const plans = JSON.parse(localStorage.getItem('Plans')) ||
    {
        rebalanceAnnually: 1,

        onetimeEvents: [
            {
                year: null,
                amountTaxable: 0,
                amountRoth: 0,
                amountTaxDeferred: 0
            }
        ],

        annualContributionsTaxable: 0,
        annualContributionsRoth: 0,
        annualContributionsTaxDeferred: 0,

        withdrawalStartYear: null,
        withdrawalAmount: 0,

        withdrawalAdjustments: [
            {
                startYear: null,
                percentAdjustment: 0
            }
        ],

        minimumPortfolioValue: 0
    };

    const expectations = JSON.parse(localStorage.getItem('Expectations')) ||
    {
        pensions: [
            {
                owner: '',
                startYear: null,
                annualAmount: 0,
                //inflationIncreases: 0,
                onDeath: {
                    payout: 0,
                    continuedPayment: 0
                }
            }
        ],
        socialSecurity: [
            {
                owner: '',
                startYear: null,
                amount: 0,
                expectedPercentage: 1 // use percentage to indicate expected payout reductions
            }
        ],
        taxRates: [
            {
                startYear: null,
                brackets: [
                    {
                        earningsUpTo: 50000,
                        rate: 0
                    },
                    {
                        earningsUpTo: 100000,
                        rate: .2
                    }
                ]
            }
        ]
    };

    const iterations = modelResults(personal, currentAssets, plans, expectations);
    var series = [["Year"]];

    let maxValue = 0;
    let maxEndingValue = 0;
    let minValue = 0;
    let minEndingValue = 0;
    let success = 0.0;

    // Shape iterations for Google chart
    // Create the array dimensions and set up the series labels
    for (let i = 0; i < iterations.length; i++) {
        series[0].push("Model " + (+i + 1));
    }
    for (let s = 0; s < iterations[0].results.length; s++) {
        series.push([new Date([iterations[0].results[s].year], 1, 1)]);
    }
    // Now go back and set the values
    for (let i = 0; i < iterations.length; i++) {
        if (i === 0) {
            maxValue = iterations[i].results[0].value;
            minValue = iterations[i].results[0].value;
        }
        for (let s = 0; s < iterations[i].results.length; s++) {
            // TODO - replace this code with some min/max lambda functions
            const value = iterations[i].results[s].value;
            maxValue = Math.max(maxValue, value);
            minValue = Math.min(minValue, value);
            if (s === iterations[i].results.length - 1) {
                if (i === 0) {
                    maxEndingValue = value;
                    minEndingValue = value;
                } else {
                    maxEndingValue = Math.max(maxEndingValue, value);
                    minEndingValue = Math.min(minEndingValue, value);
                }
                if (iterations[i].success)
                    success++;
            }
            series[s + 1].push(value);
        }
    }

    let successPercent = (success / iterations.length) * 100;

    return (
        <div id="Results" className="Output-Chart">
            <Chart
                width={'80vw'}
                height={'600px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={series}
                options={{
                    title: 'Possible performance models',
                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: minValue },
                    // For the legend to fit, we make the chart area smaller
                    //chartArea: { width: '50%', height: '70%' },
                    legend: { position: 'none' },
                    lineWidth: 1
                }}
            />
            <div className="Output-Table">
                <div>Plan succeeded {successPercent}% of the time.</div>
                <table>
                    <tbody>
                        <tr><td>Max value</td><td className="Amount">{maxValue.toLocaleString('en', { style: 'currency', currency: 'USD'}) }</td></tr>
                        <tr><td>Min value</td><td className="Amount">{minValue.toLocaleString('en', { style: 'currency', currency: 'USD' })}</td></tr>
                        <tr><td>Max ending value</td><td className="Amount">{maxEndingValue.toLocaleString('en', { style: 'currency', currency: 'USD' })}</td></tr>
                        <tr><td>Min ending value</td><td className="Amount">{minEndingValue.toLocaleString('en', { style: 'currency', currency: 'USD' })}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Results

