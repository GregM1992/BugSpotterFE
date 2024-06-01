import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPosts, getPostsByTagId } from '../api/postData';
import PostCard from '../components/PostCard';
import { getAllTags } from '../api/tagData';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const getAllPosts = () => {
    getPosts().then((data) => {
      setPosts(data);
    });
  };

  const getTags = () => {
    getAllTags().then((data) => {
      setTags(data);
    });
  };

  const handleFilter = (tagId) => {
    getPostsByTagId(tagId).then((data) => {
      if (data.length === 0) {
        setPosts([]);
      }
      setPosts(data);
    });
  };

  useEffect(() => {
    getAllPosts();
    getTags();
  }, []);

  return (
    <div>
      <h1 style={{
        textAlign: 'center',
        marginTop: '20px',
        fontWeight: 'bold',
      }}
      >Feed
      </h1>
      <div className="filterTitle">
        <h4>Filter posts by Tag</h4>
      </div>
      <div className="tagFilterButtonsDiv">
        {tags.map((tag) => (
          <Button
            className="filterButtons"
            variant="outline-dark"
            key={tag.id}
            onClick={() => {
              handleFilter(tag.id);
            }}
          >
            {tag.tagType}
          </Button>
        ))}
      </div>
      <div className="removeFilterDiv">
        <Button className="filterButtons" variant="outline-success" onClick={getAllPosts}>Remove Filters</Button>
      </div>

      <div className="feedContainer">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} location="feed" />
        ))}

      </div>
    </div>

  );
}
