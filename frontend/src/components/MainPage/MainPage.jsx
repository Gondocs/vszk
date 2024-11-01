import React, { useState, useEffect, useRef } from "react";
import "../../css/images.css";
import "../../css/Mainpage.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


export function HomePage() {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const howtoRef = useRef(null);
  const pictureRef = useRef(null);

  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headerRef.current.classList.add("fadeInFromLeft");
        }
      });
    });

    const howtoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          howtoRef.current.classList.add("fadeInFromLeft");
        }
      });
    });

    const pictureObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pictureRef.current.classList.add("fadeInFromRight");
        }
      });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("fadeInFromLeft");
        }
      });
    });

    headerObserver.observe(headerRef.current);
    sectionObserver.observe(sectionRef.current);
    howtoObserver.observe(howtoRef.current);
    pictureObserver.observe(pictureRef.current);

    return () => {
      headerObserver.disconnect();
      sectionObserver.disconnect();
      howtoObserver.disconnect();
      pictureObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="body noSelect bg-slate-100 FadeInSmall">
        <section className="relative h-full">
          <div className="overlay">
            <div className="content">
              <h1
                className={`${
                  isDesktopOrLaptop ? "text-5xl" : "text-3xl"
                } font-bold mb-4`}
              >
                {" "}
                Üdvözlünk a Vállalati Szoftver Kereső oldalán!
              </h1>
              <p className="text-xl mb-8">
                Tudjon meg többet szolgáltatásunkról.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div
        className={`${
          isDesktopOrLaptop ? "px-24" : "rounded-lg"
        } bg-slate-100 `}
      >
        <header
          className={` ${
            isDesktopOrLaptop ? "rounded-full" : "rounded-lg"
          } bg-gray-800 py-6 mt-6 hover-scale-small:hover hover-scale-small`}
          ref={headerRef}
        >
          <div className="container px-12 text-white">
            <h1 className={`${isDesktopOrLaptop ? "text-5xl" : "text-3xl "} text-center font-semibold mb-4`}>
              Üdvözöljük a Szoftverkereső weboldalon
            </h1>
            <p className="text-lg text-center">
              Válassza ki az igényeidhez megfelelő szoftvereket kínálatunkból
            </p>
          </div>
        </header>
      </div>

      <section className="bg-slate-100">
        <div className={`${isDesktopOrLaptop ? "p-16" : "p-0"} bg-slate-100`}>
          <div
            className={` flex ${
              isDesktopOrLaptop ? "flex-row p-12" : "flex-col p-6"
            } items-center justify-center gap-2`}
          >
            <div
              ref={sectionRef}
              className=" container first-letter:animated-element text-left"
            >
              <Link to={"/osszehasonlitas"} onClick={scrollTop}>
                <h2
                  className={`${
                    isDesktopOrLaptop
                      ? "text-4xl hover-scale-small:hover hover-scale-small"
                      : "text-2xl text-center"
                  } font-semibold mb-4`}
                >
                  Próbálja ki az összehasonlítást
                </h2>
              </Link>
              <p
                className={`${
                  isDesktopOrLaptop ? "text-justify" : "text-center"
                } text-gray-700 text-xl`}
              >
                Hasonlítsa össze a szoftvereinket, hogy megtalálja a számára
                legmegfelelőbbet.
              </p>
            </div>
            <div ref={pictureRef} className="">
              <Link to="/osszehasonlitas" onClick={scrollTop}>
                <img
                  src="https://i.ibb.co/XD8Mk3P/scale-2635397-1920.jpg"
                  alt="Összehasonlítás"
                  className={`rounded-full hover-scale hover-scale:hover ml-0 float-right ${
                    isDesktopOrLaptop ? "w-[75%]" : "mt-10 mx-auto"
                  }`}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className={`bg-slate-100 pb-16 ${
          isDesktopOrLaptop ? "pl-24 pr-24" : "pl-2 pr-2"
        } gap-8 mb-4`}
      >
        <section
          className="bg-slate-200  py-6 rounded-40"
          ref={howtoRef}
          style={{ width: "100%" }}
        >
          <div className="px-12">
            <h2 className="text-4xl font-semibold mb-8 text-center hover-scale-small:hover hover-scale-small">
              Hogyan működik?
            </h2>
            <div
              className={`grid ${
                isDesktopOrLaptop ? "grid-cols-3" : "grid-cols-1"
              } gap-8 mb-4`}
            >
              <div className="bg-white rounded-lg p-6 shadow-md hover-scale-small:hover hover-scale-small">
                <h3 className="text-xl font-semibold mb-4">
                  Válasszon egy szoftvert
                </h3>
                <p className="text-gray-700">
                  Válasszon ki egy szoftvert a kínálatunkból, amely megfelel az
                  igényeinek.
                </p>
                <Link
                  to="/szoftverek"
                  className="text-blue-600 hover:underline mt-4 inline-block hover-scale hover-scale:hover"
                  onClick={scrollTop}
                >
                  Minden szoftver
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover-scale-small:hover hover-scale-small">
                <h3 className="text-xl font-semibold mb-4">
                  Kattintson az összehasonlításra
                </h3>
                <p className="text-gray-700">
                  A kiválasztott szoftverek összevetésre kerülnek egymással,
                  hogy megtalálja a legjobbat.
                </p>
                <Link
                  to="/osszehasonlitas"
                  className="text-blue-600 hover:underline mt-4 inline-block hover-scale hover-scale:hover"
                  onClick={scrollTop}
                >
                  Összehasonlítás
                </Link>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md hover-scale-small:hover hover-scale-small">
                <h3 className="text-xl font-semibold mb-4">
                  Döntsön a legjobb szoftver mellett
                </h3>
                <p className="text-gray-700">
                  Az igényei alapján dönthet a legjobb szoftver mellett, amely
                  megfelel az elvárásainak.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
