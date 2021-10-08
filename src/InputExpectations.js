import React, { useEffect, useState } from 'react';
import './fire.css';



function InputExpectations() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Expectations');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
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

