import React, { useEffect, useState } from 'react';
import './fire.css';


function InputPersonal() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('Personal');
        const initialValue = JSON.parse(saved);
        return initialValue ||
        {
            name: null,
            partner: null,
            dob: null,
            dob_Partner: null,
            regoal: null,
            regoal_Partner: null
        }
    });



    useEffect(() => {
        localStorage.setItem('Personal', JSON.stringify(state));
    }, [state])

    return (
        <div id="InputPersonal" className="Input">
            <label htmlFor="Name" className="Field-label">Name: </label><input type="text" onChange={e => setState({ ...state, name: e.target.value }) } className="Field-value Text-long" id="Name" value={state.name} />
            <label htmlFor="DOB" className="Field-label">Date of birth: </label><input type="date" onChange={e => setState({ ...state, dob: e.target.value })} className="Field-value Date" id="DOB" value={state.dob} />
            <label htmlFor="REGoal" className="Field-label">Retirement goal date: </label><input type="date" onChange={e => setState({ ...state, regoal: e.target.value })} className="Field-value Date" id="REGoal" value={state.regoal} />

            <div className="Spacer"></div>

            <label htmlFor="Partner" className="Field-label">Partner: </label><input type="text" onChange={e => setState({ ...state, partner: e.target.value })} className="Field-value Text-long" id="Partner" value={state.partner} />
            <label htmlFor="DOB_Parter" className="Field-label">Date of birth: </label><input type="date" onChange={e => setState({ ...state, dob_Partner: e.target.value })} className="Field-value Date" id="DOB_Partner" value={state.dob_Partner} />
            <label htmlFor="REGoal_Partner" className="Field-label">Retirement goal date: </label><input type="date" onChange={e => setState({ ...state, regoal_Partner: e.target.value })} className="Field-value Date" id="REGoal_Partner" value={state.regoal_Partner} />
        </div>
    )
}

export default InputPersonal

/*
*/