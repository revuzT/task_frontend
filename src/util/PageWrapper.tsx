import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return <div className="page-enter">{children}</div>;
};

export default PageWrapper;
