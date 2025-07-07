import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await api.fetchPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const addPost = async (post) => {
    try {
      const { data } = await api.createPost(post);
      setPosts([...posts, data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const { data } = await api.updatePost(id, updatedPost);
      setPosts(posts.map(post => post._id === id ? data : post));
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.deletePost(id);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PostContext.Provider value={{
      posts,
      categories,
      loading,
      error,
      addPost,
      updatePost,
      deletePost,
      fetchPosts
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);