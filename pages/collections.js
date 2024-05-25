import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getCollectionsByUserId } from '../api/collectionData';
import CollectionCard from '../components/CollectionCard';
import { useAuth } from '../utils/context/authContext';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const { user } = useAuth();

  const getAllCollections = () => {
    getCollectionsByUserId(user.id).then((data) => {
      setCollections(data);
    });
  };

  useEffect(() => {
    getAllCollections();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div>
      <h1>Collections</h1>
      <Button href="/collection/new">Create New Collection</Button>
      <div>
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collectionObj={collection} onUpdate={getAllCollections} />
        ))}
      </div>
    </div>
  );
}
