import React from 'react';
import PropTypes from 'prop-types';

function TagCard({ tagObj }) {
  return (
    <div>
      <div>
        <p className="individualTagOnPost">{tagObj.tagType}</p>
      </div>
    </div>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    id: PropTypes.number,
    tagType: PropTypes.string,
  }).isRequired,
};

export default TagCard;
