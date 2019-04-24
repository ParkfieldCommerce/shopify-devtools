# Shopify DevTool [work in progress]
Developed by **[Parkfield Commerce](https://www.parkfieldcommerce.com/)** to make our Shopify development easier.

## Overview

This readme assumes you build in Shopify's [Theme Kit](https://shopify.github.io/themekit/) for front-end web development and have [Gulp](http://gulpjs.com/) installed.

This is using [Gulp](http://gulpjs.com/) to run `theme watch` and compile SCSS and ES6 JavaScript all from your `/shopify-devtool` directory.

#### Features
* Any SCSS you write will be compressed and autoprefixed!
* You can write ES6 JavaScript that goes through [Babel](https://babeljs.io/) and compresses!
* `theme watch` and `theme download` will run from this folder!
* Vendor folder for CSS and JS!

#### Installation
* Clone this repo in your theme root
* `cd shopify-devtool`
* `npm install`
* `npm run watch` will trigger `theme watch`
* `npm run update` will trigger `theme download`

This Gulpfile will look at the theme root and execute `theme watch`

Any changes that you make in the `[THEME_ROOT]/shopify-devtools/sass/` will create a `dev-custom.scss.liquid` file inside `[THEME_ROOT]/assets/` that will be autoprefixed and compressed.

Any changes made in `[THEME_ROOT]/shopify-devtools/js/` will create a `dev-custom.js` inside `[THEME_ROOT]/assets/`. You may write in ES6 javascript as this Gulpfile uses [Babel](https://babeljs.io/)

Be sure to include these files in your `theme.liquid` file. Or just copy and paste this below:
```html
{{ 'vendors.css' | asset_url | stylesheet_tag }}
{{ 'vendors.js' | asset_url | script_tag }}
{{ 'dev-custom.css' | asset_url | stylesheet_tag }}
{{ 'dev-custom.min.js' | asset_url | script_tag }}
```

We will be updating this toolkit constantly based on the resources we commonly use with our clients. Please note that this is by no means completely finished and you may encounter some bugs.

Contributions are welcome!

### To-Do

* Fill out some of the empty SCSS files
* Allow svgs to be placed in a sprite sheet
* Allow liquid syntax in JS files for specific JS loading
