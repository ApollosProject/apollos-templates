import { GraphQLScalarType } from 'graphql';
import color from 'color';

export default new GraphQLScalarType({
  name: 'Color',
  description: 'A rgb color string',
  serialize(value) {
    return color(value)
      .rgb()
      .string();
  },
  parseValue(value) {
    return color(value);
  },
  parseLiteral({ value }) {
    return color(value);
  },
});
