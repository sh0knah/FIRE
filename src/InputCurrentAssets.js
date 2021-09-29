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
            <label htmlFor="taxableStocks" className="Field-label">Taxable Stocks: </label><input type="number" onChange={e => setState({ ...state, taxableStocks: e.target.value })} className="Field-value Currency" id="TaxableStocks" value={state.taxableStocks} />
            <label htmlFor="taxableBonds" className="Field-label">Taxable Bonds: </label><input type="number" onChange={e => setState({ ...state, taxableBonds: e.target.value })} className="Field-value Currency" id="TaxableBonds" value={state.taxableBonds} />
            <label htmlFor="taxableCash" className="Field-label">Taxable Cash: </label><input type="number" onChange={e => setState({ ...state, taxableCash: e.target.value })} className="Field-value Currency" id="TaxableCash" value={state.taxableCash} />
            <label htmlFor="taxableTotal" className="Field-label">Taxable Total: </label><div id="taxableTotal" className="Currency-total">{ totals.taxableTotal }</div>

            <div className="Spacer"></div>

            <label htmlFor="rothStocks" className="Field-label">Roth Stocks: </label><input type="number" onChange={e => setState({ ...state, rothStocks: e.target.value })} className="Field-value Currency" id="RothStocks" value={state.rothStocks} />
            <label htmlFor="rothBonds" className="Field-label">Roth Bonds: </label><input type="number" onChange={e => setState({ ...state, rothBonds: e.target.value })} className="Field-value Currency" id="RothBonds" value={state.rothBonds} />
            <label htmlFor="rothCash" className="Field-label">Roth Cash: </label><input type="number" onChange={e => setState({ ...state, rothCash: e.target.value })} className="Field-value Currency" id="RothCash" value={state.rothCash} />
            <label htmlFor="rothTotal" className="Field-label">Roth Total: </label><div id="rothTotal" className="Currency-total">{totals.rothTotal }</div>

            <div className="Spacer"></div>

            <label htmlFor="taxDeferredStocks" className="Field-label">Tax Deferred Stocks: </label><input type="number" onChange={e => setState({ ...state, taxDeferredStocks: e.target.value })} className="Field-value Currency" id="Tax DeferredStocks" value={state.taxDeferredStocks} />
            <label htmlFor="taxDeferredBonds" className="Field-label">Tax Deferred Bonds: </label><input type="number" onChange={e => setState({ ...state, taxDeferredBonds: e.target.value })} className="Field-value Currency" id="Tax DeferredBonds" value={state.taxDeferredBonds} />
            <label htmlFor="taxDeferredCash" className="Field-label">Tax Deferred Cash: </label><input type="number" onChange={e => setState({ ...state, taxDeferredCash: e.target.value })} className="Field-value Currency" id="Tax DeferredCash" value={state.taxDeferredCash} />
            <label htmlFor="taxDeferredTotal" className="Field-label">Tax Deferred Total: </label><div id="taxDeferredTotal" className="Currency-total">{totals.taxDeferredTotal }</div>

            <div className="Spacer"></div>

            <label htmlFor="portfolioTotal" className="Field-label">Portfolio Total: </label><div id="portfolioTotal" className="Currency-total">{totals.portfolioTotal }</div>

        </div>
    )
}

export default InputCurrentAssets

/*
*/