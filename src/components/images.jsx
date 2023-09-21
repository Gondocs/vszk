import React, { useState } from 'react';
import '../css/images.css';

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




      <header className="bg-gray-800 py-4 mt-0 rounded-lg">
        <div className="container mx-12 text-white">
          <h1 className="text-5xl font-semibold mb-4">Üdvözöllek a Szoftverkereső weboldalon</h1>
          <p className="text-lg">Válaszd ki az igényeidhez megfelelő szoftvereket kínálatunkból</p>
        </div>
      </header>

      {/* Featured Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-semibold mb-4">Featured Article</h2>
              <p className="text-gray-700">
                Discover our latest and greatest article that will change your life.
              </p>
              <a
                href="%#"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400x300"
                alt="Featured Article"
                className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 1 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="%#"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 2 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="#%"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Blog Post 3 Title
              </h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
              </p>
              <a
                href="#%"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest updates and exclusive content.
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white w-full p-3 rounded-full" />
            <button
              className="bg-yellow-400 text-blue-600 px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-white mt-4"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 py-4">
        <div className="container mx-auto text-center text-white">
          <p className="text-lg">&copy; 2023 My Website</p>
        </div>
      </footer>
</>
  );
}
