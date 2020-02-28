import React from 'react';
import PropTypes from 'prop-types';

import { ActionCard, BodyText } from '@apollosproject/ui-kit';
import { ShareButtonConnected } from '@apollosproject/ui-connected';

const TextFeature = ({ body, sharing: { message } = {}, contentId }) => (
  <ActionCard
    action={<ShareButtonConnected message={message} itemId={contentId} />}
  >
    <BodyText>{body}</BodyText>
  </ActionCard>
);

TextFeature.propTypes = {
  body: PropTypes.string.isRequired,
  sharing: PropTypes.shape({ message: PropTypes.string }),
  contentId: PropTypes.string.isRequired,
};

export default TextFeature;
