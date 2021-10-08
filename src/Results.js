import React, { useEffect, useState } from 'react';
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

    modelResults(personal, currentAssets, plans, expectations);

    return (
        <div id="Results" className="Input">

        </div>
    )
}

export default Results

