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
        </div>
    )
}

export default InputExpectations

