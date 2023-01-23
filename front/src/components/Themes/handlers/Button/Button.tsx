import { PropsWithChildren } from "react";
type Props = PropsWithChildren<{
  className?: String;
}>;
const Button = (props: Props) => {
  return (
    <button className={`global-button ${props.className && props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
