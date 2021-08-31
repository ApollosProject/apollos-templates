import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView } from 'react-native';
import { Mutation } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Button, TextInput, PaddedView, styled } from '@apollosproject/ui-kit';

import { SafeAreaView } from 'react-native-safe-area-context';
import CHANGE_PASSWORD from './passwordChange';

const FlexedKeyboardAvoidingView = styled({
  flex: 1,
})(KeyboardAvoidingView);

const Footer = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: theme.sizing.baseUnit * 5,
}))(SafeAreaView);

class ChangePassword extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
  };

  renderForm = (props) => (
    <FlexedKeyboardAvoidingView behavior="padding">
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
          error={props.touched.confirmPassword && props.errors.confirmPassword}
          onChangeText={(text) => props.setFieldValue('confirmPassword', text)}
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
    </FlexedKeyboardAvoidingView>
  );

  render() {
    return (
      <Mutation
        mutation={CHANGE_PASSWORD}
        update={async (cache, { data: { token } }) => {
          await cache.writeQuery({
            query: gql`
              query authToken {
                authToken @client
              }
            `,
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
