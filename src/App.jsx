import { useState } from 'react';
import PostList from './components/PostList';
import PostEditor from './components/PostEditor';

function App() {
  const [view, setView] = useState('list'); // 'list' or 'editor'
  const [editingPost, setEditingPost] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'list' ? (
        <PostList 
          onAddPost={() => {
            setEditingPost(null);
            setView('editor');
          }}
          onEditPost={(post) => {
            setEditingPost(post);
            setView('editor');
          }}
        />
      ) : (
        <PostEditor 
          post={editingPost}
          onBackToList={() => setView('list')}
        />
      )}
    </div>
  );
}

export default App;