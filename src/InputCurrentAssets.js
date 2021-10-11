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
            taxDeferredCash: 0,

            taxableStocks_Partner: 0,
            taxableBonds_Partner: 0,
            taxableCash_Partner: 0,

            rothStocks_Partner: 0,
            rothBonds_Partner: 0,
            rothCash_Partner: 0,

            taxDeferredStocks_Partner: 0,
            taxDeferredBonds_Partner: 0,
            taxDeferredCash_Partner: 0
        }
    });

    const [totals, setTotals] = useState(() => {
        return {
            taxableTotal: 0,
            rothTotal: 0,
            taxDeferredTotal: 0,

            taxableTotal_Partner: 0,
            rothTotal_Partner: 0,
            taxDeferredTotal_Partner: 0,

            portfolioTotal: 0
        }

    });



    useEffect(() => {
        localStorage.setItem('CurrentAssets', JSON.stringify(state));

        const taxableTotal = parseInt(state.taxableStocks, 10) + parseInt(state.taxableBonds, 10) + parseInt(state.taxableCash, 10);
        const rothTotal = parseInt(state.rothStocks, 10) + parseInt(state.rothBonds, 10) + parseInt(state.rothCash, 10);
        const taxDeferredTotal = parseInt(state.taxDeferredStocks, 10) + parseInt(state.taxDeferredBonds, 10) + parseInt(state.taxDeferredCash, 10);

        const taxableTotal_Partner = parseInt(state.taxableStocks_Partner, 10) + parseInt(state.taxableBonds_Partner, 10) + parseInt(state.taxableCash_Partner, 10);
        const rothTotal_Partner = parseInt(state.rothStocks_Partner, 10) + parseInt(state.rothBonds_Partner, 10) + parseInt(state.rothCash_Partner, 10);
        const taxDeferredTotal_Partner = parseInt(state.taxDeferredStocks_Partner, 10) + parseInt(state.taxDeferredBonds_Partner, 10) + parseInt(state.taxDeferredCash_Partner, 10);

        const portfolioTotal = taxableTotal + rothTotal + taxDeferredTotal + taxableTotal_Partner + rothTotal_Partner + taxDeferredTotal_Partner;

        setTotals({
            taxableTotal: taxableTotal.toLocaleString(), rothTotal: rothTotal.toLocaleString(), taxDeferredTotal: taxDeferredTotal.toLocaleString(),
            taxableTotal_Partner: taxableTotal_Partner.toLocaleString(), rothTotal_Partner: rothTotal_Partner.toLocaleString(), taxDeferredTotal_Partner: taxDeferredTotal_Partner.toLocaleString(),
            portfolioTotal: portfolioTotal.toLocaleString()
        });
    }, [state])

    return (
        <div id="InputCurrentAssets" className="Input" >
            <div id="FutureContributions" className="Section-Body">
                <div className="Section-Label">Current Assets</div>
                <div className="Section-Subsection Grid2">

                    <div className="G1 SubGrid2">
                        <div className="G2">Self</div>

                        <label htmlFor="taxableStocks" className="Field-label G1">Taxable Stocks: </label><input type="number" onChange={e => setState({ ...state, taxableStocks: +(e.target.value) })} className="Field-value Currency G2" id="TaxableStocks" value={state.taxableStocks} />
                        <label htmlFor="taxableBonds" className="Field-label G1">Taxable Bonds: </label><input type="number" onChange={e => setState({ ...state, taxableBonds: +(e.target.value) })} className="Field-value Currency G2" id="TaxableBonds" value={state.taxableBonds} />
                        <label htmlFor="taxableCash" className="Field-label G1">Taxable Cash: </label><input type="number" onChange={e => setState({ ...state, taxableCash: +(e.target.value) })} className="Field-value Currency G2" id="TaxableCash" value={state.taxableCash} />
                        <label htmlFor="taxableTotal" className="Field-label G1">Taxable Total: </label><div id="taxableTotal" className="Currency-total">{totals.taxableTotal}</div>

                        <div className="Spacer"></div>

                        <label htmlFor="rothStocks" className="Field-label G1">Roth Stocks: </label><input type="number" onChange={e => setState({ ...state, rothStocks: +(e.target.value) })} className="Field-value Currency G2" id="RothStocks" value={state.rothStocks} />
                        <label htmlFor="rothBonds" className="Field-label G1">Roth Bonds: </label><input type="number" onChange={e => setState({ ...state, rothBonds: +(e.target.value) })} className="Field-value Currency G2" id="RothBonds" value={state.rothBonds} />
                        <label htmlFor="rothCash" className="Field-label G1">Roth Cash: </label><input type="number" onChange={e => setState({ ...state, rothCash: +(e.target.value) })} className="Field-value Currency G2" id="RothCash" value={state.rothCash} />
                        <label htmlFor="rothTotal" className="Field-label G1">Roth Total: </label><div id="rothTotal" className="Currency-total">{totals.rothTotal}</div>

                        <div className="Spacer"></div>

                        <label htmlFor="taxDeferredStocks" className="Field-label G1">Tax Deferred Stocks: </label><input type="number" onChange={e => setState({ ...state, taxDeferredStocks: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredStocks" value={state.taxDeferredStocks} />
                        <label htmlFor="taxDeferredBonds" className="Field-label G1">Tax Deferred Bonds: </label><input type="number" onChange={e => setState({ ...state, taxDeferredBonds: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredBonds" value={state.taxDeferredBonds} />
                        <label htmlFor="taxDeferredCash" className="Field-label G1">Tax Deferred Cash: </label><input type="number" onChange={e => setState({ ...state, taxDeferredCash: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredCash" value={state.taxDeferredCash} />
                        <label htmlFor="taxDeferredTotal" className="Field-label G1">Tax Deferred Total: </label><div id="taxDeferredTotal" className="Currency-total">{totals.taxDeferredTotal }</div>

                    </div>

                    <div className="G2 SubGrid2">
                        <div className="G2">Partner</div>

                        <label htmlFor="taxableStocks_Partner" className="Field-label G1">Taxable Stocks: </label><input type="number" onChange={e => setState({ ...state, taxableStocks_Partner: +(e.target.value) })} className="Field-value Currency G2" id="TaxableStocks_Partner" value={state.taxableStocks_Partner} />
                        <label htmlFor="taxableBonds_Partner" className="Field-label G1">Taxable Bonds: </label><input type="number" onChange={e => setState({ ...state, taxableBonds_Partner: +(e.target.value) })} className="Field-value Currency G2" id="TaxableBonds_Partner" value={state.taxableBonds_Partner} />
                        <label htmlFor="taxableCash_Partner" className="Field-label G1">Taxable Cash: </label><input type="number" onChange={e => setState({ ...state, taxableCash_Partner: +(e.target.value) })} className="Field-value Currency G2" id="TaxableCash_Partner" value={state.taxableCash_Partner} />
                        <label htmlFor="taxableTotal_Partner" className="Field-label G1">Taxable Total: </label><div id="taxableTotal" className="Currency-total">{totals.taxableTotal_Partner}</div>

                        <div className="Spacer"></div>

                        <label htmlFor="rothStocks_Partner" className="Field-label G1">Roth Stocks: </label><input type="number" onChange={e => setState({ ...state, rothStocks_Partner: +(e.target.value )})} className="Field-value Currency G2" id="RothStocks_Partner" value={state.rothStocks_Partner} />
                        <label htmlFor="rothBonds_Partner" className="Field-label G1">Roth Bonds: </label><input type="number" onChange={e => setState({ ...state, rothBonds_Partner: +(e.target.value) })} className="Field-value Currency G2" id="RothBonds_Partner" value={state.rothBonds_Partner} />
                        <label htmlFor="rothCash_Partner" className="Field-label G1">Roth Cash: </label><input type="number" onChange={e => setState({ ...state, rothCash_Partner: +(e.target.value) })} className="Field-value Currency G2" id="RothCash_Partner" value={state.rothCash_Partner} />
                        <label htmlFor="rothTotal_Partner" className="Field-label G1">Roth Total: </label><div id="rothTotal" className="Currency-total">{totals.rothTotal_Partner}</div>

                        <div className="Spacer"></div>

                        <label htmlFor="taxDeferredStocks_Partner" className="Field-label G1">Tax Deferred Stocks: </label><input type="number" onChange={e => setState({ ...state, taxDeferredStocks_Partner: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredStocks_Partner" value={state.taxDeferredStocks_Partner} />
                        <label htmlFor="taxDeferredBonds_Partner" className="Field-label G1">Tax Deferred Bonds: </label><input type="number" onChange={e => setState({ ...state, taxDeferredBonds_Partner: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredBonds_Partner" value={state.taxDeferredBonds_Partner} />
                        <label htmlFor="taxDeferredCash_Partner" className="Field-label G1">Tax Deferred Cash: </label><input type="number" onChange={e => setState({ ...state, taxDeferredCash_Partner: +(e.target.value) })} className="Field-value Currency G2" id="Tax DeferredCash_Partner" value={state.taxDeferredCash_Partner} />
                        <label htmlFor="taxDeferredTotal_Partner" className="Field-label G1">Tax Deferred Total: </label><div id="taxDeferredTotal" className="Currency-total">{totals.taxDeferredTotal_Partner}</div>
                    </div>

                    <div className="Spacer"></div>

                    <label htmlFor="portfolioTotal" className="Field-label G1">Portfolio Total: </label><div id="portfolioTotal" className="Currency-total G2">{totals.portfolioTotal}</div>
                </div>
            </div>
        </div>
    )
}

export default InputCurrentAssets

