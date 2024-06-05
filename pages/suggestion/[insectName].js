import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SuggestionInfoCard from '../../components/SuggestionInfoCard';
import { getInsectDetails, searchInsects } from '../../api/kindWiseApiData';

export default function SuggestionDetails() {
  const [insectAccessToken, setInsectAccessToken] = useState({ entities: [] });
  const [insect, setInsect] = useState({
    common_names: [], url: '', description: '', image: '',
  });
  const router = useRouter();
  const { id } = router.query;

  const getInsect = async () => {
    try {
      const data = await searchInsects(id);
      const accessToken = data.entities[0].access_token;
      setInsectAccessToken(accessToken);

      const insectData = await getInsectDetails(insectAccessToken);
      setInsect(insectData);
    } catch (error) {
      console.error('Error fetching insect data:', error);
    }
  };

  useEffect(() => {
    getInsect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <SuggestionInfoCard suggestionObj={insect} />
  );
}
