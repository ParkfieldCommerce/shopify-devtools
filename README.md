# Shopify DevTool [work in progress]
Developed by **[Parkfield Commerce](https://www.parkfieldcommerce.com/)** to make our Shopify development easier.

## Overview

This readme assumes you build in Shopify's [Theme Kit](https://shopify.github.io/themekit/) for front-end web development and have [Gulp](http://gulpjs.com/) installed.

This is using [Gulp](http://gulpjs.com/) to run `theme watch` and compile SCSS and ES6 JavaScript all from your `/shopify-devtool` directory.

#### Features
* Any SCSS you write will be compressed and autoprefixed!
* You can write ES6 JavaScript that will be passed through [Babel](https://babeljs.io/) and be minified!
* `theme watch` will run from this folder!
* Vendor folder for css and js!

#### Installation
* Clone this repo in your theme root
* `cd shopify-devtool`
* `npm install`
* `npm run watch`

This Gulpfile will look at the theme root and execute `theme watch`

Any changes that you make in the `[THEME_ROOT]/shopify-devtool/sass/` will create a `dev-custom.scss.liquid` file inside `[THEME_ROOT]/assets/` that will be autoprefixed and compressed.

Any changes made in `[THEME_ROOT]/shopify-devtool/js/` will create a `dev-custom.js` inside `[THEME_ROOT]/assets/`. You may write in ES6 javascript as this Gulpfile uses [Babel](https://babeljs.io/)

We will be updating this toolkit constantly based on the resources we commonly use with our clients. Please note that this is by no means completely finished and you may encounter some bugs.

Contributions are welcome!

### To-Do

* Fill out some of the empty SCSS files
* Allow `theme download`
