import Select from "react-select";
import { useState, memo, useEffect } from "react";
import { nanoid } from "nanoid";
import { useSnackbar } from "notistack";
import { customSelectStyles } from "../../styleClasses";
import axios from "axios";

function ChooseSubject(props) {

  const[subjectOptions,setSubjectOptions]=useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      let response = await axios({
        url:`${import.meta.env.VITE_API_URL}/advertise/subjects`,
        method:"GET"
      })
      // console.log("Response Subject ",response);
      setSubjectOptions(response.data.subjects)
    }
    fetchData();
  },[])


  const options = [
    { value: "English", label: "English" },
    { value: "Moral Science", label: "Moral Science" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Hindi", label: "Hindi" },
    { value: "Maths", label: "Maths" },
    { value: "General Knowledge", label: "General Knowledge" },
    { value: "Dance", label: "Dance" },
    { value: "Singing", label: "Singing" },
    { value: "EVS", label: "EVS" },
  ];

  function handleChange(selectedValue) {
    props.formik.setFieldValue(
      "subjects",
      selectedValue.map((option) => {
        return (option.value,option.label);
      })
    );
  }

  return (
    <>
      <div className="md:w-[90%] md:container md:mx-auto md:flex my-10 h-[60vh]">
        <div className="left md:w-1/2 md:container">
          <div className="md:w-5/6 rounded-md p-5 leading-8 hidden md:block bg-green-100 ">
            <div className="text-2xl font-bold  mb-3">For Your information</div>
            <p>You can Add upto 4 subjects.</p>
            <p>Choose the subject that you teach frequently.</p>
            <p>NOTE: You can add more subject later on !</p>
          </div>
          {props.formik.errors.subjects && props.formik.touched.subjects ? (
            <p className="text-red-500 my-4 font-bold">
              {props.formik.errors.subjects}
            </p>
          ) : null}

          {/* {props.formik.errors.subjects && props.formik.touched.subjects ? (<p className='text-red-500 my-2'>{props.formik.errors.subjects}</p>):null} */}
        </div>
        <div className="right md:w-2/3">
          <div className="text-3xl font-bold mb-5">{props.title}</div>
          <Select
            options={subjectOptions}
            // onChange={selectedValue=>props.formik.setFieldValue('subjects',selectedValue.map((option)=>{ return (option.value,option.label)}))}
            onChange={(selectedValue) => handleChange(selectedValue)}
            required
            isMulti
            value={subjectOptions.filter((option) =>
              props.formik.values.subjects.includes(option.value)
            )}
            isSearchable
            placeholder="Select the subjects"
            noOptionsMessage={() => "No such subject"}
            styles={customSelectStyles}
          />
          <div className="my-8 overflow-auto h-[65%]">
            <div>
              {props.formik.values.subjects.map((s) => {
                return (
                  <div
                    key={nanoid()}
                    className="shadow-sm shadow-primary-color rounded-md p-2 m-3  leading-8 text-primary-color"
                  >
                    {s}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(ChooseSubject);
