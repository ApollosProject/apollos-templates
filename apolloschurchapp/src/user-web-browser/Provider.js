import { createContext } from 'react';
import NavigationService from '../NavigationService';

// Can can either call the OpenUserWebView function directly, or call it using
// the Consumer. Your choice.
export const OpenUserWebView = ({ url }) =>
  NavigationService.navigate('UserWebBrowser', { url });

const { Provider, Consumer } = createContext(OpenUserWebView);

export { Provider as UserWebBrowserProvider };
export { Consumer as UserWebBrowserConsumer };
