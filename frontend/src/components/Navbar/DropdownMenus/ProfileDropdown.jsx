import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ControlledMenu,
  MenuItem,
  useHover,
  useMenuState,
  MenuHeader,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../Auth/Auth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { showToast } from "../../toasts/toast";

const ProfileDropdown = () => {
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

  const { token, role } = useAuth();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
    showToast("Kijelentkezés sikeres!", "success");
  };

  return (
    <>
      <div
        ref={ref}
        {...anchorProps}
        className="text-white hover:text-gray-400 block mr-4 text-[1.2rem]"
      >
        <FontAwesomeIcon
          icon={faUser}
          className={`${isDesktopOrLaptop ? "fa-xl" : "w-7 h-7"} `}
        />
      </div>
      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        gap={8}
        arrow={true}
        overflow="auto"
        onClose={() => toggle(false)}
      >
        <MenuHeader> Üdvözlünk, {jwtDecode(token).given_name}!</MenuHeader>
        {role === "admin" && (
          <Link to="/admin">
            <MenuItem>Admin</MenuItem>
          </Link>
        )}
        <Link to="/fiokbeallitasok">
          <MenuItem>Fiókbeállítások</MenuItem>
        </Link>
        <Link to="/kedvencek">
          <MenuItem>Kedvencek</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
      </ControlledMenu>
    </>
  );
};

export default ProfileDropdown;
