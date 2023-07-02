import Select from "react-select";
import { useState,useEffect } from "react";
import { useSnackbar } from "notistack";
import { customSelectStyles } from "../../styleClasses";
import axios from "axios";
import cityOptions from '../../../utils/cityOptions.json'

function ClassDetails(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const[modeOptions,setModeOptions]=useState([]);
  const[languageOptions,setLanguageOptions]=useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      let modeResponse = await axios({
        url:`${import.meta.env.VITE_API_URL}/advertise/modes`,
        method:"GET"
      });
      
      let languageResponse = await axios({
        url:`${import.meta.env.VITE_API_URL}/advertise/languages`,
        method:"GET"
      });
      console.log(languageResponse.data);
      console.log(modeResponse.data)
      setModeOptions(modeResponse.data.modes);
      setLanguageOptions(languageResponse.data.languages);
    }
    fetchData();
  },[])

  // console.log(getmodeOptions)

  // const modeOptions = [
  //   { value: "Your home", label: "Your home" },
  //   { value: "You can travel", label: "You can travel" },
  //   { value: "Online", label: "Online" },
  // ];

  

  // const languageOptions = [
  //   { value: "English", label: "English" },
  //   { value: "Hindi", label: "Hindi" },
  //   { value: "Assamese", label: "Assamese" },
  // ];




  return (
    <>
      <div className="md:w-[90%] md:container md:mx-auto md:flex my-10 h-[60vh]">
        <div className="left md:w-1/2 container">
          <div className="bg-green-100 rounded-md p-6 md:w-5/6 hidden md:block">
            <div className="text-2xl font-bold  mb-3">
              For Your information
            </div>
            <div className="bg-green-100 leading-8  overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-track-green scrollbar-thumb-primary-color scrollbar-thumb-rounded-full scrollbar-h-0 ">
              <p>
                Your address will never appear on the site. It will only be
                given to students you agree to teach.
              </p>
            </div>
          </div>
        </div>
        <div className="right md:w-2/3 mr-8">
          <div className="">
            <div className="text-3xl font-bold mb-5">{props.title}</div>
            <Select
              className="my-5"
              options={cityOptions}
              onChange={selectedValue=>props.formik.setFieldValue('city',selectedValue.value)}
              value={cityOptions.find((option)=>option.value===props.formik.values.city)}
              isSearchable
              placeholder="Search by city name"
              noOptionsMessage={() => "No such city"}
              styles={customSelectStyles}
            />
            {(props.formik.errors.city && props.formik.touched.city) ? (<p className='text-red-500 my-2 font-bold'>{props.formik.errors.city}</p>):null}

            <Select
              options={modeOptions}
              onChange={selectedOptions=>props.formik.setFieldValue('mode',selectedOptions.map((option)=>{return(option.value,option.label)}))}
              value={modeOptions.filter((option)=>props.formik.values.mode.includes(option.value))}
              isMulti
              placeholder="Select the mode/s of class"
              styles={customSelectStyles}

            />
            {(props.formik.errors.mode && props.formik.touched.mode) ? (<p className='text-red-500 my-2 font-bold'>{props.formik.errors.mode}</p>):null}

            <Select
              options={languageOptions}
              className="my-5"
              onChange={selectedOptions=>props.formik.setFieldValue('language',selectedOptions.map((option)=>{return(option.value,option.label)}))}
              value={languageOptions.filter((option)=>props.formik.values.language.includes(option.value))}
              isMulti
              placeholder="Select the languages you speak"
              styles={customSelectStyles}

            />
            {(props.formik.errors.language && props.formik.touched.language) ? (<p className='text-red-500 my-2 font-bold'>{props.formik.errors.language}</p>):null}

            <div className="flex justify-between items-center border-[1px] border-primary-color p-2 rounded-lg w-[100%]">
              <input
                className="w-[80%] outline-none"
                type="text"
                name="rate"
                placeholder="Hourly rate"
                onChange={props.formik.handleChange}
                value={props.formik.values.rate}
              />
              <span>₹/hr</span>
            </div>
            {(props.formik.errors.rate && props.formik.touched.rate) ? (<p className='text-red-500 my-2 font-bold'>{props.formik.errors.rate}</p>):null}


              <input
                className="flex justify-between items-center border-[1px] border-primary-color p-2 rounded-lg w-[100%] mt-5 outline-none"
                type="text"
                placeholder="Phone number"
                onChange={props.formik.handleChange}
                name="phone"
                value={props.formik.values.phone}
              /> 
              {/* {(props.formik.errors.city && props.formik.errors.mode && props.formik.errors.phone && props.formik.errors.rate)?(<p className='text-red-500 my-2 font-bold'>All Fields required !</p>):null} */}
             {(props.formik.errors.phone && props.formik.touched.phone) ? (<p className='text-red-500 my-2 font-bold'>{props.formik.errors.phone}</p>):null}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
