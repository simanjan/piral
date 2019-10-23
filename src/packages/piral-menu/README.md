[![Piral Logo](https://github.com/smapiot/piral/raw/master/docs/assets/logo.png)](https://piral.io)

# [Piral Menu](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/piral-menu.svg?style=flat)](https://www.npmjs.com/package/piral-menu) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://jestjs.io) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

This is an extension library that only has a peer dependency to `piral-core`. What `piral-menu` brings to the table is a set of API extensions that can be used with `piral` or `piral-core` to bring a simplified menu integration from your pilets to your Piral instance.

## Documentation

For details on the provided API check out the [documentation at the Piral website](https://docs.piral.io) or [on GitHub](https://github.com/smapiot/piral/tree/master/docs).

## Setup and Bootstrapping

The provided library only brings API extensions for pilets to a Piral instance.

For the setup of the library itself you'll need to import `createMenuApi` from the `piral-menu` package.

```tsx
import { createMenuApi } from 'piral-menu';
```

The integration looks like:

```tsx
const instance = createInstance({
  // important part
  extendApi: [createMenuApi()],
  // ...
});
```

Via the options the `defaultSettings` and the global / initially available menu `items` can be defined.

For example:

```tsx
const instance = createInstance({
  // important part
  extendApi: [createMenuApi({
    defaultSettings: {
      type: 'admin',
    },
    items: [
      {
        component: HomeMenuItem,
      },
    ],
  })],
  // ...
});
```

## License

Piral is released using the MIT license. For more information see the [license file](./LICENSE).