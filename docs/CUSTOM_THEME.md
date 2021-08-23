# Custom Themes

This doc will describe how you can set up a custom theme.

## Basic Theme

The simplest way to customize an Apollos app is through the `Themer` component. You will build an object in the shape of the `theme` object from `ui-kit` ([file for reference](https://github.com/ApollosProject/apollos-apps/blob/master/packages/apollos-ui-kit/src/theme/defaultTheme.js)).

For example, if you'd like to change your primary color to red, you can supply the following object as a prop.

```jsx
<Themer theme={{colors: {primary: "red"}}} >
  {children}
</Themer>
```

## Fonts

Installing custom fonts are simple. Place the `.ttf` or `.otf` files in your source directory and then add the following lines to a react-native-config.js file letting the bundler know where to find them:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

Then link the files to native iOS and Android code:

`yarn react-native link`.

You can now add the fonts to your custom theme object under the typography key and include that in the `theme` prop above.

```js
const typography = {
  sans: {
    regular: {
      default: 'HelveticaRegular',
      italic: 'HelveticaRegularItalic',
    }
  }
};
```

## Overrides

One of the most powerful ways you can customize an Apollos app is through the overrides system. You'll see in source code of Apollos components, some will be wrapped in a `named` HOC. That registers the component with our override system so you can edit the props being passed in. Let's say there's a component in the `ui-kit` being exported like this:

```jsx
const NamedImage = named("NamedImage")(() => <Image size="s" />)
```

Maybe you want to change the default size of all `<NamedImage />` components inside the Apollos component tree. You would simply add an `overrides` key to your `theme` prop above like this:

```jsx
<Themer theme={{overrides: {NamedImage: {size: "m"}}}} >
  {children}
</Themer>
```

## Icons

Custom icons are easy to create as well. We use the `Svg` component from `react-native-svg` but techincally it can be any component. The only thing you _have_ to do is wrap it in our `makeIcon` HOC so the naming and style system works. So say you want to make a custom box shaped icon. You would pass it into the `Themer` component through the `icons` prop like this:

```jsx
<Themer icons={{Box: makeIcon(({size, fill}) => <Svg {...all the Svg stuff}/>)}>
  {children}
</Themer>
```
