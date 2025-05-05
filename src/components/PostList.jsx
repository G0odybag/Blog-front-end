import { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const PostList = ({ onAddPost, onEditPost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Sample data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with Our Platform',
      category: 'Tutorial',
      status: 'published',
      date: '2024-05-01',
      author: 'Admin'
    },
    {
      id: 2,
      title: 'Advanced Tips and Tricks',
      category: 'Guide',
      status: 'draft',
      date: '2024-05-15',
      author: 'Editor'
    },
    {
      id: 3,
      title: 'New Features Coming Soon',
      category: 'News',
      status: 'scheduled',
      date: '2024-06-01',
      author: 'Admin'
    }
  ]);

  const categories = ['All', 'Tutorial', 'Guide', 'News'];
  const filters = ['all', 'published', 'drafts', 'trash'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || post.status === activeFilter;
    const matchesCategory = !activeCategory || post.category === activeCategory;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Post Management</h1>
        <button 
          onClick={onAddPost}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlus className="mr-2" /> Add New Post
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3 text-gray-700">Filters</h3>
          <ul className="space-y-2">
            {filters.map(filter => (
              <li key={filter}>
                <button
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full text-left px-3 py-2 rounded ${activeFilter === filter ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6 mb-3 text-gray-700">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category === 'All' ? null : category)}
                  className={`w-full text-left px-3 py-2 rounded ${(!activeCategory && category === 'All') || activeCategory === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6 mb-3 text-gray-700">Date</h3>
          <select className="w-full border rounded p-2 text-sm">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select className="border rounded p-2 text-sm">
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Title (A-Z)</option>
                  <option>Title (Z-A)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          post.status === 'published' ? 'bg-blue-100 text-blue-800' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => onEditPost(post)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <FiEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPosts.length}</span> of{' '}
                    <span className="font-medium">{posts.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      &larr;
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      &rarr;
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;