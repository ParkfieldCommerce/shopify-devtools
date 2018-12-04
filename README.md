# Shopify DevTool [work in progress]
Developed by **[Parkfield Commerce](https://www.parkfieldcommerce.com/)** to make our Shopify development easier.

## Overview

This readme assumes you build in Shopify's [Theme Kit](https://shopify.github.io/themekit/) for front-end web development and have [Gulp](http://gulpjs.com/) installed.

This is using [Gulp](http://gulpjs.com/) to run `theme watch` and compile SCSS and ES6 JavaScript all from your `/shopify-devtool` directory.

#### Installation
* Clone this repo in your theme root
* `cd shopify-devtool`
* `npm install`
* `npm run watch`

Any changes that you make in the `[THEME_ROOT]/shopify-devtool/sass/` folder will create a `custom.scss.liquid` file inside `[THEME_ROOT]/assets/` that will be autoprefixed and compressed.



We will be updating this toolkit constantly based on the resources we mostly use with our clients. Please note that this is by no means completely finished and you may encounter some bugs.

Contributions are welcome!

### To-Do

* Make sure that Gulp is watching and compiling JS files correctly. 
* Finish this README