import { useLottie } from "lottie-react";
import NotFoundLottie from "../assets/lf20_teutzxdt.json";

function NotFound() {
  const options = {
    animationData: NotFoundLottie,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <>
      <div className="">
        <div className="flex flex-col items-center  relative">
        <div className="w-1/3">{View}</div>
        <div className="text-lg bottom-28 absolute text-gray-600">No page found</div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
