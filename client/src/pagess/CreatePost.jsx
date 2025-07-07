import { Container } from '@mui/material';
import PostForm from '../components/PostForm';
import { usePosts } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = async (post) => {
    await addPost(post);
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Create New Post</Typography>
      <PostForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default CreatePost;