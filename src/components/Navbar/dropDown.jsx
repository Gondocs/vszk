import { Link } from "react-router-dom";
import '../../css/dropDown.css'

const menuItems = [
  { label: "Menu 1", link: "/Menu1" },
  { label: "Menu 2", link: "/Menu2" },
  { label: "Menu 9adasdasdasdad", link: "/Menu9" },
];

const DropdownMenu = () => {


  return (
    <div
      className="absolute bg-gray-800 z-10 w-max mt-0 py-2 space-y-2 border border-gray-700 text-white focus:outline-none FadeInSmall" >
      <ul className="mt-2 mb-2 ml-4 mr-4">
        {menuItems.map((item) => (
          <Link to={item.link} key={item.link}>
            <button className="w-full block text-left pl-6 py-4 text-white hover:bg-gray-600">
              <li className="">{item.label}</li>
            </button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;