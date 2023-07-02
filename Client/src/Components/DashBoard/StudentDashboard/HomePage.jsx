import './studentHomePage.css';
import {MdWavingHand} from 'react-icons/md';
// import {IoCloseCircleOutline} from 'react-icons/io';
import { useEffect, useState } from 'react';
import DateTime from '../DateTime';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import ListingItems from '../ListingItems';

function HomePage({fetchedData,allClassRequests}){
    // console.log("Homepage Rendered and the pros passed ");

    const userData = fetchedData;

    
    return(
        <div id='home-page-root-div'>
            <div id="student-home-page-details-div">
                <div className='row-div' id="student-home-page-first-row-home-page">
                    <div id='welcome-greeting-div' className="sub-container-div">
                        <span id='welcome-msg'>Welcome</span>
                        <span id='user-name'>{userData?.name?.split(" ")[0]}
                            <span id='tutor-home-page-waving-hand'><MdWavingHand/></span>
                        </span>
                        
                    </div>
                    <div className='sub-container-div' id="date-time-block-div">
                        <DateTime/>
                    </div>
                </div>
                <div className='row-div' id='second-row'>
                    <div className='' id="class-request-listing-div">
                        <div id='student-page-class-request-div-heading'>
                            Class Requests
                        </div>
                        <ListingItems pageheading={""} receivedData={allClassRequests} listName={"Class Requests"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;