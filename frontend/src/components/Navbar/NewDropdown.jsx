import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ControlledMenu,
  MenuItem,
  useHover,
  useMenuState,
  SubMenu,
  MenuHeader,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { get } from "../api/api";
import { transliterate } from "../api/transliteration";
import { showToast } from "../toasts/toast";

const NewDropdownMenu = () => {
  const [mainCategoryData, setMainCategoryData] = useState([]);
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);

  useEffect(() => {
    get
      .Category()
      .then((data) => {
        setMainCategoryData(data);
      })
      .catch((error) => {
        showToast(`Hiba történt az adatok lekérése közben ${error}`, "error");
      });
  }, []);

  const uniqueCategories = Array.from(
    new Set(mainCategoryData.map((category) => category.categoryGroup.name))
  );
  return (
    <>
      <div
        ref={ref}
        {...anchorProps}
        className="text-white hover:text-gray-400 block mr-12 hover-scale hover-scale:hover text-[1.2rem]"
      >
        Szoftverek
      </div>
      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        gap={2}
        onClose={() => toggle(false)}
      >
        <MenuHeader>Fő kategóriák</MenuHeader>
        {uniqueCategories.map((categoryName) => (
          <Link to={`/szoftverek/${transliterate(categoryName)}`}>
            <SubMenu key={categoryName} label={categoryName}>
            <MenuHeader>Mellék kategóriák</MenuHeader>

              {mainCategoryData
                .filter(
                  (category) => category.categoryGroup.name === categoryName
                )
                .map((subcategory) => (
                  <Link
                    to={`/szoftverek/${transliterate(
                      categoryName
                    )}/${transliterate(subcategory.name)}`}
                    key={subcategory.name}
                  >
                    <MenuItem>{subcategory.name}</MenuItem>
                  </Link>
                ))}
            </SubMenu>
          </Link>
        ))}
      </ControlledMenu>
    </>
  );
};

export default NewDropdownMenu;
