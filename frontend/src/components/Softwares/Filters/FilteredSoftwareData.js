import { transliterate } from "../../api/transliteration";

export function filterSoftwareData(
  SoftwareData,
  Maincategory,
  Subcategory,
  searchTerm,
  selectedFunctions,
  selectedCompatibility,
  selectedLanguage,
  selectedOs,
  selectedSupport
) {
  const transliteratedCategory = Maincategory
    ? transliterate(Maincategory)
    : "";

  const uniqueCategories = Array.from(
    new Set(
      SoftwareData.map((category) =>
        transliterate(category.category.categoryGroup.name)
      )
    )
  );

  const isMainCategory = uniqueCategories.includes(transliteratedCategory);

  let filteredSoftwareData;

  if (Maincategory) {
    
    if (Subcategory) {
      filteredSoftwareData = SoftwareData.filter((software) => {
        return (
          transliterate(software.category.categoryGroup.name) ===
            transliteratedCategory &&
          transliterate(software.category.name) ===
            transliterate(Subcategory) &&
          software.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          selectedFunctions.every((selectedFunc) =>
            software.functions
              .filter((func) => func.sfunction)
              .map((func) => func.functionality)
              .includes(selectedFunc)
          ) &&
          selectedCompatibility.every((selectedComp) =>
            software.devices.includes(selectedComp)
          ) &&
          selectedLanguage.every((selectedLang) =>
            software.languages.includes(selectedLang)
          ) &&
          selectedOs.every((selectedOS) => software.oSs.includes(selectedOS)) &&
          selectedSupport.every((selectedSupport) =>
            software.supports.includes(selectedSupport)
          )
        );
      });
    } 
    
    else if (isMainCategory) {
      filteredSoftwareData = SoftwareData.filter((software) => {
        return (
          transliterate(software.category.categoryGroup.name) ===
            transliteratedCategory &&
          software.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          selectedFunctions.every((selectedFunc) =>
            software.functions
              .filter((func) => func.sfunction)
              .map((func) => func.functionality)
              .includes(selectedFunc)
          ) &&
          selectedCompatibility.every((selectedComp) =>
            software.devices.includes(selectedComp)
          ) &&
          selectedLanguage.every((selectedLang) =>
            software.languages.includes(selectedLang)
          ) &&
          selectedOs.every((selectedOS) => software.oSs.includes(selectedOS)) &&
          selectedSupport.every((selectedSupport) =>
            software.supports.includes(selectedSupport)
          )
        );
      });
    } 
  } 
  else {
    filteredSoftwareData = SoftwareData.filter((software) => {
      return (
        software.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        selectedFunctions.every((selectedFunc) =>
          software.functions
            .filter((func) => func.sfunction)
            .map((func) => func.functionality)
            .includes(selectedFunc)
        ) &&
        selectedCompatibility.every((selectedComp) =>
          software.devices.includes(selectedComp)
        ) &&
        selectedLanguage.every((selectedLang) =>
          software.languages.includes(selectedLang)
        ) &&
        selectedOs.every((selectedOS) => software.oSs.includes(selectedOS)) &&
        selectedSupport.every((selectedSupport) =>
          software.supports.includes(selectedSupport)
        )
      );
    });
  }

  return filteredSoftwareData;
}
