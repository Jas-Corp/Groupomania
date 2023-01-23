import type { FormEvent, PropsWithChildren } from "react";
type Props = PropsWithChildren<{
  title: String;
  onSubmit: (e: FormEvent<Element>) => void;
}>;
const FormContainer = (props: Props) => {
  return (
    <form className="global-form" onSubmit={props.onSubmit}>
      <h1>{props.title}</h1>
      {props.children}
    </form>
  );
};

export default FormContainer;
