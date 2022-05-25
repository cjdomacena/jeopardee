import React from "react";

type Props = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return <section className={`container mx-auto ${className}`}>{children}</section>;
};

export default Container;
