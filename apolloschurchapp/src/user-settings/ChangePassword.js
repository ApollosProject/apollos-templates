import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { SafeAreaView, Header } from 'react-navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Button,
  ButtonLink,
  TextInput,
  PaddedView,
  FlexedView,
  styled,
} from '@apollosproject/ui-kit';

import GET_AUTH_TOKEN from '../store/getAuthToken';
import CHANGE_PASSWORD from './passwordChange';

const Footer = styled({
  flex: 1,
  justifyContent: 'flex-end',
})(SafeAreaView);

class ChangePassword extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Change Password',
    headerLeft: null,
    headerRight: (
      <PaddedView vertical={false}>
        <ButtonLink onPress={() => navigation.goBack()}>Cancel</ButtonLink>
      </PaddedView>
    ),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
  };

  renderForm = (props) => (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={StyleSheet.absoluteFill}
      keyboardVerticalOffset={
        Header.HEIGHT +
        (Platform.OS === 'android' ? StatusBar.currentHeight : 0)
      }
    >
      <FlexedView>
        <PaddedView>
          <TextInput
            label="New Password"
            type="password"
            value={props.values.password}
            error={props.touched.password && props.errors.password}
            onChangeText={(text) => props.setFieldValue('password', text)}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            value={props.values.confirmPassword}
            error={
              props.touched.confirmPassword && props.errors.confirmPassword
            }
            onChangeText={(text) =>
              props.setFieldValue('confirmPassword', text)
            }
          />
        </PaddedView>
        <Footer>
          <PaddedView>
            <Button
              disabled={props.isSubmitting}
              onPress={props.handleSubmit}
              title="Save"
              loading={props.isSubmitting}
            />
          </PaddedView>
        </Footer>
      </FlexedView>
    </KeyboardAvoidingView>
  );

  render() {
    return (
      <Mutation
        mutation={CHANGE_PASSWORD}
        update={async (cache, { data: { token } }) => {
          await cache.writeQuery({
            query: GET_AUTH_TOKEN,
            data: { authToken: token },
          });

          await cache.writeData({
            data: { authToken: token },
          });
        }}
      >
        {(updatePassword) => (
          <Formik
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match.')
                .required('Password confirm is required'),
            })}
            onSubmit={async (variables, { setSubmitting, setFieldError }) => {
              try {
                await updatePassword({ variables });

                await this.props.navigation.goBack();
              } catch (e) {
                const { graphQLErrors } = e;
                if (graphQLErrors.length) {
                  setFieldError(
                    'confirmPassword',
                    'Unknown error. Please try again later.'
                  );
                }
              }
              setSubmitting(false);
            }}
          >
            {this.renderForm}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default ChangePassword;
