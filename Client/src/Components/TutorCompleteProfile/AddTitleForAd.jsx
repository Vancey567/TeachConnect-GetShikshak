function AddTitleForAdd(props) {
  return (
    <>
      <div className="md:w-[90%] md:container md:mx-auto flex my-10 h-[60vh]">
        <div className="left md:w-1/2 md:container">
          <div className="bg-green-100 h-[60vh] rounded-md p-6 md:w-5/6 hidden md:block">
            <div className="text-2xl font-bold mb-3">For Your information</div>
            <div className="bg-green-100 leading-8  h-[45vh] overflow-y-scroll scrollbar scrollbar-w-1 scrollbar-track-green scrollbar-thumb-primary-color scrollbar-thumb-rounded-full scrollbar-h-0 ">
              <p>
                Your title is the keystone of your ad! Make sure it is
                unique,catchy and contains at least 12 words:
              </p>
              <p>The subjects you teach</p>
              <p>Diploma,method</p>
              <p>
                Your distinguishing features and everything that makes you stand
                out
              </p>

              <h2 className="text-xl font-semibold mt-3">What works?</h2>
              <p>
                I'm an IIT student and I teach maths and physics at primary
                school and secondary level in Pune
              </p>

              <h2 className="text-xl font-semibold mt-3">What doesn't work?</h2>
              <p>I give singing and guitar lessons for Rs.500/hr</p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <div className="text-3xl font-bold mb-5 ">
            {props.title}
            <span className="text-lg"> (minimum 12 words)</span>
          </div>
          <textarea
            className="border-2 border-primary-color p-4 rounded-md w-[100%]"
            placeholder="eg: Graduate and artist teaches singing and guitar for all levels. Personal and easy going methodology"
            name="title"
            id=""
            cols="30"
            rows="10"
            onChange={props.formik.handleChange}
            value={props.formik.values.title}
          ></textarea>
          {props.formik.errors.title && props.formik.touched.title ? (
            <p className="text-red-500 my-4 font-bold">
              {props.formik.errors.title}
            </p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AddTitleForAdd;
