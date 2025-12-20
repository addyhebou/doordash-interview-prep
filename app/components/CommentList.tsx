'use client';
import React, { memo } from 'react';
import { useComments, Comment } from '../context/CommentContext';

type CommentListProps = {
  pageIndex: number;
};

type CommentItemProps = {
  comment: Comment;
  onVote: (commentId: number, action: 'up' | 'down') => void;
};

const CommentItem = memo(function CommentItem({
  comment,
  onVote,
}: CommentItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #eee',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <button
        style={{
          color: '#dc3545',
          border: '1px solid #dc3545',
          backgroundColor: 'transparent',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
        onClick={() => onVote(comment.id, 'down')}
      >
        👎 {comment.dislikes}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, wordWrap: 'break-word' }}>{comment.value}</p>
        <small style={{ color: '#666', fontSize: '11px' }}>
          {new Date(comment.timestamp).toLocaleString()}
        </small>
      </div>

      <button
        style={{
          color: '#28a745',
          border: '1px solid #28a745',
          backgroundColor: 'transparent',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
        onClick={() => onVote(comment.id, 'up')}
      >
        👍 {comment.likes}
      </button>
    </div>
  );
});

export const CommentList = memo(function CommentList({
  pageIndex,
}: CommentListProps) {
  const { getCommentsForPage, voteComment } = useComments();
  const comments = getCommentsForPage(pageIndex);

  const handleVote = (commentId: number, action: 'up' | 'down') => {
    voteComment(pageIndex, commentId, action);
  };

  if (comments.length === 0) {
    return (
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
      <h3 style={{ marginBottom: '15px' }}>Comments ({comments.length})</h3>
      {comments
        .sort((a, b) => b.timestamp - a.timestamp) // Show newest first
        .map((comment) => (
          <CommentItem key={comment.id} comment={comment} onVote={handleVote} />
        ))}
    </div>
  );
});
