import { BsHeart } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

interface ITabButtonProps {
  icon: JSX.Element;
  link: string;
}

const tabs: Array<ITabButtonProps> = [
  {
    icon: <FiEdit size={22} />,
    link: "/",
  },
  {
    icon: <BsHeart size={22} />,
    link: "/favorites",
  },
];

export default function Tabs() {
  const pathname = useLocation().pathname;

  if (pathname.includes("notes")) return null;

  return (
    <div className="flex justify-evenly p-3 bg-black">
      {tabs.map((tab, index) => (
        <TabButton key={index} {...tab} />
      ))}
    </div>
  );
}

function TabButton(props: ITabButtonProps) {
  const { icon, link } = props;
  const pathname = useLocation().pathname;

  let style: string = "";
  if (link === pathname) {
    style = "bg-primary text-black";
  } else {
    style = "bg-transparent text-white";
  }

  return (
    <Link
      className={`rounded-full p-3 ${style} hover:brightness-110`}
      to={link}
    >
      {icon}
    </Link>
  );
}
