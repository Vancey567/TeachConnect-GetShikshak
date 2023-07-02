    import '../style.css'
    import './profileDetails.css'
    import EditButton from '../EditButton';
    import {useState,useEffect } from 'react';
    import Button from '@mui/material/Button';
    import {MdZoomOutMap} from 'react-icons/md';
    import {RxCrossCircled} from 'react-icons/rx';

    function ProfileDetails({fetchedData}){

        console.log("Data recieved ",fetchedData);

        const [userData, setUserData] = useState(null);
        // const [showZoom, setShowZoom] = useState("none");
        const [zoomedImage, setzoomedImage] = useState("none");
        const [currentDoc, setCurrentDoc] = useState(null);

        useEffect(()=>{
            setUserData(fetchedData)
        },[]);

        function handleShowZoom(event){
            event.stopPropagation();
            console.log("event ",event.target.className);
            if(event.target.className !== "zoom-icon"){
                console.log("on not zoom");
                event.target.style.display === "block"? event.target.style.display = "none" : event.target.style.display = "block";
            }
            else{
                const children = event.target.childNodes;
                console.log("child ",children);
                if(children[0].style.display === "flex")
                    children[0].style.display="none";
                else
                    children[0].style.display="flex";
            }
            // event.target.closest('.zoom-icon').style.display="flex";
        }

        return(
            <div id="profile-page-root-div">
                <div id="profile-page-details-div">
                    <div className='row-div' id="profile-details-first-row">
                            <div className='sub-container-div' id="personal-details-div">
                                <div className='div-heading' style={{justifyContent:"flex-start" ,paddingLeft:"10px"}}>
                                    PERSONAL DETAILS
                                    <div className="edit-button-div">
                                        <EditButton inputBoxId=""/>
                                    </div>
                                </div>
                                <div className='content-div justify-center'>
                                        <div className='col-div personal-details-row-div'>
                                            <div className='details-item'>
                                                <span className='label-div'>ID:</span>
                                                <span>{userData?._id}</span>
                                            </div>
                                            <div className='details-item'>
                                                <span className='label-div'>Name:</span>
                                                <span>{userData?.name}</span>
                                            </div>
                                            <div className='details-item'>
                                                <span className='label-div'>Email:</span>
                                                <span>{userData?.email}</span>
                                            </div>
                                        </div>
                                        <div className='col-div personal-details-row-div'>
                                            <div className='details-item'>
                                                <span className='label-div'>City:</span>
                                                <span>{userData?.tutorForm?.city}</span>
                                            </div>
                                            <div className='details-item'>
                                                <span className='label-div'>Phone:</span>
                                                <span>{userData?.phone}</span>
                                            </div>
                                            <div className='details-item'>
                                                <span className='label-div'>Qualification:</span>
                                                <span>{userData?.education}</span>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            {/* <div className='sub-container-div' id="qualification-div">
                                <div className='div-heading'>
                                    QUALIFICATIONS
                                    <div className="edit-button-div">
                                        <EditButton inputBoxId=""/>
                                    </div>
                                </div>
                                <div className='content-div'>
                                    <div className='qualification-row'>
                                        <div>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div> */}
                    </div>
                    <div className='row-div' id='profile-details-2nd-row'>
                        <div className="sub-container-div" id="document-div">
                            <div className='div-heading' style={{justifyContent:"flex-start",paddingLeft:"10px"}}>
                                    DOCUMENTS
                            </div>
                            <div id='document-content-div'>
                                <div className='single-document' id='id-proof-div'>
                                    <div className='div-heading' style={{border:"none",backgroundColor:"transparent"}}>
                                        ID Proof
                                    </div>
                                    <div className='content-div-sub-part'>
                                        <div className='document-show-div' onMouseOver={(e)=>{handleShowZoom(e)}} onMouseLeave={(e)=>{handleShowZoom(e)}}>
                                            <img className='document' alt="ID PROOF" src={`${import.meta.env.VITE_API_URL}/assets/${userData?.tutorForm?.identity}`}/>
                                            <div className='zoom-icon' onClick={()=>{setzoomedImage("block"), setCurrentDoc("id")}}>
                                                    <MdZoomOutMap size="2rem" style={{display:"none"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='single-document' id='qualification-proof-div'>
                                    <div className='div-heading' style={{border:"none",backgroundColor:"transparent"}}>
                                        Qualification Document
                                        </div>
                                        <div className='content-div-sub-part'>
                                            <div className='document-show-div' onMouseOver={(e)=>{handleShowZoom(e)}} onMouseLeave={(e)=>{handleShowZoom(e)}}>
                                                <img className='document' alt="ID PROOF" src={`${import.meta.env.VITE_API_URL}/assets/${userData?.tutorForm?.lastEducationalCertificate}`}/>
                                                <div className='zoom-icon' onClick={()=>{setzoomedImage("block"), setCurrentDoc("qualification")}}>
                                                    <MdZoomOutMap size="2rem" style={{display:"none"}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display:zoomedImage}} id="zoomed-image-background-div">
                        <div className='row-div margin-buttom-div' id="crosss-div">
                            <RxCrossCircled size="2rem" color="red" className="cursor-type-pointer" onClick={()=>{setzoomedImage("none")}}/>
                        </div>
                        <div className='row-div flex justify-center items-center' id="zoomed-image-div">
                            <img className='w-[50%] h-full object-contain' alt="ID PROOF" src={`${import.meta.env.VITE_API_URL}/assets/${currentDoc === "id" ? userData?.tutorForm?.identity:userData?.tutorForm?.lastEducationalCertificate}`}/>
                        </div>
                    </div>
            </div>
        )
    }

    export default ProfileDetails;