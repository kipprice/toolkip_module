# Toolkip.ts
Typescript library for a variety of things, including a UI library, some out of the box components, and helper functions. Spans the gamut of things that I've run into needing in front end applications.

## Running from source
This is set up with [Lerna]() and [yarn](). To get up and running locally, run the following:
1. `yarn` to install the dependencies
1. `yarn bootstrap` to set up all of the local dependencies
1. `yarn compile` to get the js versions of all of the ts files
1. TODO: sample application to pull in these changes

## Testing
Testing is set up at the root level, so just run `yarn test` to test all of the individual packages

## Publishing
Publishing is managed through lerna's publish functionality. Npm publishes need to be donw by Kip