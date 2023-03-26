// components/Layout.tsx
import React from "react";
import Footer from "./../footer";

type LayoutProps = React.PropsWithChildren<{}>;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <div className="content">{children}</div>
      <Footer />
      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default Layout;
