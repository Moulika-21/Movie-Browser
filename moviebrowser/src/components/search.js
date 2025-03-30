import Hero from "./Hero";
import { Link } from "react-router-dom";



const MovieCard =({movie}) => {
    const DEFAULT_POSTER = "https://dummyimage.com/500x750/cccccc/000000.jpg&text=No+Poster";

    
    const posterUrl= movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : DEFAULT_POSTER;
    const detailUrl=`/movies/${movie.id}`
    return (
        <div className="col-lg-3 col-md-3 col-2 my-2">
            <div className="card">
                <img src={posterUrl} className="card-img-top" alt={movie.original_title} onError={(e) => e.target.src=DEFAULT_POSTER}/>
                <div className="card-body">
                    <h5 className="card-title">{movie.original_title}</h5>
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                    Show Details
                    </Link>   
        {/* <Link to={detailUrl} className="btn btn-primary">show Details</Link> */}
                </div>
            </div>
        </div>
    ) 
}
const Search =({keyword,searchResults,error}) => {
    const title=`${keyword}`
    // if (isLoading) {
    //     return <div>Loading...</div>;  // You can replace this with a spinner
    // }
    
    if (error) {
        return (
            <>
                <Hero text="Error: Movie not found" />
            </>
        );
    }

    if (!searchResults || searchResults.length===0) {
        return (
            
            <>
                <Hero text={`No results found for "${title}"`} />
            </>
        );
    }
    const resultHtml=searchResults.map((obj,i) => {
        return <MovieCard movie={obj} key={i} />
    })
    return (
        <>
            <Hero text={title} />
            <div className="container">
                <div className="row">{resultHtml}</div>
            </div>
            {/* {resultHtml && 
                <div className="container">
                    <div className="row">
                        {resultHtml}
                    </div>
                </div> */}
        </>
    );
}
export default Search;
