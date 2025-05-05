import { useState } from 'react';
import { FiArrowLeft, FiSave, FiEye, FiTrash2, FiCalendar, FiImage } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostEditor = ({ post, onBackToList }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [status, setStatus] = useState(post?.status || 'draft');
  const [categories, setCategories] = useState(post?.categories || ['Tutorial']);
  const [tags, setTags] = useState(post?.tags || ['beginner', 'introduction']);
  const [newTag, setNewTag] = useState('');
  const [author, setAuthor] = useState(post?.author || 'Admin');
  const [scheduleDate, setScheduleDate] = useState(post?.scheduleDate || '');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(post?.image || null);

  const allCategories = ['Tutorial', 'Guide', 'News'];
  const allAuthors = ['Admin', 'Editor', 'Contributor', 'Guest Writer'];

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleCategory = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(cat => cat !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleSave = () => {
    // Save logic here
    alert('Post saved!');
    onBackToList();
  };

  const handlePublish = () => {
    // Publish logic here
    alert('Post published!');
    onBackToList();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBackToList}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Posts
        </button>
        <div className="flex space-x-3">
          <button className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <FiEye className="mr-2" /> Preview
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FiSave className="mr-2" /> Save Draft
          </button>
          <button 
            onClick={handlePublish}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {post ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          <input
            type="text"
            placeholder="Post Title"
            className="w-full text-3xl font-bold mb-6 p-2 border-b focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your post content here..."
            className="h-96 mb-6"
          />

          <div className="mt-16">
            <h3 className="font-semibold mb-3">Featured Image</h3>
            <div className="flex items-center gap-4">
              {selectedImage ? (
                <div className="relative">
                  <img src={selectedImage} alt="Featured" className="w-32 h-32 object-cover rounded" />
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                  <FiImage className="text-gray-400 text-2xl mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Status</h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>

            {status === 'scheduled' && (
              <div className="mt-3">
                <button 
                  onClick={() => setShowScheduleModal(true)}
                  className="flex items-center w-full justify-between border rounded p-2 hover:bg-gray-50"
                >
                  <span>{scheduleDate || 'Select date'}</span>
                  <FiCalendar />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {allCategories.map(category => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`cat-${category}`}
                    checked={categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mr-2"
                  />
                  <label htmlFor={`cat-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <span key={tag} className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm">
                  #{tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add tag and press Enter"
              className="w-full border rounded p-2 text-sm"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Author</h3>
            <select
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded p-2"
            >
              {allAuthors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-3">SEO Preview</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Title</p>
                <p className="font-medium truncate">{title || 'Your post title'}</p>
                <p className="text-xs text-gray-500">{title.length || 0}/70 characters</p>
              </div>
              <div>
                <p className="text-gray-600">URL</p>
                <p className="font-medium truncate">yoursite.com/{title.toLowerCase().replace(/\s+/g, '-') || 'post-slug'}</p>
              </div>
              <div>
                <p className="text-gray-600">Description</p>
                <p className="text-gray-700 truncate">{content.substring(0, 100) || 'Your post description will appear here...'}</p>
                <p className="text-xs text-gray-500">{content.length || 0}/160 characters</p>
              </div>
            </div>
          </div>

          {post && (
            <button className="flex items-center justify-center w-full bg-red-100 text-red-700 p-3 rounded-lg hover:bg-red-200 transition">
              <FiTrash2 className="mr-2" /> Move to Trash
            </button>
          )}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Schedule Post</h3>
              <button onClick={() => setShowScheduleModal(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="w-full border rounded p-2"
                  value="10:00"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    setStatus('scheduled');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;