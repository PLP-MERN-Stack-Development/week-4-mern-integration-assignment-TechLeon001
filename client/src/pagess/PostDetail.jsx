import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { usePosts } from '../context/PostContext';
import PostForm from '../components/PostForm';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const { posts, updatePost, deletePost } = usePosts();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundPost = posts.find(p => p._id === id);
    setPost(foundPost);
  }, [id, posts]);

  const handleUpdate = async (updatedPost) => {
    await updatePost(id, updatedPost);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deletePost(id);
  };

  if (!post) return <CircularProgress />;

  return (
    <Box>
      {isEditing ? (
        <PostForm post={post} onSubmit={handleUpdate} />
      ) : (
        <>
          <Typography variant="h3">{post.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            By {post.author}
          </Typography>
          <Typography variant="body1" paragraph>
            {post.content}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              onClick={() => setIsEditing(true)}
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleDelete}
              sx={{ mr: 2 }}
            >
              Delete
            </Button>
            <Button component={Link} to="/" variant="outlined">
              Back to Posts
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PostDetail;