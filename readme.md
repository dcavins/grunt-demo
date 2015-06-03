# Grunt for front-end dev

This repo's goal is to create a simple sample grunt setup for front-end development work that compiles LESS into CSS, auto-prefixes that CSS, concatenates and minifies JavaScript and runs LiveReload.

##### Grunt relies on node and node package manager to work.
Don’t use Homebrew to install node on OSX; that configuration causes me weird permissions errors. Instead use the official package, which will install node and node package manager (npm): <http://nodejs.org/>

Follow this guide to get started: <http://gruntjs.com/getting-started>
Basically, install the grunt command line interface and, once you’ve CD’d to the project’s folder, install the necessary packages for your project. Make sure that wherever node and npm are installed is in your `$PATH`.
Also note that you may need a sudo when running `npm install`.

Finally, open a terminal in the location of the project and run `grunt` locally. `grunt -v` runs in verbose mode, which is helpful to understand what is happening and in what order, too.