
import React, { useState } from 'react';
import axios from 'axios';
import "./ImageSearch.css";

const ImageSearch = ({ onSelectImage }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const URL = process.env.REACT_APP_UNSPLASH_API_URL;
  const AccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  
  const fetchImages = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(URL, {
        headers: { Authorization: `Client-ID ${AccessKey}` },
        params: { query, per_page: 10, page },
      });
      setImages(response.data.results);
      setTotalPages(Math.ceil(response.data.total / 10));
    } catch (error) {
      console.error('Error fetching images:', error.response ? error.response.data : error.message);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError('Unauthorized access. Please check your API key.');
        } else if (error.response.status === 429) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError('Failed to fetch images. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCaption = (url) => {
    onSelectImage(url);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchImages(newPage);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50 rounded shadow-md h-full">
   <div className="bg-red-50 p-4 shadow-md ">
        <h1 className="text-2xl font-bold mb-4 text-center">Searching for Images</h1>
          <div className="flex mb-4 bg-white p-2 rounded shadow-md">
             <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images"
              className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring focus:ring-blue-500"
           />
            <button
              onClick={() => { fetchImages(); setCurrentPage(1); }}
              className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 transition"
            >
          Search
        </button>
      </div>
      </div>


      <div className="flex-grow overflow-y-auto"  style={{ maxHeight: '447px' }}>
      <div className="grid grid-cols-2 gap-4 mt-2">
      {isLoading && <p>Loading images...</p>}
        {error && <p className="error-message">{error}</p>}
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="cursor-pointer object-cover w-full h-48 rounded shadow-md transition-transform transform hover:scale-105"
              style={{ maxWidth: '100%' }}
            />
            <div className="absolute inset-0 flex justify-center items-end">
              <button
                onClick={() => handleAddCaption(image.urls.full)}
                className="bg-gradient-to-r from-blue-500 to-purple-600  text-white p-2 rounded-md hover:bg-green-600 w-full flex justify-center items-center"
              >
                Add Caption
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
          className={`p-2 bg-gray-300 rounded hover:bg-gray-400 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-sm">Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}
          className={`p-2 bg-gray-300 rounded hover:bg-gray-400 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSearch;
