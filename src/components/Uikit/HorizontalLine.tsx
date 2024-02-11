import { CSSProperties } from "react";

interface PropsType {
  style?: CSSProperties;
}

const HorizontalLine = (props: PropsType) => {
  const defaultStyle = {
    marginTop: "0px",
    marginBottom: "10px",
    width: "100%",
    height: "1px",
    backgroundColor: "#CFD8D8",
    marginLeft: "0px",
  } as CSSProperties;

  return <div style={props.style ? props.style : defaultStyle}></div>;
};

export default HorizontalLine;
