import Hero from "./Hero";
import { useParams  } from "react-router-dom";
import { useEffect,useState } from "react";

const DEFAULT_POSTER = "https://dummyimage.com/500x750/cccccc/000000.jpg&text=No+Poster";
const DEFAULT_BACKDROP = 'https://via.placeholder.com/1920x1080?text=No+Backdrop+Available';

const MovieView = () =>{
    const {id} = useParams()
    console.log(id)

    const [movieDetails,setMovieDetails] =useState({})
    const [isLoading,setIsLoading] =useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("make an api request",id)
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=place_your_api_key`)
        .then((response )=>{
            if(!response.ok) {
                throw new Error("Movie not found or API error.");
            }
            return response.json()
        })
        .then(data => {
            setTimeout( () => {
                setMovieDetails(data)
                setIsLoading(false)
            },1000)
        })
        .catch((err) => {
            console.error("Error: ",err);
            setError(err.message); 
            setIsLoading(false);
          });
    },[id])


    function renderMovieDetails(){
        if(isLoading){
            return <Hero text="Loading..."/>
        }
        if (error) {
            return <Hero text={error} />;
        }
        if(movieDetails){
            const posterPath=movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` : "https://dummyimage.com/500x750/cccccc/000000.jpg&text=No+Poster";
            const backdropUrl= movieDetails.backdrop_path ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}` : DEFAULT_BACKDROP;
            return (
                <>
                    <Hero text={movieDetails.original_title} backdrop={backdropUrl}/>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={posterPath} alt={movieDetails.original_title} className="img-fluid shadow rounded" onError={(e) => e.target.src= DEFAULT_POSTER}/>
                            </div>
                            <div className="col-md-9">
                            <h2 className="fw-bold">{movieDetails.original_title || "Title Not Available"}</h2>
                                <p className="lead text-muted">{movieDetails.overview || "No description available."}</p>
                                <h4 className="text-primary mt-3">Release Date:</h4>
                                <p>{movieDetails.release_date || "Not declared"}</p>
                                <h5 className="mt-3 text-warning">Review:</h5>
                                <p className="badge bg-danger fs-5">
                                    {movieDetails.vote_average ? `${movieDetails.vote_average}/10` : "No ratings available"}
                                </p>
                                <h4 className="text-secondary mt-3">Status:</h4>
                                <p>{movieDetails.status}</p>
                                {movieDetails.homepage && (
                                <a 
                                href={movieDetails.homepage} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary my-3">
                                Visit Official Website
                                </a>
                    )}
                                
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        return <Hero text="No movie details available" />;
    }
    return renderMovieDetails()
};
export default MovieView;
