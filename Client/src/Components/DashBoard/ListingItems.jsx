import * as React from 'react';
import {Box} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './listingitems.css';
import FeedbackModal from './FeedbackModal';

export default function ListingItems({pageheading,receivedData,listName}) {
    // console.log("List Rendered");
    console.log("receivedData",receivedData);
    // console.log("page hedaer",pageheading);
    const [showModal, setShowModal] = useState(false);
    const [includeFeedback,setIncludeFeedback] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);

    // const [currentData,setCurrentData] = useState();

    // setCurrentData(receivedData);

    const colHeading = receivedData?.length>0 ?(
        Object.keys(receivedData[0])?.filter((data)=>{
            return (data !== "tutorId");
        })
    ):[];

    // console.log(receivedData[0]?.['account-status']);

    // if(colHeading.includes("tutorId"))
    //     colHeading.shift();

    
      const handleModal = (classId) =>{
        if(currentClassId === null)
            setCurrentClassId(classId); 
        else
            setCurrentClassId(null); 
        setShowModal((prev)=>{
            return !prev;
        })
      } 
      

    // console.log("List Rendered");
    // console.log("Data Received",colHeading);

    

    function generateColHeading(){
        const tableHeading = colHeading.map((item)=>{
            return(
                <TableCell sx={{bgcolor:'lightGray', textTransform:"uppercase",border:"1px solid gray"}} align="center">{item}</TableCell>
            )
        })

        return(
            <TableRow>
                {tableHeading}
            </TableRow>
        )
    }

    function generateTableRow(itemObj){
        let row=[];
        for(let item in itemObj){
           if(item==="profilePic"){
                row.push(<TableCell sx={{display:"flex",justifyContent:"center",alignItems:"center"}} align="center" className=''>
                    <img src={`${import.meta.env.VITE_API_URL}/assets/${itemObj[item]}`} alt="" style={{objectFit:"cover"}} className='w-16 h-26 '/>
                </TableCell>)
            }
            // else if(Array.isArray(itemObj[item])){
            else if(item === "tutorId"){
                continue;
            }
            else if(Array.isArray(itemObj[item])){
                const newItem=itemObj[item].map((i,index)=>{
                    return (index==0?i:", "+i)
                })
                row.push(<TableCell align="center">{newItem}</TableCell>)
            }
            else if(itemObj[item] === "pending"){
                row.push(
                    <TableCell align="center">
                        <span className='text-yellow-500 font-bold'>{itemObj[item].toUpperCase()}</span>
                    </TableCell>
                )
            }
            else if(itemObj[item] === "accepted"){
                row.push(
                    <TableCell align="center">
                        <span className='text-green-600 font-bold'>{itemObj[item].toUpperCase()}</span>
                    </TableCell>
                )
            }
            else if(itemObj[item] === "rejected"){
                row.push(
                    <TableCell align="center">
                        <span className='text-red-600 font-bold'>{itemObj[item].toUpperCase()}</span>
                    </TableCell>
                )
            }
            else if(item === "feedback"){
                row.push(
                    <TableCell sx={{}} align="center">
                        {<Button variant="contained" sx={{fontSize:"10px", textTransform:"none", padding:"2px 5px", backgroundColor:"var(--primary-color)"}} onClick={()=>{handleModal(itemObj["class id"])}}>Share Feedback</Button>}
                        {includeFeedback === false?setIncludeFeedback(true):null}
                    </TableCell>)
            }
            else if(typeof itemObj[item]==="object"){
                console.log("Inside object item",item);
                continue;
            }
            else if(typeof itemObj[item] === "boolean"){
                const bool = itemObj[item]?"Active":"In-Active";
                const textColor = itemObj[item]?"green":"red";
                row.push(<TableCell sx={{borderRight:"1px solid black",textTransform:'uppercase',fontWeight:"bold",color:textColor }} align="center">{bool}</TableCell>)
            }
            else
            row.push(<TableCell align="center">{itemObj[item]}</TableCell>)
        }
        return row;
    }

    function generateTableBody(){
        const tableBody= receivedData.map((item,index)=>{
            return(
                <TableRow
                    key={index}
                >
                    
                    {generateTableRow(item)}
                </TableRow>
            )
        });
        return tableBody;
    }

    return (
    <div id='listing-items-root-div'>
        <div id='list-heading' className='flex justify-between'>
                {pageheading}
                <h1>{pageheading.split(" ")[0]} Count : {receivedData?.length}</h1>
        </div>
        {(receivedData?.length>0 )?(
            <div id='items-list'>
                <Box sx={{ width: '100%'}} color="black">
                    <Paper sx={{ width: '100%'}}>
                        <TableContainer component={Paper} style={{ maxHeight: '467px'}}>
                            <Table aria-label="simple table" stickyHeader size="small" sx={{borderRadius:"none"}}>
                                <TableHead>
                                    {generateColHeading()}
                                </TableHead>
                                <TableBody>
                                    {generateTableBody()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                {includeFeedback && <FeedbackModal displayState={showModal} handleModal={handleModal} classId={currentClassId}/>}
            </div>
        ):(
            <div style={{display:"flex", justifyContent:"center",alignItems:"center",height:"300px"}}>
                <h1 style={{fontSize:"x-large",textAlign:"center",backgroundColor:"lightcyan",padding:"20px",borderRadius:"5px"}}>
                    <span>No {listName} Yet</span>
                </h1>
            </div>
        )}
    </div>
  );
}