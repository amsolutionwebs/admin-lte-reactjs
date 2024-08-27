import React, { useEffect } from 'react';

const bgImages = [
  'bg-01.webp', 'bg-02.webp', /* other images */
];

function App() {
  useEffect(() => {
    const number = Math.floor(Math.random() * bgImages.length);
    document.body.style.backgroundImage = `url(dist/bg-img/${bgImages[number]})`;
  }, []);

  return (
    <div className="App">
      {/* Your existing JSX */}
    </div>
  );
}
