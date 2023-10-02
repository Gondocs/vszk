import React, { useRef, useEffect } from "react";
import "../css/Mainpage.css";

export function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerRef.current.classList.add("fadeInFromRight");
        }
      });
    });

    footerObserver.observe(footerRef.current);

    return () => {
      footerObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        <section
          className="bg-gray-800 py-8 text-white border-t-4 border-white rounded-lg"
          ref={footerRef}
        >
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6">
              Maradjon naprakész
            </h2>
            <p className="text-lg mb-8">
              Iratkozzon fel hírlevelünkre a legújabb frissítésekért és a
              legújabb hozzáadott szoftverekért.
            </p>
            <div className="max-w-md mx-auto ">
              <input
                type="email"
                placeholder="Írja be az email címét"
                className="bg-white w-full p-3 rounded-full text-black pl-6 pr-6 text-center text-lg hover-scale-small:hover hover-scale-small"
              />
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-black mt-8 text-lg hover-scale-small:hover hover-scale-small">
                Feliratkozás
              </button>
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 py-3 border-t-4 border-white footer rounded-lg">
          <div className="text-center text-white">
            <p className="text-lg hover-scale-small:hover hover-scale-small">
              2023 SzoftverKereső
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
