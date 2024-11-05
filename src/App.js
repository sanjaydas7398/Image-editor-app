// src/App.js

import React, { useState } from 'react';
import ImageSearch from "./components/ImageSerach/ImageSearch"
import CanvasEditor from './components/CanvasEditor/CanvasEditor';
import "../src/tailwind.css"


const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-1 p-4 md:p-6 lg:p-8"> 
        <ImageSearch onSelectImage={setSelectedImage} />
      </div>
      <div className="flex-1 p-4 md:p-6 lg:p-8"> 
        {selectedImage && <CanvasEditor imageUrl={selectedImage} />}
      </div>
    </div>
  );
};

export default App;
