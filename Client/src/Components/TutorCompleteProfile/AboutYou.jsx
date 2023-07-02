import { useState } from "react";
import { useSnackbar } from "notistack";
function AboutYou(props) {
  return (
    <>
      <div className="md:w-[90%] md:container md:mx-auto flex my-10 ">
        <div className="left md:w-1/2 md:container">
          <div className="bg-green-100 h-[60vh] rounded-md p-6 md:w-5/6 hidden md:block">
            <div className="text-2xl font-bold mb-3">For Your information</div>
            <div className="bg-green-100  leading-8  h-[45vh] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-track-green scrollbar-thumb-primary-color scrollbar-thumb-rounded-full scrollbar-h-0 ">
              <p>
                Inspite trust,establish your legitmacy and assuer future
                students of your professionalism.
              </p>
              <p>
                This is one of the first thing students will read about you,so
                make sure you spell and format your text weel so that it is
                engaging and friendly.
              </p>

              <h2 className="text-xl mt-3">Remember !</h2>
              <p>
                Your contact details or URLS should not appear in your texts.
              </p>
            </div>
          </div>
          {/* scrollbar scrollbar-w-1 scrollbar-track-green scrollbar-thumb-primary-color scrollbar-thumb-rounded-full scrollbar-h-0 */}
        </div>
        <div className="md:w-2/3">
          <div className="text-3xl font-bold mb-5 ">
            {props.title}
            <span className="text-lg"> (minimum 30 words)</span>
          </div>
          <textarea
            className="border-2 border-primary-color p-4 rounded-md w-[100%]"
            placeholder="Tell your future students who you are and why you want to share your knowledge"
            name="aboutYou"
            id=""
            cols="30"
            rows="10"
            value={props.formik.values.aboutYou}
            onChange={props.formik.handleChange}
          ></textarea>
          {props.formik.errors.aboutYou && props.formik.touched.aboutYou ? (
            <p className="text-red-500 my-4 font-bold">
              {props.formik.errors.aboutYou}
            </p>
          ) : null}
          <div className="flex justify-between items-center">
          <label htmlFor="age" className="font-semibold ">Qualification :</label>
          <input
            className="border-2 border-primary-color p-2 rounded-md my-2 w-2/3"
            type="text"
            placeholder="Mention your latest qualification"
            name="education"
            id=""
            value={props.formik.values.education}
            onChange={props.formik.handleChange}
          />
          </div>
          {props.formik.errors.education && props.formik.touched.education ? (
            <p className="text-red-500 my-4 font-bold">
              {props.formik.errors.education}
            </p>
          ) : null}
         
          <div className="my-2 flex justify-between items-center">
            <label htmlFor="age" className="font-semibold ">Age :</label>
            <input
              type="text"
              className="border-2 border-primary-color p-2 rounded-md my-2 w-2/3"
              name="age"
              value={props.formik.values.age}
              onChange={props.formik.handleChange}
              placeholder="Your age"
            />
          </div>
          {props.formik.errors.age && props.formik.touched.age ? (
                <p className="text-red-500">
                  {props.formik.errors.age}
                </p>
              ) : null}
               <div className="flex justify-between mt-2 mb-4 ">
            <h1 className="font-semibold">Gender :</h1>
            <div className="flex">
            <div className="mx-2 w-1/2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={props.formik.values.gender === "male"}
                  onChange={props.formik.handleChange}
                  className="mx-2"
                />
                Male
              </label>
            </div>
            
            <div className="mx-2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={props.formik.values.gender === "female"}
                  onChange={props.formik.handleChange}
                  className="mx-2"
                />
                Female
              </label>
            </div>
            <div className="mx-2">
              <label className="flex">
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  checked={props.formik.values.gender === "others"}
                  onChange={props.formik.handleChange}
                  className="mx-2"
                />
                Others
              </label>
            </div>
            </div>
          </div>
          {props.formik.errors.gender && props.formik.touched.gender ? (
                <p className="text-red-500">
                  {props.formik.errors.gender}
                </p>
              ) : null}
        </div>
      </div>
    </>
  );
}

export default AboutYou;
