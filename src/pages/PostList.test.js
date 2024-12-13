import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostList from './PostList'; // Adjust the import path based on your file structure
import { fetchPosts } from '../apis/fetchPost'; // Adjust the import path

// Mocking the fetchPosts function
jest.mock('../apis/fetchPost');

// Sample posts data to be used in tests
const samplePosts = [
  { id: 1, title: 'Post 1', score: 10, type: 'story', by: 'user1', time: 1626192345, url: 'https://example.com' },
  { id: 2, title: 'Post 2', score: 20, type: 'story', by: 'user2', time: 1626191345, url: 'https://example.com' },
];

describe('PostList Component', () => {
  beforeEach(() => {
    // Clear any previous mocks
    fetchPosts.mockClear();
  });

  test('renders posts when fetchPosts is called', async () => {
    // Mock the API call to return sample posts
    fetchPosts.mockResolvedValue(samplePosts);

    render(<PostList type="new" />);

    // Assert that the posts are rendered
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
      expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    // Assert that post data is displayed correctly
    expect(screen.getByText('10 points | story by user1 | 1 day ago')).toBeInTheDocument();
  });

  test('displays loading state while fetching posts', async () => {
    // Mock fetchPosts to simulate a delay
    fetchPosts.mockResolvedValueOnce(new Promise((resolve) => setTimeout(() => resolve(samplePosts), 1000)));

    render(<PostList type="new" />);

    // Check that posts are not rendered immediately
    expect(screen.queryByText('Post 1')).toBeNull();
    expect(screen.queryByText('Post 2')).toBeNull();

    // Wait for posts to appear after fetch completes
    await waitFor(() => {
      expect(screen.getByText('Post 1')).toBeInTheDocument();
    });
  });

  test('displays "Show More" button', async () => {
    // Mock fetchPosts to return sample posts
    fetchPosts.mockResolvedValue(samplePosts);

    render(<PostList type="new" />);

    // Assert that the "Show More" button is visible
    expect(screen.getByText('Show More')).toBeInTheDocument();
  });

  test('fetches more posts when "Show More" button is clicked', async () => {
    // Mock fetchPosts for multiple calls (first page and second page)
    fetchPosts.mockResolvedValueOnce(samplePosts);
    fetchPosts.mockResolvedValueOnce([
      { id: 3, title: 'Post 3', score: 30, type: 'story', by: 'user3', time: 1626190345, url: 'https://example.com' },
    ]);

    render(<PostList type="new" />);

    // Click the "Show More" button
    fireEvent.click(screen.getByText('Show More'));

    // Wait for new posts to appear
    await waitFor(() => {
      expect(screen.getByText('Post 3')).toBeInTheDocument();
    });
  });

  test('handles error state if fetchPosts fails', async () => {
    // Mock fetchPosts to simulate an error
    fetchPosts.mockRejectedValueOnce(new Error('Failed to fetch posts'));

    render(<PostList type="new" />);

    // Wait for error handling to show up
    await waitFor(() => {
      expect(screen.getByText('Error loading posts')).toBeInTheDocument();
    });
  });

  test('handles edge case when no posts are returned', async () => {
    // Mock fetchPosts to return an empty array (no posts)
    fetchPosts.mockResolvedValueOnce([]);

    render(<PostList type="new" />);

    // Assert that a "No posts found" message is displayed
    await waitFor(() => {
      expect(screen.getByText('No posts found')).toBeInTheDocument();
    });
  });
});
