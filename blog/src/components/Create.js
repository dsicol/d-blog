import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop refresh
    const currentDate = Date.now();
    const blog = { title, author, body, currentDate };

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/blogs/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(blog)
      });
    
      if (response.ok) {
        setIsLoading(false);
        setIsDone(true);
        navigate('/');
        console.log('New blog added');
      } else {
        console.log('Post failed');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  };

  return (
    <div className="create">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog Author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="luigi">luigi</option>
        </select>
        {!isLoading && <button>Create</button>}
        {isLoading && <button>Adding..</button>}
      </form>
      {isDone && <p>Posted blog!</p>}
    </div>
  );
}

export default Create;