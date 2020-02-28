import { StackActions, NavigationActions } from 'react-navigation';

let _navigator;

const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};

export const resetAction = ({ navigatorName, routeName }) =>
  StackActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({
        routeName: navigatorName,
        action: NavigationActions.navigate({
          routeName,
        }),
      }),
    ],
  });

const resetToAuth = () => {
  _navigator.dispatch(
    resetAction({
      navigatorName: 'Auth',
      routeName: 'AuthSMSPhoneEntryConnected',
    })
  );
};

const goBack = (from) => {
  let key;
  if (from) {
    const route = _navigator.state.nav.routes.find((r) => r.routeName === from);
    if (route) ({ key } = route);
  }
  _navigator.dispatch(NavigationActions.back({ key }));
};

export default {
  setTopLevelNavigator,
  navigate,
  resetAction,
  goBack,
  resetToAuth,
};
