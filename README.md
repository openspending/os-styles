# OS Styles

SCSS for the OpenSpending websites/web apps (WIP).

 - Built on Bootstrap, adapted from [previous](https://github.com/openspending/os-style-guide) [Bourbon](http://bourbon.io/) version.
 - Generates four stylesheets, each using a different accent colour, acording to the sub-brand.
 
Example usage: https://github.com/smth/os-mockups
 
## Usage

Install this package using `npm` (you can install the GitHub repository
directly), and then you can `@import` the stylesheets you need. The caveat is
that many stylesheets use external asset files (e.g. fonts or images), which
need to be made available by your webserver.

To do so, you need to copy the contents of the `src/assets` folder somewhere
your webserver can serve them, and change the `$assets-path` variable to where
this folder is available relative to your stylesheets.
