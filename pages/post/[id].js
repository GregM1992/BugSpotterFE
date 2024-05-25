import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCommentsByPostId } from '../../api/commentData';
import { getSinglePostByPostId } from '../../api/postData';
import CommentCard from '../../components/CommentCard';
import PostCard from '../../components/PostCard';
import TagCard from '../../components/TagCard';

export default function PostDetails() {
  const [post, setPost] = useState({ tags: [] });
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getPost = () => {
    getSinglePostByPostId(id).then((data) => {
      setPost(data);
    });
  };
  const getComments = () => {
    getCommentsByPostId(id).then((data) => {
      setComments(data);
    });
  };

  useEffect(() => {
    getPost();
    getComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return (
    <>
      {post.tags.map((tag) => (
        <TagCard key={tag.id} tagObj={tag} />
      ))}
      <PostCard key={post.id} postObj={post} onUpdate={getPost} location="details" />
      <div className="descriptionDiv">
        {post.content}
      </div>
      {comments.map((comment) => (
        <CommentCard key={comment.id} commentObj={comment} onUpdate={getComments} />
      ))}
    </>
  );
}
