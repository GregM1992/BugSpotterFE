import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SuggestionInfoCard from '../../components/SuggestionInfoCard';
import { getInsectDetails, searchInsects } from '../../api/kindWiseApiData';

export default function SuggestionDetails() {
  const [, setInsectAccessToken] = useState('');
  const [insect, setInsect] = useState({
    common_names: [], url: '', description: { value: '' }, image: { value: '' },
  });
  const router = useRouter();
  const { insectName } = router.query;

  const getInsect = async () => {
    try {
      const data = await searchInsects(insectName);
      const accessToken = data.entities[0].access_token;
      setInsectAccessToken(accessToken);

      const insectData = await getInsectDetails(accessToken);
      setInsect(insectData);
    } catch (error) {
      console.error('Error fetching insect data:', error);
    }
  };

  useEffect(() => {
    if (insectName) {
      getInsect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insectName]);

  return (
    <SuggestionInfoCard suggestionObj={insect} />
  );
}
