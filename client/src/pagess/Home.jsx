import PostList from '../components/PostList';
import { Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <PostList />
    </Container>
  );
};

export default Home;