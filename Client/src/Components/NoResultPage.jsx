import { useLottie } from "lottie-react";
import NoResultLottie from "../../src/assets/lf20_nrtm9xfr.json";

function NoResultPage() {
  const options = {
    animationData: NoResultLottie,
    loop: true,
  };
  const { View } = useLottie(options);
  return (
    <>
      <div className="flex justify-center my-20">
        <div className="w-2/3 sm:w-1/2 md:w-1/4 lg:w-1/4">
          {View}
          <div className=" my-12 text-center">
            <div className="font-bold text-lg my-4 font-[Quicksand] md:text-xl lg:text-2xl">Sorry no result found:(</div>
            <p className="text-sm md:text-xl">
              We're sorry for what you were looking for. Please try another way.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoResultPage;
