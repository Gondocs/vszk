import { useEffect } from "react";
import { transliterate } from "../api/transliteration";

export const CategoryNames = (
  Maincategory,
  Subcategory,
  SoftwareData,
  setCurrentMainCategoryName,
  setCurrentSubCategoryName
) => {
  useEffect(() => {
    if (!Maincategory) {
      // If Maincategory is empty, set both CurrentMainCategoryName and CurrentSubCategoryName to empty
      setCurrentMainCategoryName("");
      setCurrentSubCategoryName("");
    } else {
      // Find the matching main category in SoftwareData
      const mainCategoryMatch = SoftwareData.find(
        (software) =>
          transliterate(software.category.categoryGroup.name) ===
          transliterate(Maincategory)
      );

      if (mainCategoryMatch) {
        setCurrentMainCategoryName(
          mainCategoryMatch.category.categoryGroup.name
        );
      }

      if (Subcategory) {
        // Find the matching main category in SoftwareData
        const subCategoryMatch = SoftwareData.find(
          (software) =>
            transliterate(software.category.name) === transliterate(Subcategory)
        );

        if (subCategoryMatch) {
          setCurrentSubCategoryName(subCategoryMatch.category.name);
        }
      }
    }
    console.log("categorynamesfordisplay.js");
  }, [
    Maincategory,
    Subcategory,
    SoftwareData,
    setCurrentMainCategoryName,
    setCurrentSubCategoryName,
  ]);
};
