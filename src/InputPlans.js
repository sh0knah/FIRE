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
                    date: null,
                    amountTaxable: 0,
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

        </div>
    )
}

export default InputPlans

