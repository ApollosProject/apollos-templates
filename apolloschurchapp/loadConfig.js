import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import fragmentTypes from './src/client/fragmentTypes.json';

// Create a map all the interfaces each type implements.
// If UniversalContentItem implements Node, Card, and ContentNode,
// our typemap would be { UniversalContentItem: ['Node', 'Card', 'ContentNode'] }
//
// Used with Apollo Client cache resolver as well as internal Apollos UI functions
const TYPEMAP = {};
fragmentTypes.__schema.types.forEach((supertype) => {
  if (supertype.possibleTypes) {
    TYPEMAP[supertype.name] = [
      ...supertype.possibleTypes.map((subtype) => subtype.name),
    ];
  }
});

ApollosConfig.loadJs({ FRAGMENTS, TYPEMAP });
