import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  H2,
  H5,
  HorizontalTileFeed,
  PaddedView,
  styled,
  TouchableScale,
  withIsLoading,
} from '@apollosproject/ui-kit';
import { horizontalContentCardComponentMapper } from '@apollosproject/ui-connected';

const Title = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
  }),
  'HorizontalCardListFeature.Title'
)(H5);

const Subtitle = styled({}, 'HorizontalCardListFeature.Subtitle')(H2);

const Header = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 3,
  paddingBottom: theme.sizing.baseUnit * 0.5,
}))(PaddedView);

class HorizontalCardListFeature extends PureComponent {
  loadingStateObject = {
    id: 'fakeId0',
    isLoading: true,
    title: 'Boom',
    hasAction: true,
    actionIcon: 'umbrella',
    channelType: '',
    coverImage: [],
    // We need to assume a typename so horizontalContentCardComponentMapper knows what "type" to render
    __typename: 'MediaContentItem',
  };

  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    isLoading: PropTypes.bool,
    listKey: PropTypes.string, // needed if multiple lists/feeds are displayed as siblings
    onPressItem: PropTypes.func,
    subtitle: PropTypes.string,
    title: PropTypes.string,
  };

  keyExtractor = (item) => item && item.id;

  renderItem = ({ item }) => (
    <TouchableScale onPress={() => this.props.onPressItem(item)}>
      {horizontalContentCardComponentMapper({ ...item })}
    </TouchableScale>
  );

  render() {
    return (
      <View>
        <Header vertical={false}>
          {this.props.isLoading || this.props.title ? ( // we check for isloading here so that they are included in the loading state
            <Title numberOfLines={1}>{this.props.title}</Title>
          ) : null}
          {this.props.isLoading || this.props.subtitle ? (
            <Subtitle>{this.props.subtitle}</Subtitle>
          ) : null}
        </Header>
        <HorizontalTileFeed
          content={this.props.cards}
          isLoading={this.props.isLoading}
          listKey={this.props.listKey}
          keyExtractor={this.keyExtractor}
          loadingStateObject={this.loadingStateObject}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default withIsLoading(HorizontalCardListFeature);
