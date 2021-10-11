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
                    rate: .03
                }
            ],
            pensions: [
                {
                    owner: '',
                    startYear: 2039,
                    annualAmount: 13488,
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
                    startYear: 2039,
                    annualAmount: 38136,
                    expectedPercentage: 1 // use percentage to indicate expected payout reductions
                },
                {
                    owner: '',
                    startYear: 2041,
                    annualAmount: 33288,
                    expectedPercentage: 1 // use percentage to indicate expected payout reductions
                }
            ],
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

    return (
        <div id="InputExpectations" className="Input">

        </div>
    )
}

export default InputExpectations

