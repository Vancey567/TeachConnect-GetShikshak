import './accountSettings.css'
import './style.css'
import {AiOutlineWarning} from 'react-icons/ai'
import axios from 'axios'
import { authTokenAtom } from '../../Atom'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
function AccountSettings({status,userRole}){
    const [authToken,setAuthToken]=useRecoilState(authTokenAtom);
    const [activeStatus,setActiveStatus]=useState(status);
    const handleClick=async()=>{
        try{
            const response = await axios({
                url:`${import.meta.env.VITE_API_URL}/dashboard/updateactivestatus`,
                method:"PATCH",
                data:{
                    updatedStatus:!activeStatus
                },
                headers:{
                    "Authorization":`Bearer ${authToken}`
                }
            })
            if(response.status===201){
                setActiveStatus((prev)=>(!prev));
            }
        }
        catch(err){
            console.log("err",err);
        }

    }
    // console.log({props});
    return(
        <div id="settings-page-root-div">
            <div id="settings-page-details-div" >
                <div id="account-settings" className='sub-container-div'>
                    <div className='div-heading'>
                        ACCOUNT SETTINGS
                    </div>
                    <div className='account-content-div'>
                        <div id='deactivate-account-div'>
                            <div className='div-heading' style={{justifyContent:"flex-start", backgroundColor:"transparent"}}>
                                Deactivate Account
                            </div>
                            <div className='deactivate-account-content-div'>
                                    <div className='msg-div'>
                                        If You Want to disable your account for some amount of time
                                    </div>
                                    <div id="current-status-of-account">
                                        <span id='status-heading'>CURRENT ACCOUNT STATUS:</span>
                                        {activeStatus?(
                                            <span className="text-green-600">ACTIVE</span>
                                        ):(
                                            <>
                                            <span className="text-red-600 mr-4">IN-ACTIVE</span>
                                            {userRole === 'tutor' && <span className='font-medium text-gray-500'>(Your Ad will not be visible to students)</span> }
                                            </>
                                        )}
                                        
                                    </div>
                                    <div className='button-div'>
                                        <button className='account-settings-button' onClick={handleClick}>{activeStatus?"DEACTIVATE":"ACTIVATE"} </button>
                                    </div>
                            </div>
                        </div>
                        {/* <div className='sub-container-div'>
                            <div className='div-heading' style={{justifyContent:"flex-start"}}>
                                Delete Account
                            </div>
                            <div className='account-content-div'>
                                    <div className='msg-div'>
                                        <AiOutlineWarning color="red" size="1rem"/>
                                        It will permanently delete your account
                                    </div>
                                    <div className='button-div'>
                                        <button className='account-settings-button'>DELETE</button>
                                    </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;