/* eslint-disable import/prefer-default-export */

export const resolver = {
  Mutation: {
    updateUserPushSettings: async (root, { input }, { dataSources }) => {
      // register the changes w/ one signal
      const returnValue = await dataSources.OneSignal.updatePushSettings(input);

      // if the pushProviderUserId is changing, we need ot register the device with rock.
      if (input.pushProviderUserId != null) {
        await dataSources.PersonalDevice.addPersonalDevice({
          pushId: input.pushProviderUserId,
        });
      }

      // return the original return value (which is currentPerson)
      return returnValue;
    },
  },
};
