import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, MenuItem, CircularProgress } from '@mui/material';
import { usePosts } from '../context/PostContext';

const PostForm = ({ post, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { categories, loading } = usePosts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post, reset]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      if (!post) reset();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        {...register('title', { required: 'Title is required' })}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Content"
        multiline
        rows={4}
        {...register('content', { required: 'Content is required' })}
        error={!!errors.content}
        helperText={errors.content?.message}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        {...register('author', { required: 'Author is required' })}
        error={!!errors.author}
        helperText={errors.author?.message}
      />
      
      {!loading && categories && (
        <TextField
          fullWidth
          margin="normal"
          select
          label="Categories"
          SelectProps={{ multiple: true }}
          {...register('categories')}
        >
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : post ? 'Update Post' : 'Create Post'}
      </Button>
    </Box>
  );
};

export default PostForm;