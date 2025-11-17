
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="main-container flex flex-col min-h-[100dvh]">
      <div className="print:hidden"><Navbar /></div>
      <main className="flex-grow pt-16 print:pt-0 print:bg-white">{children}</main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
};

export default Layout;
