import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md"

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text"
  },
  {
    title: "Salespersons",
    path: "/salespersons",
    icon: <IoIcons.IoMdPerson />,
    cName: "nav-text"
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <MdIcons.MdDirectionsBike />,
    cName: "nav-text"
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaIcons.FaBicycle />,
    cName: "nav-text"
  },
  {
    title: "Sales",
    path: "/sales",
    icon: <MdIcons.MdPointOfSale />,
    cName: "nav-text"
  }
];
