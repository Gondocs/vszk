import { get } from "../api/api";
import { showToast } from "../toasts/toast";

export function fetchData(
  setSoftwareData,
  setLoading,
  setFunctionsData,
  setCompatibilityData,
  setLanguageData,
  setOsData,
  setSupportData
) {
  get
    .SoftwareAll()
    .then((data) => {
      setSoftwareData(data);
      setLoading(false);
    })
    .catch((error) => {
      showToast("Hiba történt az adatok lekérése közben", "error");
      console.log(error);
      setLoading(false);
    });

  get
    .GetAllWithFunctions()
    .then((functionsData) => {
      setFunctionsData(functionsData);
    })
    .catch((error) => {
      showToast(
        "Hiba történt az adatok lekérése közben (AllFunctions)",
        "error"
      );
      console.log(error);
    });

  get
    .SoftwareCompConnect()
    .then((compatibiliyData) => {
      setCompatibilityData(compatibiliyData);
    })
    .catch((error) => {
      showToast("Hiba történt az adatok lekérése közben", "error");
      console.log(error);
    });

  get
    .SoftwareLangConnect()
    .then((LanguageData) => {
      setLanguageData(LanguageData);
    })
    .catch((error) => {
      showToast("Hiba történt az adatok lekérése közben", "error");
      console.log(error);
    });

  get
    .SoftwareOSConnect()
    .then((OsData) => {
      setOsData(OsData);
    })
    .catch((error) => {
      showToast("Hiba történt az adatok lekérése közben", "error");
      console.log(error);
    });

  get
    .Support()
    .then((SupportData) => {
      setSupportData(SupportData);
    })
    .catch((error) => {
      showToast("Hiba történt az adatok lekérése közben", "error");
      console.log(error);
    });
}
