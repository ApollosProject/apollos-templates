import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  ErrorCard,
  TabView,
  TabSceneMap as SceneMap,
  BackgroundView,
  styled,
} from '@apollosproject/ui-kit';
import ContentTab from './ContentTab';
import ScriptureTab from './ScriptureTab';

import GET_SCRIPTURE from './getScripture';

const FlexedSafeAreaView = styled({ flex: 1 })(SafeAreaView);

/**
 * The devotional component.
 * Displays a TabView with two tabs: ContentTab and ScriptureTab.
 */
class DevotionalContentItem extends PureComponent {
  static propTypes = {
    /** The id of the devotional item */
    id: PropTypes.string.isRequired,
    content: PropTypes.shape({
      /** The devotional title */
      title: PropTypes.string,
    }),
    /** Toggles placeholders */
    loading: PropTypes.bool,
    navigation: PropTypes.shape({}),
  };

  /**
   * Function to get the scripture references from the larger scripture object.
   * Props: full scripture array of objects
   * Returns: an array of scripture references.
   */
  getScriptureReferences = (scripture) => {
    let arrayOfRefrences = null;

    if (scripture) {
      arrayOfRefrences = scripture.map(
        (ref) =>
          // only add refs to the array if they exist
          ref.reference || ''
      );
    }

    return arrayOfRefrences;
  };

  /**
   * The route that TabView uses to render the ContentTab.
   * Note: navigationState gets passed down automatically from the TabView.
   */
  contentRoute = ({ scriptures, loading }) => (navigationState) => (
    <ContentTab
      id={this.props.id}
      references={this.getScriptureReferences(scriptures)}
      title={this.props.content.title}
      navigationState={navigationState}
      navigation={this.props.navigation}
      isLoading={this.props.loading || loading}
    />
  );

  /**
   * The route that TabView uses to render the ScriptureTab
   */
  scriptureRoute = ({ scriptures, loading }) => () => (
    <ScriptureTab
      id={this.props.id}
      scripture={scriptures}
      navigation={this.props.navigation}
      isLoading={this.props.loading || loading}
    />
  );

  renderLoading = () => (
    <ContentTab title={''} isLoading navigation={this.props.navigation} />
  );

  renderTabs = ({ data, error, loading }) => {
    if (error) return <ErrorCard error={error} />;

    const scriptures = get(data, 'node.scriptures', []);

    // only include scriptures where the references are not null
    const validScriptures = scriptures
      ? scriptures.filter((scripture) => scripture.reference != null)
      : [];

    const hasScripture = loading || validScriptures.length;
    const tabRoutes = [{ title: 'Devotional', key: 'content' }];
    const map = {
      content: this.contentRoute({ scriptures, loading }),
    };
    if (hasScripture) {
      tabRoutes.push({ title: 'Scripture', key: 'scripture' });
      map.scripture = this.scriptureRoute({ scriptures, loading });
    }
    return tabRoutes.length < 2 ? (
      map[tabRoutes[0].key]()
    ) : (
      <TabView routes={tabRoutes} renderScene={SceneMap(map)} />
    );
  };

  render() {
    return (
      <BackgroundView>
        <FlexedSafeAreaView forceInset={{ top: 'always' }}>
          <Query query={GET_SCRIPTURE} variables={{ itemId: this.props.id }}>
            {({ data, loading, error }) =>
              loading
                ? this.renderLoading()
                : this.renderTabs({ data, loading, error })
            }
          </Query>
        </FlexedSafeAreaView>
      </BackgroundView>
    );
  }
}

export default DevotionalContentItem;
