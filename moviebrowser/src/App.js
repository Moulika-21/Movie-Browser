import './App.css';
import Navbar  from './components/navbar';
import Home from './components/Home';
import About from './components/about';
import Search from './components/search';
import NotFound from './components/NotFound';
import {
  Routes,Route 
} from 'react-router-dom';
import { useState,useEffect } from 'react';
import MovieView from './components/MovieView';

function App() {
  const[searchResults, setSearchResults]=useState([])
  const[searchText,setSearchText]=useState('')

  useEffect( () => {
    if(searchText){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=7e6747b02a0c379e4d816b45ac3bb1c6&language=en-US&query=${searchText}&page=1&include_adult=false`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results)
      })
    }
  },[searchText])
  return (
    <div> 
      <Navbar searchText={searchText} setSearchText={setSearchText}/>
      <Routes>
        <Route path="/" element={<Home/>}/> 
        <Route path="/about" element={<About/>}/>
        <Route path="/search" element={<Search keyword={searchText} searchResults={searchResults}/>}/>
        <Route path="/movies/:id" element={<MovieView/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
