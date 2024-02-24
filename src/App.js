import React, { useState } from 'react';



const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [replyText, setReplyText] = useState('');

  const handlePostComment = () => {
    setComments([...comments, { text: newComment, replies: [], starred: false, timestamp: new Date() }]);
    setNewComment('');
  };

  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies = updatedComments[commentIndex].replies.filter((_, i) => i !== replyIndex);
    setComments(updatedComments);
  };
  

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleReplyToComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.push({ text: replyText, timestamp: new Date() });
    setComments(updatedComments);
    setReplyText('');
  };
  
  
  

  const handleStarComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].starred = !updatedComments[index].starred;
    setComments(updatedComments);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="comment-section">
      <label>
        Sort by:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="replies">Most Replies</option>
        </select>
      </label>

      <br />
      <label>
        Show Timestamp:
        <input type="checkbox" checked={showTimestamp} onChange={() => setShowTimestamp(!showTimestamp)} />
      </label>

      <br />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment..."
      />
      <button onClick={handlePostComment}>Post Comment</button>

      {comments
        .sort((a, b) => {
          if (sortBy === 'latest') {
            return b.timestamp - a.timestamp;
          } else if (sortBy === 'replies') {
            return b.replies.length - a.replies.length;
          }
          return 0;
        })
        .map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            {showTimestamp && <p>{comment.timestamp.toString()}</p>}
            <button onClick={() => handleDeleteComment(index)}>Delete</button>
            <button onClick={() => handleStarComment(index)}>{comment.starred ? 'Unstar' : 'Star'}</button>

            <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <button onClick={() => handleReplyToComment(index)}>Reply</button>

          {comment.replies.map((reply, replyIndex) => (
  <div key={replyIndex}>
    <p>{reply.text}</p>
    <button onClick={() => handleDeleteReply(index, replyIndex)}>Delete Reply</button>
  </div>
))}

          </div>
        ))}
    </div>
  );
};

export default CommentSection;