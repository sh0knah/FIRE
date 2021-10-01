import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './fire.css';
import 'react-tabs/style/react-tabs.css';

import InputPersonal from './InputPersonal';
import InputCurrentAssets from './InputCurrentAssets';
import InputPlans from './InputPlans';
import InputExpectations from './InputExpectations';
import Results from './Results';


function Fire () {

    return <>
        <div>
            <Tabs selectedTabClassName="Selected-tab">
                <TabList className="Tab">
                    <Tab>Personal Information</Tab>
                    <Tab>Current Assets</Tab>
                    <Tab>Plans</Tab>
                    <Tab>Expectations</Tab>
                    <Tab>Results</Tab>
                </TabList>

                <TabPanel><InputPersonal /></TabPanel>
                <TabPanel><InputCurrentAssets /></TabPanel>
                <TabPanel><InputPlans /></TabPanel>
                <TabPanel><InputExpectations/></TabPanel>
                <TabPanel><Results/></TabPanel>
            </Tabs>
        </div>
    </>;
}

export default Fire;