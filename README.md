## ES6-jQuery Webpack Boilerplate

My personal ES6-jQuery boilerplate built with Babel 6 & Webpack 4.

# Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)

# Folder structure

Below is the folder structure.

```
src
└── css
│    │
│    └── all.css
└── index.js
public
├── assets
└── index.html
```

Add styles to the `css` folder or for mutiple css files use `@import` to the `styles.css` to add those files.

Add images to the `assets` folder.

The main JS file can be found in the `src/index.js`, libraries are also imported there.

Update the `index.html` in the public directory to suite your needs.

Change the `favicon.ico` with any icon.


## Getting Started

install dependencies

```
npm install
```

Run app in development mode.

Open http://127.0.0.1:3001 to view it in the browser.

``` 
npm run dev (Run Dev Environment)
```

## Features 

- [Webpack](https://webpack.js.org/)
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)
- [Babel](https://babeljs.io/)
- [jQuery](https://jquery.com/)

## Dependencies

### Webpack

- [`webpack`](https://github.com/webpack/webpack) - Module and asset bundler.
- [`webpack-cli`](https://github.com/webpack/webpack-cli) - Command line interface for Webpack.
- [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) - Development server for Webpack.

### Babel

- [`babel-core`](https://babeljs.io/docs/en/babel-core) - Transpile ES6+ to backwards compatible JavaScript.
- [`babel-loader`](https://github.com/babel/babel-loader) - Babel loader for webpack
- [`@babel/preset-env`]() - is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms.
- [`babel-loader`](https://github.com/babel/babel-loader) - Babel loader for webpack

### Loaders

- [`babel-loader`](https://webpack.js.org/loaders/babel-loader/) - Transpile files with Babel and Webpack.
- [`css-loader`](https://webpack.js.org/loaders/css-loader/) - Resolves CSS imports into JS.
- [`style-loader`](https://webpack.js.org/loaders/style-loader/) - Inject CSS into the DOM.
- [`file-loader`](https://webpack.js.org/loaders/file-loader/) - Copy files to build folder.
- [`url-loader`](https://webpack.js.org/loaders/url-loader/) - Encode and inline files. Falls back to file-loader.

### Plugins

- [`html-webpack-plugin`](https://webpack.js.org/plugins/html-webpack-plugin/) - simplifies creation of HTML files to serve your webpack bundles.
- [`mini-css-extract-plugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/) - extracts CSS into separate files.
- https://webpack.js.org/plugins/provide-plugin/ - Automatically load modules instead of having to import or require them everywhere.

## Author

* **Jesse Jay** - *Initial work* - [jessejayjustin](https://github.com/jessejayjustin)
