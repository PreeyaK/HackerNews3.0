import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { fetchPosts } from './fetchPost'; // Adjust the import path

// Create an instance of AxiosMockAdapter
const mock = new AxiosMockAdapter(axios);

describe('fetchPosts', () => {
  afterEach(() => {
    // Reset the mock after each test to avoid interference between tests
    mock.reset();
  });

  test('fetches posts successfully for a given type and page', async () => {
    const type = 'new'; // Example type
    const page = 1; // Example page

    // Mock the first GET request to return post IDs
    mock.onGet(`https://hacker-news.firebaseio.com/v0/${type}.json`).reply(200, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    // Mock the GET requests for individual post details
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/1.json`).reply(200, { id: 1, title: 'Post 1' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/2.json`).reply(200, { id: 2, title: 'Post 2' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/3.json`).reply(200, { id: 3, title: 'Post 3' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/4.json`).reply(200, { id: 4, title: 'Post 4' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/5.json`).reply(200, { id: 5, title: 'Post 5' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/6.json`).reply(200, { id: 6, title: 'Post 6' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/7.json`).reply(200, { id: 7, title: 'Post 7' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/8.json`).reply(200, { id: 8, title: 'Post 8' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/9.json`).reply(200, { id: 9, title: 'Post 9' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/10.json`).reply(200, { id: 10, title: 'Post 10' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/11.json`).reply(200, { id: 11, title: 'Post 11' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/12.json`).reply(200, { id: 12, title: 'Post 12' });

    // Call the fetchPosts function
    const posts = await fetchPosts(type, page);

    // Assert that the correct number of posts is fetched (12 posts in this case)
    expect(posts).toHaveLength(12);

    // Assert that the posts are returned with correct titles
    expect(posts[0].title).toBe('Post 1');
    expect(posts[1].title).toBe('Post 2');
  });

  test('handles errors gracefully if the API fails', async () => {
    const type = 'new';
    const page = 1;

    // Simulate an error response for the initial request to get post IDs
    mock.onGet(`https://hacker-news.firebaseio.com/v0/${type}.json`).reply(500);

    // Call the fetchPosts function and assert that it throws an error
    await expect(fetchPosts(type, page)).rejects.toThrow('Error fetching new posts');
  });

  test('returns the correct posts based on pagination', async () => {
    const type = 'new';
    const page = 0;

    // Mock the GET requests to return a subset of posts (e.g., first 12 posts)
    mock.onGet(`https://hacker-news.firebaseio.com/v0/${type}.json`).reply(200, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/1.json`).reply(200, { id: 1, title: 'Post 1' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/2.json`).reply(200, { id: 2, title: 'Post 2' });
    // ...repeat for all 12 posts...

    // Call the fetchPosts function with page 0
    const posts = await fetchPosts(type, page);

    // Assert that we get exactly 12 posts from the first page
    expect(posts).toHaveLength(12);
    expect(posts[0].title).toBe('Post 1');
  });

  test('fetches different posts when page changes', async () => {
    const type = 'new';
    const page = 1;

    // Mock responses for two different pages
    mock.onGet(`https://hacker-news.firebaseio.com/v0/${type}.json`).reply(200, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/13.json`).reply(200, { id: 13, title: 'Post 13' });
    mock.onGet(`https://hacker-news.firebaseio.com/v0/item/14.json`).reply(200, { id: 14, title: 'Post 14' });
    // ...repeat for all 12 posts...

    // Call the fetchPosts function with page 1
    const posts = await fetchPosts(type, page);

    // Assert that we get exactly 12 new posts for page 1
    expect(posts).toHaveLength(12);
    expect(posts[0].title).toBe('Post 13');
  });
});
