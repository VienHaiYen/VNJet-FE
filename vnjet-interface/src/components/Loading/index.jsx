import { BeatLoader } from "react-spinners";
import "./style.css";
import { CSSProperties } from "react";

const Loading = (props) => {
  const { loading } = props;
  return <BeatLoader loading={loading} color="#36d7b7" />;
};

export default Loading;
