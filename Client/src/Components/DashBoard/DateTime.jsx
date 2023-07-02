import {useEffect, useState} from 'react';
// import './homePage.css';
import './datetime.css';

function DateTime(){

    // console.log("date");
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const month = months[currentDateTime.getMonth()];
    const date = currentDateTime.getDate()<10?"0"+currentDateTime.getDate():currentDateTime.getDate();
    const day = days[currentDateTime.getDay()];
    const hour = Math.ceil(currentDateTime.getHours()<=12?(currentDateTime.getHours()==0)?12:currentDateTime.getHours()%12: currentDateTime.getHours()%12);
    const minute = currentDateTime.getMinutes()<10?"0"+currentDateTime.getMinutes():currentDateTime.getMinutes();
    const timeTag = currentDateTime.getHours()<12? "AM" : "PM";
    
    // console.log("mili ",milliseconds);
    //console.log("mili ",currentDateTime.getSeconds());

    // const intervalId = setInterval(()=>{
    //     setCurrentDateTime(new Date());
    //     console.log("Time Updated");
    // },(60000-milliseconds));

    // console.log("TimeOut ID: ",intervalId);

    useEffect(()=>{
        // console.log("In Effect")
        setTimeout(()=>{
            setCurrentDateTime(new Date());
        },60000-(new Date().getSeconds()*1000))
    },[currentDateTime])

    return(
        <div id="date-time-block-div">
            <div id='date' className='date-time'>
                <span id='' className='day-month'>{day}, </span>
                <span id=''>{date} </span>
                <span id='' className='day-month'>{month}</span>
            </div>
            <div id='time' className='date-time'>
                <span id=''>{hour}</span>:
                <span id=''>{minute}</span>
                <span id='time-tag'>{timeTag}</span>
            </div>
        </div>
    )
}

export default DateTime;