import { PropsWithChildren } from "react";

const Circle = (props: PropsWithChildren) => {
  return <div className="circle">{props.children}</div>;
};

export default Circle;
