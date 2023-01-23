import { PropsWithChildren } from "react";
type Props = PropsWithChildren<{
  error?: string;
  placeholder: string;
  type: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>;
const TextInput = (props: Props) => {
  return (
    <div className="global-input__container">
      <input className="global-input" {...props} />
      <p className="global-input__error">{props.error}</p>
    </div>
  );
};

export default TextInput;
