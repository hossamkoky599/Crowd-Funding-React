import React, { useEffect, useState } from 'react';
import instance from '../apis/config';

const ReportButton = ({ type, projectId, commentId }) => {
  const [hover, setHover] = useState(false);

  const handleReport = async () => {
    const reason = prompt('Enter your reason for reporting:');
    if (reason) {
      await instance.post(`/reports/`, {
        report_type: type,
        reason,
        ...(projectId && { project_id: projectId }),
        ...(commentId && { comment_id: commentId }),
      });
      alert('Reported successfully');
    }
  };

  return (
    <button
      onClick={handleReport}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? '#6b24d6' : '#832ef9',
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
    >
      <span style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '2px 6px',
        borderRadius: '4px'
      }}>
        Report
      </span>
    </button>
  );
};

const Comment = ({ comment, onReply, isReplying, content, setContent, onSubmit, level = 0 }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className={`flex space-x-3 mb-4 ml-[${level * 16}px]`}>
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
      <div className="bg-white border border-gray-200 p-4 rounded shadow w-full">
        <p className="text-sm text-gray-500">
          {new Date(comment.created_at).toLocaleDateString()} •{' '}
          <span className="font-semibold text-green-700">{comment.user.first_name}</span>
        </p>
        <p className="mt-1 text-gray-700">{comment.content}</p>
      
        <div className="mt-2 text-sm flex gap-3">
          {level === 0 && (
            <button
              onClick={() => onReply(comment.id)}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                backgroundColor: hover ? '#6b24d6' : '#832ef9',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                Reply
              </span>
            </button>
          )}
          <ReportButton type="COMMENT" commentId={comment.id} />
        </div>

        {isReplying && (
          <div className="mt-3">
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your reply..."
            />
            <button
              onClick={onSubmit}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                backgroundColor: hover ? '#6b24d6' : '#832ef9',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                marginTop: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              <span style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Submit Reply
              </span>
            </button>
          </div>
        )}

        {comment.replies?.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                isReplying={false}
                content={content}
                setContent={setContent}
                onSubmit={onSubmit}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentsSection = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [activeReplyId, setActiveReplyId] = useState(null);

  const fetchComments = async () => {
    try {
      const res = await instance.get(`/comments/list/?project=${projectId}`);
      setComments(res.data.results);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const handleCommentSubmit = async () => {
    try {
      await instance.post(`/comments/`, {
        project: projectId,
        content,
        parent: activeReplyId,
      });
      setContent('');
      setActiveReplyId(null);
      fetchComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const [hoverComment, setHoverComment] = useState(false);

  return (
    <div className="mt-6 bg-gray-50 p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}>Comments</h2>


      </div>

      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={setActiveReplyId}
          isReplying={activeReplyId === comment.id}
          content={content}
          setContent={setContent}
          onSubmit={handleCommentSubmit}
          level={0}
        />
      ))}

      {!activeReplyId && (
        <div className="mt-4">
          <textarea
            className="w-full border border-gray-300 p-3 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            onClick={handleCommentSubmit}
            onMouseEnter={() => setHoverComment(true)}
            onMouseLeave={() => setHoverComment(false)}
            style={{
              backgroundColor: hoverComment ? '#6b24d6' : '#832ef9',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              marginTop: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            <span style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '4px 10px',
              borderRadius: '4px'
            }}>
              Comment
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;





