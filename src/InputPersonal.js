import React, { useEffect, useState } from 'react';
import './fire.css';


function InputPersonal() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Personal');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
            name: '',
            dob: '',
            regoal: '',
            lifeExpectancy: 90,

            partner: '',
            dob_Partner: '',
            regoal_Partner: '',
            lifeExpectancy_Partner: 90
        }
    });



    useEffect(() => {
        localStorage.setItem('Personal', JSON.stringify(state));
    }, [state])

    return (
        <div id="InputPersonal" className="Input">
            <div id="FutureContributions" className="Section-Body">
                <div className="Section-Label">Personal Information</div>
                <div className="Section-Subsection Grid2">
                    <div className="SubGrid2">
                        <label htmlFor="Name" className="Field-label G1">Name: </label><input type="text" onChange={e => setState({ ...state, name: e.target.value }) } className="Field-value Text-long G2" id="Name" value={state.name} />
                        <label htmlFor="DOB" className="Field-label G1">Year of birth: </label><input type="number" onChange={e => setState({ ...state, dob: e.target.value })} className="Field-value Year G2" id="DOB" value={state.dob} />
                        <label htmlFor="REGoal" className="Field-label G1">Retirement goal year: </label><input type="number" onChange={e => setState({ ...state, regoal: e.target.value })} className="Field-value Year G2" id="REGoal" value={state.regoal} />
                        <label htmlFor="LifeExpectancy" className="Field-label G1">Life Expectancy: </label><input type="number" onChange={e => setState({ ...state, lifeExpectancy: e.target.value })} className="Field-value Number-short G2" id="LifeExpectancy" value={state.lifeExpectancy} />
                    </div>

                    <div className="SubGrid2">
                        <label htmlFor="Partner" className="Field-label G1">Partner: </label><input type="text" onChange={e => setState({ ...state, partner: e.target.value })} className="Field-value Text-long G2" id="Partner" value={state.partner} />
                        <label htmlFor="DOB_Parter" className="Field-label G1">Year of birth: </label><input type="number" onChange={e => setState({ ...state, dob_Partner: e.target.value })} className="Field-value Year G2" id="DOB_Partner" value={state.dob_Partner} />
                        <label htmlFor="REGoal_Partner" className="Field-label G1">Retirement goal year: </label><input type="number" onChange={e => setState({ ...state, regoal_Partner: e.target.value })} className="Field-value Year G2" id="REGoal_Partner" value={state.regoal_Partner} />
                        <label htmlFor="LifeExpectancy_Partner" className="Field-label G1">Life Expectancy: </label><input type="number" onChange={e => setState({ ...state, lifeExpectancy_Partner: e.target.value })} className="Field-value Number-short G2" id="LifeExpectancy_Partner" value={state.lifeExpectancy_Partner} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputPersonal

/*
*/