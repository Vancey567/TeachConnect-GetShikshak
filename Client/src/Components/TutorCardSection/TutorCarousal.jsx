import "./card.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";
import { responsive } from "./data";

export default function TutorCarousal({tutors}) {
  console.log("tutop",tutors);
  const AllTutors = tutors.map((tutor,index) => {
    return  (<>
    <Card
      key={index}
      city={tutor?.city}
      name={tutor?.name}
      subjects={tutor?.subjects}
      url= {`${import.meta.env.VITE_API_URL}/assets/${tutor?.profilePic}`}
      id={tutor?.id}
      // price={tutor.tutorForm.city}
      rating={tutor?.rating}
      rate={tutor?.rate}
    />
    </>
  )
  
  });

  // const CustomDot = ({ onClick, ...rest }) => {
  //   const dotStyle = {
  //     position: 'relative',
  //     top: '10px', // Adjust the top value to position the dots slightly below
  //     backgroundColor: active ? 'red' : 'gray',
  //     width: '8px',
  //     height: '8px',
  //     margin: '0 5px',
  //     borderRadius: '50%',
  //     cursor: 'pointer',
  //   };
  
  //   return <span style={dotStyle} onClick={onClick} />;
  // };

  return (
    <div className="carousal ">
      <Carousel showDots  responsive={responsive}>
        {AllTutors}
      </Carousel>
    </div>
  );
}