import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

  useEffect(() => {
    getPosts();
    getCollection();
  }, [id]);

  return (
    <div>
      <h1>{collection.name}</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getPosts} location="collectionDetails" />
        ))}
      </div>
    </div>
  );
}
