    import '../style.css'
    import './profileDetails.css'
    import './studentHomePage.css'
    import EditButton from '../EditButton';
    import {useState,useEffect } from 'react';

    function ProfileDetails({fetchedData}){

        console.log("Data recieved ",fetchedData);

        const [userData, setUserData] = useState(null);

        useEffect(()=>{
            setUserData(fetchedData)
        },[]);

        return(
            <div id="profile-page-root-div">
                <div id="profile-page-details-div">
                    <div className='sub-container-div' id="student-personal-details">
                        <div className='div-heading'>
                            PERSONAL DETAILS
                            <div className="edit-button-div">
                                <EditButton inputBoxId=""/>
                            </div>
                        </div>
                        <div className='student-profile-content-div'>
                            <div style={{display:"flex", width:"900px", justifyContent:"center",marginTop:"50px"}}>
                                <div style={{width:"50%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div className='student-details-item'>
                                        <span className='label-div'>ID:</span>
                                        <input className="profile-data-div" type="text" value={userData?._id}/>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Gender:</span>
                                        <input className="profile-data-div" type="text" value={userData?.gender}/>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Education:</span>
                                        <input className="profile-data-div" type="text" value={userData?.education}/>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Email:</span>
                                        <span className="profile-data-div">{userData?.email}</span>
                                    </div>
                                </div>
                                <div style={{width:"50%",display:"flex",flexDirection:"column",alignItems:"center"}}>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Name:</span>
                                        <span className="profile-data-div">{userData?.name}</span>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Age:</span>
                                        <input className="profile-data-div" type="text" value={userData?.age}/>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Address:</span>
                                        <input className="profile-data-div" type="text" value={userData?.address}/>
                                    </div>
                                    <div className='student-details-item'>
                                        <span className='label-div'>Phone:</span>
                                        <input className="profile-data-div" type="text" value={userData?.phone}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default ProfileDetails;