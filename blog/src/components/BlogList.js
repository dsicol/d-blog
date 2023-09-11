import { Link } from 'react-router-dom';

const BlogList = ({activeBlogs, blogTitle}) => {
  return (
    <div className="blog-list">
      <h1>{blogTitle}</h1>
      {activeBlogs.map((activeBlog) => (
        <div className="blog-preview" key = {activeBlog._id}>
          <Link to={`/blogs/${activeBlog._id}`}>
            <h2>{activeBlog.title}</h2>
            <h3>By {activeBlog.author}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList