import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const Body = () => {
  const [postContent, setPostContent] = useState({ 
    title: '', 
    description: ''
  });
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const queryClient = useQueryClient();

  // Fetch posts
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/post/allPosts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      return data.posts || [];
    },
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData) => {
      const response = await fetch('http://localhost:3000/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create post');
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success('Post created successfully!');
      queryClient.invalidateQueries(['posts']);
      setPostContent({ title: '', description: '' });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.title.trim() || !postContent.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    createPostMutation.mutate(postContent);
  };

  return (
    <div className="min-h-screen bg-black flex justify-center">
      <div className="max-w-3xl w-full px-4 py-8">
        {/* Toggle Button */}
        <button
          onClick={() => setIsCreatePostVisible(!isCreatePostVisible)}
          className="mb-6 bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
        >
          {isCreatePostVisible ? 'Hide Create Post' : 'Show Create Post'}
        </button>

        {/* Create Post Form */}
        {isCreatePostVisible && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Create New Post</h2>
            <form onSubmit={handleSubmit} className="bg-purple-900 rounded-2xl shadow-lg p-8 space-y-6 border-2 border-white">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter an engaging title"
                  value={postContent.title}
                  onChange={(e) => setPostContent({ ...postContent, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white border border-white/30 
                           focus:ring-2 focus:ring-white focus:border-transparent transition duration-200
                           placeholder-purple-300"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Share your thoughts..."
                  value={postContent.description}
                  onChange={(e) => setPostContent({ ...postContent, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-purple-800 text-white border border-white/30
                           focus:ring-2 focus:ring-white focus:border-transparent transition duration-200
                           placeholder-purple-300 h-32"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={createPostMutation.isLoading}
                className="w-full bg-white text-purple-900 py-3 rounded-lg font-semibold
                         hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
                         focus:ring-offset-purple-900 disabled:bg-purple-300 disabled:cursor-not-allowed
                         transition duration-200"
              >
                {createPostMutation.isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </form>
          </div>
        )}

        {/* Posts Display Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-6">Recent Posts</h2>
          
          {isLoading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/50 border-2 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-200">{error.message}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.isArray(data) && data.map((post, index) => (
              <div
                key={post._id}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-purple-900 border-2 border-white 
                shadow-[0_4px_6px_rgba(255,255,255,0.3)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.4)]
                transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
              >
                <div className="flex-1 max-w-2xl text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {post.title}
                  </h3>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {Array.isArray(data) && data.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-white">No posts yet</h3>
              <p className="mt-1 text-sm text-gray-300">Get started by creating a new post.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;