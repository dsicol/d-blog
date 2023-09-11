import useFetch from '../service/useFetch';
import BlogList from '../components/BlogList'

const Home = () => {
    const blogTitle = 'Welcome';
    const { data: activeBlogs, isLoading, error } = useFetch('http://localhost:4000/blogs/');

    /*
    * Use of props
    */
    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {activeBlogs && <BlogList activeBlogs={activeBlogs} blogTitle={blogTitle} />}
        </div>
    );
}

export default Home;