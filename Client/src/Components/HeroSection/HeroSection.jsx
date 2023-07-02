import SearchBox from "../SearchBox";
import HeroPic from "../../assets/heropic.svg";
import { useLottie } from "lottie-react";

import landingLottie from "../../assets/landing.json";
import "./style.css";

function HeroSection() {
  const options = {
    animationData: landingLottie,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
      <div className="flex justify-center items-center h-[90vh]" >
        <div className="w-1/2 flex flex-col items-center justify-around ">
          <p className=" text-xl mb-24">
            <span className="hero-span">SHIKSHAK</span> ke bina{" "}
            <span className="hero-span">SHIKSHA</span> Aadhura
            <br />
            <span className="hero-span">TEACHCONNECT</span> ke bina woh Rista
            Aadhura
            <br />
            <br />
            Use <span className="hero-span">TEACHCONNECT</span> and get your{" "}
            <span className="hero-span">SHIKSHAK</span>
          </p>
          <SearchBox />
        </div>
        <div id="" className=" w-1/2 overflow-hidden">
          {View}
        </div>
      </div>
  );
}

export default HeroSection;
