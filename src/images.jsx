import React, { useState } from 'react';
import './images.css';

const images = [
  'https://i.ibb.co/KGS5ZZD/photo-1454165804606-c3d57bc86b40.png',
  'https://i.ibb.co/V2pRpbd/photo-1647268357361-5a20b90c1f8b.png',
  'https://i.ibb.co/0mqFYjQ/still-life-with-scales-justice.jpg',
  'https://i.ibb.co/4tLK5HT/konrad-koller-K-ihp4-S96-Qs-unsplash.jpg',
  'https://i.ibb.co/611S9vx/glenn-carstens-peters-RLw-UC03-Gwc-unsplash.jpg',
  'https://i.ibb.co/qxBPkzK/josh-appel-Ne-TPASr-bm-Q-unsplash.jpg',
  'https://i.ibb.co/0YNS14k/jamie-street-Y602i-Pc-Tq28-unsplash.jpg',
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
      { duration: 800, fill: 'forwards' }
    );

    const images = document.getElementsByClassName('image');
    for (const image of images) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 800, fill: 'forwards' }
      );
    }
  };

  return (
    <div className='body'>
      <div
        className='image-track'
        id='image-track'
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        data-mouse-down-at={mouseDownAt}
        data-prev-percentage={prevPercentage}
      >
        {images.map((src, index) => (
          <div className='image-container' key={index}>
            <div className='image-aspect-ratio'>
              <img
                className='image'
                alt={`img${index + 1}`}
                src={src}
                draggable='false'
              />
            </div>
            <div className='image-hover-text'>dsd</div>
          </div>
        ))}
      </div>
    </div>
  );
}
