# Front Export Application
This repository is based on the Front's Sample Application's Core API Export. Find the original repo configuration [here](https://github.com/frontapp/coreapi-export-template).

The main purpose of this repo is to extract Conversations from Front with the desired information and format for Sock Club.

To extract Conversations the easiest way, use the *collectConversation* method and set the parameter *outputOneFile = True*. This will then export all Conversations based on the filter settings configured in index.ts into one csv file in the specified directory.

The original method and application still exists, so users can choose to extract other objects such as messages, comments, etc. but for some items it will be much easier to manually extract a csv download from the Analytics view [here](https://app.frontapp.com/analytics/team/tim:6630348/conversations?from=1672552800000&to=1729918799999&selectedViewId=4125074).


To find more details on the API, refer to the Front API documentation [here](https://dev.frontapp.com/reference/introduction).

## Application Structure

### `connector.ts`
`FrontConnector` provides a method to make generic paginated requests for API resources and handles rate-limiting.

### `export.ts`
`FrontExport` provides methods to list and export Front resources.

### `helpers.ts`
Customers are expected to manage any transforms and loading through the methods here.

### `index.ts`
Where customers can specify what they want exported through usage of `FrontExport` methods. 

### `types.ts`
Non-exhaustive typing for responses from Front's API.  Allows for easy casting in paginated responses.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the export.

## Configuration

### `.env`

Put your `API_KEY` here.

### `helpers.ts`

Define your *transform* and *load* logic here.

### `index.ts`

Logic for what will be exported.
Set your extraction settings here.