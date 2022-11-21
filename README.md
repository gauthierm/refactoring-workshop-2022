# Getting Started

Clone this repo to your local machine:

```sh
git clone git@github.com:gauthierm/refactoring-workshop-2022.git
cd refactoring-workshop-2022
```

Install project dependencies:

```
n engine
yarn install
```

Start the server:

```
yarn start
```

Visit the workshop page:

http://localhost:5000/

# The App

The app is an Express server that does a couple of things:

1. Simulate the GitHub REST API for the Facebook React project. The API is simulated to allow development without hitting API limits.
2. Display some aggregated data based on the API. Data is displayed using server-side React.

The second item (displaying data from the API) is where we will focus in today's workshop.

# Workshop

This workshop is about refactoring. Included is a working application that does not follow best practices. We will rafactor it to make it faster, easier to read, more testable and more resiliant.

### 1. Split file into smaller individual component functions

- getNextPage
- getContributors
- getMembers

### 2. Clean up `getNextPage()` using a functional approach

- write test cases in `getNextPage.test.ts`
- use map + filter
- remove let declaration

### 3. clean up pagination, using a generic approach

- make a `getData(url: string): Promise<any[]>` function
- use array spread operators instead of concat
- use the new generic pagination routine in getContributors and getMembers

### 4. make `getContributors()` and `getMembers()` use new function

Our contributor and member functions are split into two parts, one to load the data and one to build the return value

- update function to receive the list of members
- now we can write a test for it

### 5. use functional approach for `getContributors()` and `getMembers()`

- we are conditionally including values in our result, this can be replaced with a filter function
- we are returning a new array with modified values. This can be replaced with a map function
- we are aggregating data. This can be replaced with a reduce.
- write a bot filtering function and a test
- write a contributor transform function and a test
- write member transform function and a test
- write an aggregation function and test
- update functions to use the new filter, map, and reduce functions

### 6. Split `getContributors()` into two functions.

The `getContributors()` function is doing aggregating data and building a new array. Splitting it into two single-purpose functions will make the code cleaner and easier to understand and test.

- split into two functions `getContributors(data: any[])` and `getTotalContributions(contributors: any[])`
- update existing tests to split out aggregation tests.

### 7. Use TypeScript generics with `getData()`

The `getData()` function returns an array of `any` type. We can take advantage of TypeScript generics and have it return a known type that we specify.

- update the signature to be `getData<T>(): Promise<T[]>`
- make `Contributor` and `Member` interfaces for our data
- cast the `json()` calls in `getData()` to the type `T`
- when calling `getData()`, pass in the generic type like `getData<Contributor>(...)`

### 8. Add run-time data validation

If GitHub changes their response format, we'll have unexpected unhandled errors.

- use Zod to make run-time validated interfaces
- update getData `getData<T extends z.ZodTypeAny>(schema: T): Promise<Array<z.infer<T>>>`
- use `schema.parse()` to validate data rows in `getData()`
- use `z.infer` to redefine our existing interfaces for `Contributor` and `Member`
