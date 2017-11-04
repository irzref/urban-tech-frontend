# leaflet-webpack
This repository contains code illustrating how to use [Leaflet](http://leafletjs.com/) with [webpack](https://webpack.js.org/).

## Instructions
To see the code in action, clone or download the repository. Navigate to the directory in your terminal of choice and run `npm install`.

After npm installs all of the dependencies, type `npm run build` to bundle all of the assets with webpack.

You can then open `dist/index.html` in your browser. This should show a basic Leaflet map with a point on the Lincoln Memorial in Washington, D.C. Viewing the page source confirms that all assets are coming from one `bundle.js` file.
