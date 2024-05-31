import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getPostsByCollectionId } from '../../api/postData';
import { getSingleCollection } from '../../api/collectionData';
import PostCard from '../../components/PostCard';

export default function CollectionDetails() {
  const [posts, setPosts] = useState([]);
  const [collection, setCollection] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getPosts = () => {
    getPostsByCollectionId(id).then((data) => {
      setPosts(data);
    });
  };
  const getCollection = () => {
    getSingleCollection(id).then((data) => {
      setCollection(data);
    });
  };
  const pushToPostForm = () => {
    router.push('/post/new');
  };

  useEffect(() => {
    getPosts();
    getCollection();
    console.warn(posts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="collectionDiv">
      <h1>{collection.name}</h1>
      <Button variant="outline-secondary" onClick={pushToPostForm}>Add Post</Button>
      {posts.length === 0 ? <p>There are no posts yet</p> : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} postObj={post} onUpdate={getPosts} location="collectionDetails" />
          ))}
        </div>
      )}
    </div>
  );
}
