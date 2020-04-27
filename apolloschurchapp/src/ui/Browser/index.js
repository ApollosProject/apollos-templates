import React from 'react';
import PropTypes from 'prop-types';
import { ModalView, styled } from '@apollosproject/ui-kit';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';

const FlexedSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.black,
}))(SafeAreaView);

const Browser = ({ url, cookie, modal, navigation }) => {
  if (modal) {
    return (
      <ModalView navigation={navigation} onClose={() => navigation.pop()}>
        <FlexedSafeAreaView>
          <WebView source={{ uri: url, headers: { Cookie: cookie } }} />
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
  return <WebView source={{ uri: url, headers: { Cookie: cookie } }} />;
};

Browser.propTypes = {
  url: PropTypes.string.isRequired,
  cookie: PropTypes.string,
  modal: PropTypes.bool.isRequired,
};

export default Browser;
