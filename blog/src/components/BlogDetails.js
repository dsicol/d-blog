import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../service/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: activeBlog, error, isLoading } = useFetch('http://localhost:4000/blogs/' + id);

  const handleClick = () => {
    fetch('http://localhost:4000/blogs/' + id, {
      method: 'DELETE',
      mode: 'cors'
    }).then(() => {
      console.log('Blog deleted with ID:' + id);
      navigate('/');
    })
  };

  return (
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {activeBlog && (
        <article>
          <h2>{activeBlog.title}</h2>
          <p>Written by {activeBlog.author}</p>
          <div>{activeBlog.body}</div>
          <button onClick={handleClick}>Delete blog</button>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;