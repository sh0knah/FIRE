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
            <label htmlFor="Name" className="Field-label G1">Name: </label><input type="text" onChange={e => setState({ ...state, name: e.target.value }) } className="Field-value Text-long G2" id="Name" value={state.name} />
            <label htmlFor="Partner" className="Field-label G3">Partner: </label><input type="text" onChange={e => setState({ ...state, partner: e.target.value })} className="Field-value Text-long G4" id="Partner" value={state.partner} />

            <label htmlFor="DOB" className="Field-label G1">Date of birth: </label><input type="date" onChange={e => setState({ ...state, dob: e.target.value })} className="Field-value Date G2" id="DOB" value={state.dob} />
            <label htmlFor="DOB_Parter" className="Field-label G3">Date of birth: </label><input type="date" onChange={e => setState({ ...state, dob_Partner: e.target.value })} className="Field-value Date G4" id="DOB_Partner" value={state.dob_Partner} />

            <label htmlFor="REGoal" className="Field-label G1">Retirement goal date: </label><input type="date" onChange={e => setState({ ...state, regoal: e.target.value })} className="Field-value Date G2" id="REGoal" value={state.regoal} />
            <label htmlFor="REGoal_Partner" className="Field-label G3">Retirement goal date: </label><input type="date" onChange={e => setState({ ...state, regoal_Partner: e.target.value })} className="Field-value Date G4" id="REGoal_Partner" value={state.regoal_Partner} />

            <label htmlFor="LifeExpectancy" className="Field-label G1">Life Expectancy: </label><input type="number" onChange={e => setState({ ...state, lifeExpectancy: e.target.value })} className="Field-value Number-short G2" id="LifeExpectancy" value={state.lifeExpectancy} />
            <label htmlFor="LifeExpectancy_Partner" className="Field-label G3">Life Expectancy: </label><input type="number" onChange={e => setState({ ...state, lifeExpectancy_Partner: e.target.value })} className="Field-value Number-short G4" id="LifeExpectancy_Partner" value={state.lifeExpectancy_Partner} />
        </div>
    )
}

export default InputPersonal

/*
*/