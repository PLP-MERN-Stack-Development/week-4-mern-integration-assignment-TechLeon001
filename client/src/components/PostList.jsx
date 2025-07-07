import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { Box, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

const PostList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Blog Posts</Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post._id} component={Link} to={`/posts/${post._id}`}>
            <ListItemText primary={post.title} secondary={post.author} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PostList;