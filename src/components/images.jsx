import React, { useState, useEffect, useRef } from 'react';
import '../css/images.css';
import '../css/Mainpage.css';
import { Link } from 'react-router-dom';

const imagesWithCaptions = [
  {
    src: 'https://i.ibb.co/KGS5ZZD/photo-1454165804606-c3d57bc86b40.png',
    caption: 'Caption 1',
  },
  {
    src: 'https://i.ibb.co/V2pRpbd/photo-1647268357361-5a20b90c1f8b.png',
    caption: 'Magyar nyelvű szoftverek',
  },
  {
    src: 'https://i.ibb.co/0mqFYjQ/still-life-with-scales-justice.jpg',
    caption: 'Szoftver hasonlítás',
  },
  {
    src: 'https://i.ibb.co/4tLK5HT/konrad-koller-K-ihp4-S96-Qs-unsplash.jpg',
    caption: 'Caption 4',
  },
  {
    src: 'https://i.ibb.co/611S9vx/glenn-carstens-peters-RLw-UC03-Gwc-unsplash.jpg',
    caption: 'Caption 5',
  },
  {
    src: 'https://i.ibb.co/qxBPkzK/josh-appel-Ne-TPASr-bm-Q-unsplash.jpg',
    caption: 'Caption 6',
  },
  {
    src: 'https://i.ibb.co/0YNS14k/jamie-street-Y602i-Pc-Tq28-unsplash.jpg',
    caption: 'Caption 7',
  },
];


export function ImageTrack() {

  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animation class when the header is in the viewport
          headerRef.current.classList.add('fadeInFromLeft');
        }
      });
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animation class when the section is in the viewport
          sectionRef.current.classList.add('slideInFromBottom');
        }
      });
    });

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the animation class when the footer is in the viewport
          footerRef.current.classList.add('slideInFromBottom');
        }
      });
    });

    // Start observing the header, section, and footer elements
    headerObserver.observe(headerRef.current);
    sectionObserver.observe(sectionRef.current);
    footerObserver.observe(footerRef.current);

    // Clean up the observers when the component unmounts
    return () => {
      headerObserver.disconnect();
      sectionObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);



  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleMouseDown = (e) => {
    setMouseDownAt(e.clientX);
  };

  const handleMouseUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const handleMouseMove = (e) => {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const newPercentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = Math.min(Math.max(prevPercentage + newPercentage, -100), 0);

    setPercentage(nextPercentage);

    const track = document.getElementById('image-track');
    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1000, fill: 'forwards' }
    );

    const images = document.getElementsByClassName('image');
    for (const image of images) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1000, fill: 'forwards' }
      );
    }
  };

  return (
    <>
        <div className='body noSelect'>
        <div
          className='image-track'
          id='image-track'
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          data-mouse-down-at={mouseDownAt}
          data-prev-percentage={prevPercentage}
        >
          {imagesWithCaptions.map((item, index) => (
            <div className='image-container' key={index}>
              <div className='image-aspect-ratio'>
                <img
                  className='image'
                  alt={`img${index + 1}`}
                  src={item.src}
                  draggable='false'
                  loading='lazy' />
              </div>
              <div className='image-hover-text'>{item.caption}</div>
            </div>
          ))}
        </div>
      </div>




      <header className="bg-gray-800 py-8 mt-0 rounded-lg" ref={headerRef}>
      <div className="container mx-12 text-white">
        <h1 className="text-5xl font-semibold mb-6">Üdvözöllek a Szoftverkereső weboldalon</h1>
        <p className="text-lg">Válaszd ki az igényeidhez megfelelő szoftvereket kínálatunkból</p>
      </div>
    </header>

      {/* Latest Blog Posts Section */}
      <section className="bg-white py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div ref={sectionRef} className="animated-element">
            {/* Add the animation class here */}
            <h2 className="text-4xl font-semibold mb-4">Próbáld ki az összehasonlítást</h2>
            <p className="text-gray-700 text-xl">
              Hasonlítsd össze a szoftvereinket, hogy megtaláld a számodra legmegfelelőbbet.
            </p>
          </div>
          <div>
            <Link to="/osszehasonlitas">
              <img
                src="https://i.ibb.co/XD8Mk3P/scale-2635397-1920.jpg"
                alt="Összehasonlítás"
                className="rounded-full hover-scale hover-scale:hover ml-16"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-gray-800 py-16 text-white border-t-4 border-white" ref={footerRef}>
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Maradjon naprakész</h2>
          <p className="text-lg mb-8">
            Iratkozzon fel hírlevelünkre a legújabb frissítésekért és a legújabb hozzáadott szoftverekért.
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Írja be az email címét"
              className="bg-white w-full p-3 rounded-full"
            />
            <button
              className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-black mt-8"
            >
              Feliratkozás
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-3 border-t-4 border-white footer">
        <div className="text-center text-white">
          <p className="text-lg">2023 SzoftverKereső</p>
        </div>
      </footer>

</>
  );
}
