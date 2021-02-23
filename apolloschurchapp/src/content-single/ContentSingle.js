import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';
import {
  InteractWhenLoadedConnected,
  NodeSingleConnected,
  ThemeMixinConnected,
} from '@apollosproject/ui-connected';

import ActionContainer from './ActionContainer';

const ContentSingle = (props) => {
  const nodeId = props.route?.params?.itemId;
  const { data, loading } = useQuery(
    gql`
      query getContentNodeTitle($nodeId: ID!) {
        node(id: $nodeId) {
          ... on ContentNode {
            id
            title
          }
        }
      }
    `,
    { variables: { nodeId } }
  );
  return (
    <ThemeMixinConnected nodeId={nodeId}>
      <InteractWhenLoadedConnected
        isLoading={loading}
        nodeId={nodeId}
        action={'COMPLETE'}
      />
      <TrackEventWhenLoaded
        isLoading={loading}
        eventName={'View Content'}
        properties={{
          title: data?.node?.title,
          itemId: nodeId,
        }}
      />
      <NodeSingleConnected nodeId={nodeId}>
        <ActionContainer itemId={nodeId} />
      </NodeSingleConnected>
    </ThemeMixinConnected>
  );
};

ContentSingle.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }),
};

export default ContentSingle;
