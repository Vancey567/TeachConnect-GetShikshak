import * as React from 'react';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authTokenAtom,} from '../../Atom';
import { useSnackbar } from 'notistack';

function FeedbackModal({displayState,handleModal,classId}){
    console.log("class ", classId);
    const token = useRecoilValue(authTokenAtom);
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] =useState(false);
    const [feedback, setFeedback] = useState({
        rating: 0,
        review: ""
    });

    const fetchClassFeedback = async()=>{
        let response = await axios({
            url: `${import.meta.env.VITE_API_URL}/dashboard/getclassfeedback/${classId}`,
            method: "GET",
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        console.log("fetched feedback ",response);
        setFeedback(()=>{
            return(
                {
                    rating: response?.data?.rating,
                    review: response?.data?.review
                }
            )
        })
    }
    
    useEffect(()=>{
        classId && fetchClassFeedback();
        setOpen(displayState);
    },[displayState])
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-40%, -70%)',
        width: 500,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        // boxShadow: 24,
        p: 4,
      };


    async function handleSendFeedback(event){
        if(!feedback.rating || !feedback.review){
            handleModal(classId);
            return
        }
        const response = await axios({
            url: `${import.meta.env.VITE_API_URL}/user/givefeedback/${classId}`,
            method: "PATCH",
            data: feedback,
            headers :{
                "Authorization" : `Bearer ${token}`
            }
        })
        console.log("Feedback Response ", response?.data);
        if(response.status === 201){
            setFeedback(()=>{
                return(
                    {
                        rating: response?.data?.classData?.rating,
                        review: response?.data?.classData?.review
                    }
                )
            })
            enqueueSnackbar(response?.data?.message,{variant:"success"});
        }
        else{
            setFeedback(()=>{
                return(
                    {
                        rating: 0,
                        review: ""
                    }
                )
            })
            enqueueSnackbar(response.data.message,{variant:"error"});
        }
        
        handleModal(classId);
    }

    function handleClose(){
        setFeedback(()=>{
            return(
                {
                    rating: 0,
                    review: ""
                }
            )
        })
        handleModal(classId);
    }


    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
                Give Class Feedback
                <span style={{fontSize:"small",display:"block"}}>Share your experience regarding this class</span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 ,textAlign:"center", padding:"10px 0px"}}>
                <Rating
                sx={{marginLeft:"10px"}}
                name="simple-controlled"
                value={feedback.rating? feedback.rating:0}
                onChange={(event, newValue) => {
                    setFeedback((prev)=>{
                        return{
                            ...prev,
                            rating:newValue
                        }
                    })
                }}
                />
            </Typography>
            <Box 
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="Share Review" id="fullWidth"
                    multiline
                    rows={7} 
                    value={feedback.review? feedback.review:""}
                    onChange={(e)=>{
                        setFeedback((prev)=>{
                            return{
                                ...prev,
                                review:e.target.value
                            }
                        })
                    }}
                />
                <div className='flex justify-end py-5'>
                    <Button variant="contained" sx={{ padding:"5px 10px", backgroundColor:"var(--primary-color)", marginRight:"20px"}} onClick={handleModal} >CLOSE</Button>
                    <Button variant="contained" sx={{ padding:"5px 10px", backgroundColor:"var(--primary-color)"}} onClick={(e)=>{handleSendFeedback(e)}}>SEND FEEDBACK</Button>
                </div>
            </Box>
            </Box>
        </Modal>
    )
}

export default FeedbackModal;