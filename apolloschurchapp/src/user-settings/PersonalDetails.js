import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Query, Mutation } from '@apollo/client/react/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { TextInput, PaddedView, Button, styled } from '@apollosproject/ui-kit';

import { GET_USER_PROFILE } from '@apollosproject/ui-connected';
import UPDATE_CURRENT_USER from './updateCurrentUser';

const FlexedKeyboardAvoidingView = styled({
  flex: 1,
})(KeyboardAvoidingView);

const Footer = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: theme.sizing.baseUnit * 5,
}))(SafeAreaView);

class PersonalDetails extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
  };

  renderForm = (props) => (
    // have to add the offset to account for @react-navigation/native header
    <FlexedKeyboardAvoidingView behavior="padding">
      <PaddedView>
        <TextInput
          label="First Name"
          type="text"
          value={props.values.firstName}
          error={props.touched.firstName && props.errors.firstName}
          onChangeText={(text) => props.setFieldValue('firstName', text)}
        />
        <TextInput
          label="Last Name"
          type="text"
          value={props.values.lastName}
          error={props.touched.lastName && props.errors.lastName}
          onChangeText={(text) => props.setFieldValue('lastName', text)}
        />
        <TextInput
          label="Email"
          type="email"
          value={props.values.email}
          error={props.touched.email && props.errors.email}
          onChangeText={(text) => props.setFieldValue('email', text)}
        />
      </PaddedView>
      <Footer>
        <PaddedView>
          <Button
            disabled={!props.isValid || props.isSubmitting}
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
      <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
        {({ data: { currentUser = { profile: {} } } = {} }) => {
          const { firstName, lastName, email } = currentUser.profile;

          return (
            <Mutation
              mutation={UPDATE_CURRENT_USER}
              update={async (cache, { data: { updateProfileFields } }) => {
                await cache.writeQuery({
                  query: GET_USER_PROFILE,
                  data: {
                    currentUser: {
                      ...currentUser,
                      profile: {
                        ...currentUser.profile,
                        firstName: updateProfileFields.firstName,
                        lastName: updateProfileFields.lastName,
                        email: updateProfileFields.email,
                      },
                    },
                  },
                });
              }}
            >
              {(updateDetails) => (
                <Formik
                  initialValues={{ firstName, lastName, email }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('First Name is required!'),
                    lastName: Yup.string().required('Last Name is required!'),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Email is required!'),
                  })}
                  onSubmit={async (
                    variables,
                    { setSubmitting, setFieldError }
                  ) => {
                    try {
                      await updateDetails({ variables });
                      await this.props.navigation.goBack();
                    } catch (e) {
                      const { graphQLErrors } = e;
                      if (
                        graphQLErrors.length &&
                        graphQLErrors.find(({ message }) =>
                          message.includes('User already exists')
                        )
                      ) {
                        setFieldError(
                          'email',
                          'There is already a user with this email'
                        );
                      } else {
                        setFieldError(
                          'email',
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
        }}
      </Query>
    );
  }
}

export default PersonalDetails;
