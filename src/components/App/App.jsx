// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { fetchImages } from "../imagesService";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageModal from "../ImageModal/ImageModal";

// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import SearchBar from "../SearchBar/SearchBar";
// import css from "./App.module.css";
import { Routes, Route } from "react-router";
import Navigation from "../Navigation/Navigation";
import HomePage from "../../pages/HomePage/HomePage"
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoumdPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";



export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />}/>
          <Route path="reviews" element={<MovieReviews />}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  ); 
}


// export default function App() {

//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const openModal = (item) => {
//       setSelectedImage(item);
//   };
  
//   const closeModal = () => {
//     setSelectedImage(null);
//   };


//   const handleSearch = (topic) => {
//           setSearchTerm(topic);
//           setPage(1);
//           setImages([]);
    
//   };
//   useEffect(() => {
//     if (searchTerm === '') {
//       return;
//     }
//     async function getData() {
//       try {
//         setError(false);
//         setIsLoading(true);
//         const data = await fetchImages(searchTerm, page);
//         setImages((prevImages) => {
//           return [...prevImages, ...data];
//         });
//       } catch {
//         setError(true);
//         toast.error("Please reload there was an error!!!!");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getData();
//   }, [page, searchTerm]);

//   return (
//     <div className={css.container}>
//       <SearchBar onSubmit={handleSearch} />
//       {images.length > 0 && <ImageGallery onClick={openModal} items={images} />}
//       {isLoading && <Loader />}
//       {error && <ErrorMessage />}
//       {images.length > 0 && !isLoading && (
//         <LoadMoreBtn
//           onClick={() => {
//             setPage(page + 1);
//           }}
//         />
//       )}
//       <ImageModal item={selectedImage} onClose={closeModal} />
//     </div>
//   );
// }
