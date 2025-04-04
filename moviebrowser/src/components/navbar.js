import {useNavigate,Link} from 'react-router-dom';

const Navbar = ({searchText,setSearchText,setSearchResults}) => {
  const history=useNavigate()

  const updateSearchText= (e) =>{
    history('/search')
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents page reload
    if (searchText.trim()) {
      setSearchText(searchText);
      history(`/search`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Movie Browser</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/Hero">Hero</Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link disabled" to="/" aria-disabled="true">Coming Soon</Link>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchText} onChange={updateSearchText} onKeyDown={handleKeyPress}/>
          <button className="btn btn-outline-success" type="submit" onClick={handleSearch}>Search</button>
        </form>
        </div>
        </div>
        </nav>
      </div>
    );
  }
export default Navbar ;