import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CardActionArea } from '@mui/material';
import { fetchPosts } from '../apis/fetchPost';

// Utility function for calculating time difference
const calculateAgoTime = (timestamp) => {
  const timeInMilliseconds = timestamp * 1000;
  const now = Date.now();
  const diff = now - timeInMilliseconds;

  if (diff < 1000 * 60) {
    const seconds = Math.floor(diff / 1000);
    return `${seconds} seconds ago`;
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minutes ago`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days ago`;
  }
};

const PostList = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const newPosts = await fetchPosts(type, page);
        setPosts((prevPosts) => (page === 0 ? newPosts : [...prevPosts, ...newPosts]));
      } catch (error) {
        console.error("Error loading posts: ", error);
      }
    };

    loadPosts();
  }, [type, page]);

  return (
    <div style={{ padding: "30px", backgroundColor: "#000" }}>
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid
            item
            xs={12}
            sm={index < 4 ? 6 : 12}
            md={index < 4 ? 6 : 3}
            key={post.id}
          >
            <Card sx={{
              height: '150px', 
              padding: '10px', 
              margin: '10px',
              "&:hover": {
                transform: "scale(1.05)", 
                boxShadow: "0 8px 16px rgba(255, 255, 255, 0.2)", 
              },
            }}>
              <CardActionArea
                component="a"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h7">{post.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.score + ' points | ' + post.type + ' by ' + post.by + ' | ' + calculateAgoTime(post.time)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        variant="contained"
        sx={{ marginTop: 2, backgroundColor: '#0c84ff' }}
      >
        Show More
      </Button>
    </div>
  );
};

export default PostList;
