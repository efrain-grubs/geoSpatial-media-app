import React, { useEffect, useState } from 'react';
import customAxios from '../api/customAxios';

function MyPost() {
  const [posts, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const info = await customAxios.get('/post/');
        setPost(info.data.findUser);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    getPost();
  }, []);

  function Delete(id) {
    const deletePost = posts.filter((post) => post._id !== id);
    setPost(deletePost);

    const sendDeletion = async () => {
      try {
        await customAxios.delete(`/post/${id}`);
      } catch (err) {
        console.log('error: ', err);
      }
    };

    sendDeletion();
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
      }}
    >
      {posts?.map((post) => (
        <div
          key={post._id}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          <img
            alt="user post"
            src={post.postImage}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
          <h3
            style={{
              marginTop: '0.75rem',
              fontSize: '1.2rem',
              textAlign: 'left',
              color: '#111827',
            }}
          >
            {post.title}
          </h3>
          <button
            onClick={() => Delete(post._id)}
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyPost;

