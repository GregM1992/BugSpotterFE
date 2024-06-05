import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container } from 'react-bootstrap';
import { getCommentsByPostId } from '../../api/commentData';
import { getSinglePostByPostId } from '../../api/postData';
import CommentCard from '../../components/CommentCard';
import PostCard from '../../components/PostCard';
import TagCard from '../../components/TagCard';
import Map from '../../components/Map';
import CommentModalForm from '../../components/forms/CommentModalForm';
import { getSingleUser } from '../../api/userData';
import SuggestionModal from '../../components/forms/SuggestionModal';
import { getSuggestionsByPostId } from '../../api/suggestionData';
import SuggestionCard from '../../components/SuggestionCard';

export default function PostDetails() {
  const [post, setPost] = useState({ tags: [] });
  const [comments, setComments] = useState([{ user: {} }]);
  const [suggestions, setSuggestions] = useState([{ user: {} }]);
  const [userInfo, setUserInfo] = useState({});
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
  const getUserInfo = () => {
    getSingleUser(post.userId).then((data) => {
      setUserInfo(data);
    });
  };
  const getPostSuggestions = () => {
    getSuggestionsByPostId(id).then((data) => {
      setSuggestions(data);
      console.warn('suggestions', data);
    });
  };

  const handleLocationRender = () => {
    const lat = post.latitude;
    const lng = post.longitude;
    const center = { lat, lng };
    return center;
  };
  const pushToUsersPosts = () => {
    router.push(`/usersPosts/${post.userId}`);
  };

  useEffect(() => {
    getPost();
    getComments();
    getUserInfo();
    getPostSuggestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return (
    <div className="singlePostContainer">
      <h6 className="postTagTitle">Tags</h6>
      <div className="postTags">
        {post.tags.map((tag) => (
          <TagCard className="individualTagOnPost" key={tag.id} tagObj={tag} />
        ))}
      </div>
      <Button variant="outline-secondary" onClick={pushToUsersPosts}>Go to {userInfo.userName}&apos;s Post</Button>
      <Container className="postCardWithMapContainer">
        <PostCard className="singlePostCard" key={post.id} postObj={post} onUpdate={getPost} location="details" />
        <div className="descriptionDiv">
          {post.content}
        </div>
        <div className="postDetailsMap">
          <Map posts={[post]} center={handleLocationRender} />
        </div>
      </Container>
      {comments.map((comment) => (
        <CommentCard key={comment.id} commentObj={comment} onUpdate={getComments} />
      ))}
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestionObj={suggestion} onUpdate={getPostSuggestions} />
      ))}
      <CommentModalForm onUpdate={getComments} />
      <SuggestionModal onUpdate={getPostSuggestions} />
    </div>
  );
}
