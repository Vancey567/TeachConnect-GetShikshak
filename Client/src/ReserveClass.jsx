import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataAtom, authTokenAtom } from "./Atom";
import { useFormik, Field } from "formik";
import axios from "axios";
import Select from "react-select";
import { customSelectStyles } from "./styleClasses";
import { useSnackbar } from "notistack";
import NavComponent from "./Components/Nav/NavComponent";

function ReserveClass() {
  const [tutor, setTutor] = useState(null);
  // const userData = JSON.parse(sessionStorage.getItem("user"));
  // const authToken = JSON.parse(sessionStorage.getItem("token"));
  const userData = useRecoilValue(userDataAtom);
  const authToken = useRecoilValue(authTokenAtom);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchData = async () => {
    const response = await axios({
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
      method: "GET",
    });
    console.log("response", response.data.user);
    setTutor(response.data.user);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const initialValues = {
    intro: "",
    subjects: [],
    mode: "",
    phone: userData?.phone,
    address: userData?.address,
  };
  console.log("Usredata", userData?._id);
  const Formik = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      console.log("resrve class values", values);
      console.log("clicked");
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/user/reserveclass/${
            tutor?._id
          }`,
          method: "POST",
          data: values,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("response in onsubmit ", response);
        if (response.status === 201) {
          enqueueSnackbar(response.data.message, { variant: "success" });
          navigate(`/user/${tutor?._id}`);
        }
        console.log("values", response);
      } catch (err) {
        console.log("eror is submit", err);
        enqueueSnackbar(err.response.data.error, { variant: "error" });
      }
    },
  });
  console.log("subjects", tutor?.tutorForm?.subjects);

  let subjectOptions = [];
  subjectOptions = tutor?.tutorForm?.subjects?.map((subject, index) => {
    return {
      key: index,
      value: subject,
      label: subject,
    };
  });
  let modeOptions = tutor?.tutorForm?.mode?.map((mode, index) => {
    return {
      key: index,
      value: mode,
      label: mode,
    };
  });

  function handleSubjectChange(selectedValue) {
    Formik.setFieldValue(
      "subjects",
      selectedValue.map((option) => {
        return option.value, option.label;
      })
    );
  }

  function handleModeChange(selectedValue) {
    Formik.setFieldValue(
      "mode",
      selectedValue.map((option) => {
        return option.value, option.label;
      })
    );
  }

  return (
    <>
      <NavComponent />
      <div className=" w-4/5 container mx-auto flex my-24">
        <div className=" w-2/5  h-1/2 flex justify-center">
          <div className="bg-white w-2/3 shadow-xl p-12 rounded-xl flex flex-col items-center">
            <div className="">
              <img
                src={`${import.meta.env.VITE_API_URL}/assets/${
                  tutor?.profilePic
                }`}
                alt=""
                className="rounded-xl w-42 object-cover"
              />
            </div>
            {/* {subjects} */}
            <h1 className="mt-2 text-lg ">{tutor?.name}</h1>
            <div className="font-bold">₹{tutor?.tutorForm?.rate}/hr</div>
          </div>
        </div>

        <div className="w-3/5">
          <h1 className="text-3xl">Schedule Your first Class with </h1>
          <h1 className=" text-3xl my-2 font-bold">{tutor?.name}</h1>
          <form
            onSubmit={Formik.handleSubmit}
            action=""
            className="shadow-md p-4 my-4 flex flex-col"
          >
            <label htmlFor="intro" className="font-semibold">
              Intoduce yourself to {tutor?.name?.split(" ")[0]} and tell them
              what you want to learn(optional).
            </label>
            <textarea
              className="border-2 my-2 p-2"
              name="intro"
              id=""
              cols="10"
              rows="5"
              onChange={Formik.handleChange}
            ></textarea>
            <label htmlFor="subjects" className="my-2 font-semibold">
              Choose the subject you want to study.
            </label>
            <Select
              options={subjectOptions && subjectOptions}
              onChange={(selectedValue) => handleSubjectChange(selectedValue)}
              required
              isMulti
              value={subjectOptions?.filter((option) =>
                Formik.values?.subjects?.includes(option.value)
              )}
              isSearchable
              placeholder="Select the subjects"
              noOptionsMessage={() => "No such subject"}
              styles={customSelectStyles}
            />
            <label htmlFor="mode" className="my-2 font-semibold">
              Enter the mode of study.
            </label>
            <Select
              options={modeOptions && modeOptions}
              onChange={(selectedValue) => handleModeChange(selectedValue)}
              required
              isMulti
              value={modeOptions?.filter((option) =>
                Formik.values?.mode?.includes(option.value)
              )}
              isSearchable
              placeholder="Select the modes"
              noOptionsMessage={() => "No such subject"}
              styles={customSelectStyles}
            />
            <div className="flex justify-between">
              <div className="w-1/2 flex items-center justify-start">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  disabled
                  value={Formik.values.phone}
                  className="mx-4 border-2 p-2 rounded-md my-2"
                />
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  disabled
                  value={Formik.values.address}
                  className="mx-4 border-2 p-2 rounded-md my-2"
                />
              </div>
            </div>
            <div className="note text-red-500 my-2 font-semibold text-sm">
              Note: Your details will be shared with the tutor you select !
            </div>
            <div className="text-center">
              <button className="my-5 w-1/3 text-white bg-primary-color p-4 rounded-lg">
                <span> Reserve the class</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ReserveClass;
