import { PropsWithChildren } from "react";

const ContentLayout = (props: PropsWithChildren) => {
  return <main className="content-layout">{props.children}</main>;
};

export default ContentLayout;
