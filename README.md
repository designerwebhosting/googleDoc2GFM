# googleDoc2GFM

This is a new project.

## Aims

The aim of this project is to have an app which can convert a Google documents into Github Flavoured Markdown. At the start it will be written to run on Google Appscript, but structured for easy transfer to other *Script platforms,

## Features

- Run engine
  1. easy to adapt for other frameworks.
- Convert library
  1. makes updating easier.
  2. include GFM markup.

## License

This project is published under the GNU General Public License v3.0

## Structure

1. All functions will have a defined spectification for both input and output.
   - Makes it easy to udate or change.
   
2. The core will be in vanilla script with external libraries in wrappers.
   - Allows for external libraries to be updated orchanged without the need to rewrite the main code.
   - Allows for easy adoption of new platforms using different liraries.
   
3. Simple function structure. input varibles -> work on varibles -> output varibles.
   - Simple structures are easiler to debug and update. 
   - Bugs will be easier to identify and correct.
   
4. Functions do one thing.
   - Bugs will be easier to identify and correct.

## Instructions of use

updated: 2018-11-13

Copyright (c) 2018 Peter Noble
