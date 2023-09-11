import { Link } from 'react-router-dom';

const Navbar = () => {
    const navbarTitle = 'D-Blog'
    const newBlogTitle = 'New Blog'
    const authenticationTitle = 'Login'

    return (
        // "Class Type" then className 
        <nav className="navbar">
            <Link to="/">
                <h1>{navbarTitle}</h1>
            </Link> 
            <div className="links">
                <Link to="/create">{newBlogTitle}</Link>
                <Link to="/authentication">{authenticationTitle}</Link>
            </div>
        </nav>
    );
}

export default Navbar;