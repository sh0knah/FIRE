

function modelResults(personal, currentAssets, plan, expectations) {


    debugger;
    const startYear = new Date().getFullYear();
    const age = startYear - (new Date(personal.dob).getFullYear());
    const retirementYear = new Date(personal.regoal).getFullYear();
    const withdrawalYear = new Date(plan.withdrawalStartDate).getFullYear();
    const lifeExpectancy = personal.lifeExpectancy;
    const planLength = lifeExpectancy - age;
    const endYear = startYear + planLength;

    let startTaxableStocks = +currentAssets.taxableStocks;
    let startRothStocks = +currentAssets.rothStocks;
    let startTaxDeferredStocks = +currentAssets.taxDeferredStocks;

    const returnIndexStart = 25;

    let iterations = [];
    for (let i = 0; i < 20; i++) {
        let returnIndex = returnIndexStart + i; // Got through a different set of years each time

        var iterationResults = [];
        let taxableStocks = startTaxableStocks;
        let rothStocks = startRothStocks;
        let taxDeferredStocks = startTaxDeferredStocks;


        // TODO - ask the user if it's OK to "wrap around?" If not, what? Assume fixed rate of return? Randomize?
        for (let yearIdx = 0; yearIdx < planLength; yearIdx++) {
            let year = startYear + yearIdx;
            console.log("returnIndex: " + returnIndex);
            let withdrawal = plan.withdrawalAmount;

            if (returnIndex >= stockResults.length)
                returnIndex = 0;

            const stockReturn = stockResults[returnIndex];
            taxableStocks = taxableStocks * (1 + stockReturn);
            rothStocks = rothStocks * (1 + stockReturn);
            taxDeferredStocks = taxDeferredStocks * (1 + stockReturn);

            // Assume contribution at the end of the year (after return is calculated)
            if (year < retirementYear) // TODO - account for where in the year the retirement occurs
            {
                taxableStocks += plan.annualContributionsTaxable;
                rothStocks += plan.annualContributionsRoth;
                taxDeferredStocks += plan.annualContributionsTaxDeferred;
            }

            if (year > withdrawalYear) {
                // TODO - determine order of withdrawals
                // currently: empty taxable accounts first, then roth, then taxdeferred.
                // should be: based on tax rules to minimize tax impact.
                if (taxableStocks > withdrawal) {
                    taxableStocks -= withdrawal;
                    withdrawal = 0;
                }
                else if (taxableStocks > 0) {
                    withdrawal -= taxableStocks;
                    taxableStocks = 0;
                }

                if (rothStocks > withdrawal) {
                    rothStocks -= withdrawal;
                    withdrawal = 0;
                }
                else if (rothStocks > 0) {
                    withdrawal -= rothStocks;
                    rothStocks = 0;
                }

                if (taxDeferredStocks > withdrawal) {
                    taxDeferredStocks -= withdrawal;
                    withdrawal = 0;
                }
                else if (taxDeferredStocks > 0) {
                    withdrawal -= taxDeferredStocks;
                    taxDeferredStocks = 0;
                }


            }

            returnIndex++;
            iterationResults.push(taxDeferredStocks);

        }
        console.log("==============");
        iterations.push(iterationResults);
    }
    debugger;
}

const stockResults = [ // 1915-2021
    0.8149,
    -0.0419,
    -0.2171,
    0.1051,
    0.3045,
    -0.329,
    0.123,
    0.215,
    -0.027,
    0.2616,
    0.2537,
    0.0405,
    0.2767,
    0.4948,
    -0.1717,
    -0.3377,
    -0.5267,
    -0.2307,
    0.6669,
    0.0414,
    0.3853,
    0.2482,
    -0.3282,
    0.2806,
    -0.0292,
    -0.1272,
    -0.1538,
    0.0761,
    0.1381,
    0.1209,
    0.2665,
    -0.0814,
    0.0223,
    -0.0213,
    0.1288,
    0.1763,
    0.1437,
    0.0842,
    -0.0377,
    0.4396,
    0.2077,
    0.0227,
    -0.1277,
    0.3396,
    0.164,
    -0.0934,
    0.1871,
    -0.1081,
    0.17,
    0.1457,
    0.1088,
    -0.1894,
    0.152,
    0.0427,
    -0.1519,
    0.0482,
    0.0611,
    0.1458,
    -0.1658,
    -0.2757,
    0.3832,
    0.1786,
    -0.1727,
    -0.0315,
    0.0419,
    0.1493,
    -0.0923,
    0.196,
    0.2027,
    -0.0374,
    0.2766,
    0.2258,
    0.0226,
    0.1185,
    0.2696,
    -0.0434,
    0.2032,
    0.0417,
    0.1372,
    0.0214,
    0.3345,
    0.2601,
    0.2264,
    0.161,
    0.2522,
    -0.0617,
    -0.071,
    -0.1676,
    0.2532,
    0.0315,
    -0.0061,
    0.1629,
    0.0643,
    -0.3384,
    0.1882,
    0.1102,
    0.0553,
    0.0726,
    0.265,
    0.0752,
    -0.0223,
    0.1342,
    0.2508,
    -0.0563,
    0.2234,
    0.0725,
    0.1236
]

export default modelResults