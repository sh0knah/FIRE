import React, { useState } from 'react';
import './fire.css';


function Input_Personal() {
    const [name, setName] = useState('');
    const [partner, setPartner] = useState('');

    return (
        <div id="InputPersonal">
            <label for="Name" className="field_label">Name: </label><input type="text" onChange={e => setName(e.target.value)} className="text_long" id="Name" value={name} />
            <label for="Partner" className="field_label">Partner: </label><input type="text" onChange={e => setPartner(e.target.value)} className="text_long" id="Partner" value={partner} />

        </div>
    )
}

export default Input_Personal