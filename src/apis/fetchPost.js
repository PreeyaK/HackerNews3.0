import axios from 'axios';

// Fetch posts by type and page
export const fetchPosts = async (type, page) => {
  try {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`);
    const postIds = response.data.slice(page * 12, (page + 1) * 12);

    const fetchedPosts = await Promise.all(
      postIds.map(async (id) => {
        const postResponse = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return postResponse.data;
      })
    );

    return fetchedPosts;
  } catch (error) {
    console.error(`Error fetching ${type} posts: `, error);
    throw error;
  }
};
