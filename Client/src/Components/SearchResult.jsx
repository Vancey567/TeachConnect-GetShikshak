import SearchBox from "../Components/SearchBox";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "./TutorCardSection/Card";
import NoResultPage from "./NoResultPage";
import NavComponent from "./Nav/NavComponent"

function SearchResult() {
  const [data, setData] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const subject = searchParams.get("subject");
  const city = searchParams.get("city");
  console.log("subject,city", subject, city);

  const fetchData = async (subject, city) => {
    console.log("search Page");
    // console.log(subject,city,"Subject,city")
    let url = `${import.meta.env.VITE_API_URL}/user/search`;
    if (subject) url += `?subject=${subject}`;
    if (city) url += `${subject ? "&" : "?"}city=${city}`;
    const response = await axios.get(url);
    console.log(response.data.searchedUser);
    setData(response.data.searchedUser);
  };

  console.log("search");

  useEffect(() => {
    fetchData(subject, city);
  }, [location.search]);

  return (
    <>
    <NavComponent/>
    <div className="container mx-auto " id="main-div">
      <div className="flex justify-center">
      <div className="my-12" >
        <SearchBox />
      </div>
      </div>
      {data ? (<div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[80%] gap-y-4">
        {data?.map((tutor, index) => (
          <>
            <Card
              key={tutor._id}
              id={tutor._id}
              city={tutor.tutorForm.city}
              name={tutor.name}
              url={`${import.meta.env.VITE_API_URL}/assets/${tutor && tutor.profilePic}`}
              subjects={tutor.tutorForm.subjects}
              rate={tutor.tutorForm.rate}
            />
          </>
        ))}
      </div>
      </div>):(<NoResultPage/>)}
    </div>
    </>
  );
}

export default SearchResult;
