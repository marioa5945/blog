# Mario A

This project include Component library and blog

- convention over configuration
- concise yet expressive

## Installation

```
$ yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

```
$ yarn start
```

Runs the app in the development mode.\
Input **-o** and press **ENTER** open [http://localhost:3000](http://localhost:3000) to view it in the browser, or manually open it.

Only press **ENTER** is update blog's data.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

```
$ yarn build
```

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn blog`

```
$ yarn blog
```

Update blog's data, create blog-json files of the `public/api/` folder from markdown files of the `data` folder.

### `yarn analysis`

```
$ yarn analysis
```

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): A plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.

## License

ISC
