import createMock from '@apollosproject/apollo-server-env-mock';

const apolloServerEnv = require.requireActual('apollo-server-env');

module.exports = createMock(apolloServerEnv);
