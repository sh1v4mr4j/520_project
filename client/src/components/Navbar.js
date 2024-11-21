import React from "react";
import { Link } from "react-router-dom";
import { Image, Layout, Menu } from "antd";
import SchedulCareLogo from "../images/SchedulCareLogo.jpg";

const { Header, Content, Footer } = Layout;

const items1 = [
  { key: "1", label: "Home", to: "/patient", heading: "Patient Page" },
  { key: "2", label: "MapView", to: "/MapView", heading: "MapView Page" },
  {
    key: "3",
    label: "Chat",
    to: "/chatassist",
    heading: "Chat Assistant Page",
  },
  { key: "4", label: "Doctor", to: "/doctor", heading: "Doctor Page" },
].map((item) => ({
  key: item.key,
  label: item.label,
  to: item.to,
  heading: item.heading,
}));

const Navbar = ({ selectedKey, setHeading }) => {
  const handleClick = (heading) => {
    setHeading(heading);
  };

  const currentItem = items1.find((item) => item.to === location.pathname);
  setHeading(currentItem ? currentItem.heading : "Patient Page");
  selectedKey = currentItem ? currentItem.key : "1";

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Image src={SchedulCareLogo} width={55} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        style={{ flex: 1, minWidth: 0 }}
      >
        {items1.map((item) => (
          <Menu.Item key={item.key}>
            {/* Wrap each Menu.Item with Link to navigate to the respective route */}
            <Link to={item.to} onClick={() => handleClick(item.heading)}>
              {item.label}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
};

export default Navbar;
