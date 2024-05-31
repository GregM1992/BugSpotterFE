import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getCollectionsByUserId } from '../api/collectionData';
import CollectionCard from '../components/CollectionCard';
import { useAuth } from '../utils/context/authContext';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getAllCollections = () => {
    getCollectionsByUserId(user.id).then((data) => {
      setCollections(data);
    });
  };

  const pushToNewCollection = () => {
    router.push('/collection/new');
  };

  useEffect(() => {
    getAllCollections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <div className="myCollectionsHeader">
        <h1 className="collectionsTitle">My Collections</h1>
        <Button variant="outline-secondary" onClick={pushToNewCollection}>Create New Collection</Button>
      </div>
      <div className="collectionsDiv">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collectionObj={collection} onUpdate={getAllCollections} />
        ))}
      </div>
    </div>
  );
}
