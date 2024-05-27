import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CollectionForm from '../../../components/forms/CollectionForm';
import { getSingleCollection } from '../../../api/collectionData';

export default function EditCollection() {
  const [collection, setCollection] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCollection(id).then((data) => {
      setCollection(data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h1>Edit Collection</h1>
      <CollectionForm collectionObj={collection} />
    </div>
  );
}
