

function calculateWithdrawal(taxRateTable, expenditures) {
    if (expenditures === 0) {
        return 0;
    }

    let incomeAtBracket = taxRateTable.deductions;
    let netAtBracket = incomeAtBracket;
    let totalNet = netAtBracket;
    let totalGross = totalNet;
    let netRemaining = expenditures - incomeAtBracket;

    for (let b = 0; b < taxRateTable.brackets.length; b++) {
        let rate = taxRateTable.brackets[b].rate;
        const grossRemainingAtNextBracket = netRemaining / (1 - rate);
        if (b === 0) {
            incomeAtBracket = taxRateTable.brackets[b].earningsUpTo;
        } else if (b === taxRateTable.brackets.length - 1) {
            incomeAtBracket = grossRemainingAtNextBracket;
        }
        else {
            incomeAtBracket = Math.min(grossRemainingAtNextBracket,
                taxRateTable.brackets[b].earningsUpTo - taxRateTable.brackets[b - 1].earningsUpTo);
        }

        netAtBracket = incomeAtBracket - (incomeAtBracket * rate);
        totalNet += netAtBracket;
        totalGross += incomeAtBracket;
        netRemaining -= netAtBracket;
    }

    return totalGross;
}

function modelResults(personal, currentAssets, plan, expectations) {

    const startYear = new Date().getFullYear();

    const age_Self = startYear - personal.dob;
    const retirementYear_Self = personal.regoal;
    const lifeExpectancy_Self = personal.lifeExpectancy;
    const planLength_Self = lifeExpectancy_Self - age_Self;

    const age_Partner = startYear - personal.dob_Partner;
    //const retirementYear_Partner = personal.regoal_Partner;
    const lifeExpectancy_Partner = personal.lifeExpectancy_Partner;
    const planLength_Partner = lifeExpectancy_Partner - age_Partner;

    const planLength = planLength_Self > planLength_Partner ? planLength_Self : planLength_Partner;
    //const endYear = startYear + planLength;

    const startTaxableStocks = +currentAssets.taxableStocks;
    const startRothStocks = +currentAssets.rothStocks;
    const startTaxDeferredStocks = +currentAssets.taxDeferredStocks;

    const startTaxableStocks_Partner = +currentAssets.taxableStocks_Partner;
    const startRothStocks_Partner = +currentAssets.rothStocks_Partner;
    const startTaxDeferredStocks_Partner = +currentAssets.taxDeferredStocks_Partner;

    const returnIndexStart = 1;
    const numberOfIterations = 50;

    let iterations = [];
    for (let i = 0; i < numberOfIterations; i++) {

        let returnIndex = returnIndexStart + i; // Go through a different set of years each time

        var iterationResults = [];

        // TODO - don't combine these yet. 
        //  Start with the value from the person who will be eligible for withdrawals first.
        //  Then add the other partner when they are eligible.
        let taxableStocks = startTaxableStocks + startTaxableStocks_Partner;
        let rothStocks = startRothStocks + startRothStocks_Partner;
        let taxDeferredStocks = startTaxDeferredStocks + startTaxDeferredStocks_Partner;

        let expenditures = 0; // We'll set this later.
        let pensionAmount = 0;
        let socialSecurityAmount = 0;
        let overspend = 0;

        let annualContributionsTaxable = 0;
        let annualContributionsRoth = 0;
        let annualContributionsTaxDeferred = 0;

        let inflationRate = 0.0324;

        let taxRateTable = [];

        // TODO - ask the user if it's OK to "wrap around?" If not, what? Assume fixed rate of return? Randomize?
        for (let yearIdx = 0; yearIdx < planLength; yearIdx++) {

            let year = startYear + yearIdx;

            if (returnIndex >= stockResults.length)
                returnIndex = 0;

            for (let p = 0; p < expectations.pensions.length; p++) {
                if (+(expectations.pensions[p].startYear) === year) {
                    pensionAmount += expectations.pensions[p].amount;
                    // TODO - account for death scenarios
                }
            }

            // TODO - account for death scenarios
            if (year === +(expectations.ssyear)) {
                socialSecurityAmount += expectations.ssamount;
            }
            if (year === +(expectations.ssyear_Partner)) {
                socialSecurityAmount += expectations.ssamount_Partner;
            }
            
            for (let s = 0; s < plan.expenditures.length; s++) {
                if (+(plan.expenditures[s].year) === year) {
                    expenditures = plan.expenditures[s].expenses;
                }
            }

            // Get the projected tax taxRates
            for (let t = 0; t < expectations.taxRates.length; t++) {
                if (+(expectations.taxRates[t].startYear) === year) {
                    taxRateTable = expectations.taxRates[t];
                }
            }


            // Figure the withdrawals before the increase. It's safer.
            
            // calculate withdrawal amount net of taxes
            // TODO - don't tax amounts coming from Roth accounts
            const grossExpenditures = calculateWithdrawal(taxRateTable, expenditures);

            // Cover expenditures from SS and Pension first, then withdraw with is necessary from accounts.
            let withdrawal = grossExpenditures - (pensionAmount + socialSecurityAmount);


            if (withdrawal < 0) {
                // put any remaining amount into taxable investments.
                // using a negative value so that we subtract a negative - adding to savings.
                taxableStocks -= withdrawal;
            }
            else {
                // TODO - determine order of withdrawals
                // currently: empty taxable accounts first, then roth, then tax deferred.
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
            if (withdrawal > 0) {
                overspend += withdrawal;
            }

            // Add one-time contributions / withdrawals
            for (let c = 0; c < plan.onetimeEvents.length; c++) {
                if (+(plan.onetimeEvents[c].year) === year) {
                    taxableStocks += plan.onetimeEvents[c].amountTaxable;
                    rothStocks += plan.onetimeEvents[c].amountRoth;
                    taxDeferredStocks += plan.onetimeEvents[c].amountTaxDeferred;
                }
            }

            // TODO - calculate return on bonds and cash
            
            // Get inflation rate
            // for (let i = 0; i < expectations.inflationRates.length; i++) {
            //     if (expectations.inflationRates[i].startYear === year) {
            //         inflationRate = expectations.inflationRates[i].rate;
            //     }
            // }
            inflationRate = expectations.inflationRate;

            const stockReturn = stockResults[returnIndex] - inflationRate;
            taxableStocks = taxableStocks * (1 + stockReturn);
            rothStocks = rothStocks * (1 + stockReturn);
            taxDeferredStocks = taxDeferredStocks * (1 + stockReturn);

            // Assume contribution at the end of the year (after return is calculated)
            for (let c = 0; c < plan.annualContributions.length; c++) {
                // Contributions starting this year
                if (plan.annualContributions[c].startYear === year) {
                    annualContributionsTaxable += plan.annualContributions[c].amountTaxable;
                    annualContributionsRoth += plan.annualContributions[c].amountRoth;
                    annualContributionsTaxDeferred += plan.annualContributions[c].amountTaxDeferred;
                }

                // Contributions ending this year
                // TODO - account for owner of contribution and use correct retirement year to end
                if (plan.annualContributions[c].endYear === year ||
                        (plan.annualContributions[c].endYear === 0 && year === retirementYear_Self)) {
                    annualContributionsTaxable -= plan.annualContributions[c].amountTaxable;
                    annualContributionsRoth -= plan.annualContributions[c].amountRoth;
                    annualContributionsTaxDeferred -= plan.annualContributions[c].amountTaxDeferred;
                }
            }

            taxableStocks += annualContributionsTaxable;
            rothStocks += annualContributionsRoth;
            taxDeferredStocks += annualContributionsTaxDeferred;

            iterationResults.push({ year: year, value: taxDeferredStocks + taxableStocks + rothStocks - overspend });
            returnIndex++;

        }
        const endAmount = iterationResults[iterationResults.length - 1].value;
        iterations.push({ success: (endAmount > 0), results: iterationResults });
    }
    return iterations;
}

const firstHistoryYear = 1915;
const numHistoryYears = 107;
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