import Lottie from "lottie-react";
import animationData from "../../assets/jsonAnimations/successfully.json";

export default function Congratulations() {
  return (
    <Lottie
      animationData={animationData}
      style={{
        width: 150,
        height: 150,
        margin: 20,
        marginBottom: 0,
        background: "none",
      }}
    />
  );
}
