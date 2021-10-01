import React, { useEffect, useState } from 'react';
import './fire.css';


function InputCurrentAssets() {

    const [state, setState] = useState(() => {

        const saved = localStorage.getItem('CurrentAssets');
        const initialValue = JSON.parse(saved);
        return initialValue ||
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
        }
    });

    const [totals, setTotals] = useState(() => {
        return {
            taxableTotal: 0,
            rothTotal: 0,
            taxDeferredTotal: 0,
            portfolioTotal: 0
        }

    });



    useEffect(() => {
        localStorage.setItem('CurrentAssets', JSON.stringify(state));

        var taxableTotal = parseInt(state.taxableStocks, 10) + parseInt(state.taxableBonds, 10) + parseInt(state.taxableCash, 10);
        var rothTotal = parseInt(state.rothStocks, 10) + parseInt(state.rothBonds, 10) + parseInt(state.rothCash, 10);
        var taxDeferredTotal = parseInt(state.taxDeferredStocks, 10) + parseInt(state.taxDeferredBonds, 10) + parseInt(state.taxDeferredCash, 10);
        var portfolioTotal = taxableTotal + rothTotal + taxDeferredTotal;

        setTotals( {taxableTotal: taxableTotal.toLocaleString(), rothTotal: rothTotal.toLocaleString(), taxDeferredTotal: taxDeferredTotal.toLocaleString(), portfolioTotal: portfolioTotal.toLocaleString() });
    }, [state])

    return (
        <div id="InputCurrentAssets" className="Input">
            <label htmlFor="taxableStocks" className="Field-label G1">Taxable Stocks: </label><input type="number" onChange={e => setState({ ...state, taxableStocks: e.target.value })} className="Field-value Currency G2" id="TaxableStocks" value={state.taxableStocks} />
            <label htmlFor="rothStocks" className="Field-label G3">Roth Stocks: </label><input type="number" onChange={e => setState({ ...state, rothStocks: e.target.value })} className="Field-value Currency G4" id="RothStocks" value={state.rothStocks} />

            <label htmlFor="taxableBonds" className="Field-label G1">Taxable Bonds: </label><input type="number" onChange={e => setState({ ...state, taxableBonds: e.target.value })} className="Field-value Currency G2" id="TaxableBonds" value={state.taxableBonds} />
            <label htmlFor="rothBonds" className="Field-label G3">Roth Bonds: </label><input type="number" onChange={e => setState({ ...state, rothBonds: e.target.value })} className="Field-value Currency G4" id="RothBonds" value={state.rothBonds} />

            <label htmlFor="taxableCash" className="Field-label G1">Taxable Cash: </label><input type="number" onChange={e => setState({ ...state, taxableCash: e.target.value })} className="Field-value Currency G2" id="TaxableCash" value={state.taxableCash} />
            <label htmlFor="rothCash" className="Field-label G3">Roth Cash: </label><input type="number" onChange={e => setState({ ...state, rothCash: e.target.value })} className="Field-value Currency G4" id="RothCash" value={state.rothCash} />

            <label htmlFor="taxableTotal" className="Field-label G1">Taxable Total: </label><div id="taxableTotal" className="Currency-total">{totals.taxableTotal}</div>
            <label htmlFor="rothTotal" className="Field-label G3">Roth Total: </label><div id="rothTotal" className="Currency-total">{totals.rothTotal}</div>

            <div className="Spacer"></div>

            <label htmlFor="taxDeferredStocks" className="Field-label G1">Tax Deferred Stocks: </label><input type="number" onChange={e => setState({ ...state, taxDeferredStocks: e.target.value })} className="Field-value Currency G2" id="Tax DeferredStocks" value={state.taxDeferredStocks} />
            <label htmlFor="taxDeferredBonds" className="Field-label G1">Tax Deferred Bonds: </label><input type="number" onChange={e => setState({ ...state, taxDeferredBonds: e.target.value })} className="Field-value Currency G2" id="Tax DeferredBonds" value={state.taxDeferredBonds} />
            <label htmlFor="taxDeferredCash" className="Field-label G1">Tax Deferred Cash: </label><input type="number" onChange={e => setState({ ...state, taxDeferredCash: e.target.value })} className="Field-value Currency G2" id="Tax DeferredCash" value={state.taxDeferredCash} />
            <label htmlFor="taxDeferredTotal" className="Field-label G1">Tax Deferred Total: </label><div id="taxDeferredTotal" className="Currency-total">{totals.taxDeferredTotal }</div>

            <div className="Spacer"></div>
            <div className="Spacer"></div>
            <div className="Spacer"></div>

            <label htmlFor="portfolioTotal" className="Field-label G1">Portfolio Total: </label><div id="portfolioTotal" className="Currency-total G2">{totals.portfolioTotal }</div>

        </div>
    )
}

export default InputCurrentAssets

