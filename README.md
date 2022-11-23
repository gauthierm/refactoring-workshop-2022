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
- getGroupedMembers

### 2. Clean up `getNextPage()` using a functional approach

- write test cases in `getNextPage.test.ts`
- use map + filter
- remove let declaration

### 3. clean up pagination, using a generic approach

The `getMembers()` and `getContributors()` functions have an almost identical
program flow. Let’s collect that flow into a new function called `getData()`
so we are not repeating ourselves twice. This way we can write tests for the
implementation once.

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

### 6. inject dependencies for `getGroupedMemberData()` data

This function uses the contributor list and member list to get the data for the
page. Right now, the other functions are called in the implementation of this
function. This makes it more difficult to test or refactor.

Instead, we can pass the required data to the function as parameters. This will
allow us to easily pass in mock data in tests. It is a better design that
reduces the dependencies between functions.

- update `getGroupedMemberData()` to `getGroupedMemberData(contributors: any[], members: any[])`
- it no longer needs to be async and can be a pure function
- write a test cast for the new function

### 7. Use a more functional approach for `getGroupedMemberData()`

The function is still using array push running totals and are using a
conditional to filter data inside a forEach.

If there were more than two groups, the approach might be different.

- use a reducer function to partition the array in facebook vs non-facebook data
- use an object map and a reducer to get grouped totals

### 8. Split `getGroupedMemberData()` into discrete functions.

The `getGroupedMembers()` function is doing data aggregation, data partitioning
sorting, etc. Splitting it into single-purpose functions will make the code
cleaner and easier to understand and test.

- split by steps: grouping data, totalling data, cleanup for display
- create `getContributorsByOrganization(data: any[])` to partition data
- create `getTotalContribututionsByOrganization(groupedContributors: { [key: string]: any[] })` to get totals
- create `getDisplayData(groupedContributors: { [key: string]: any[] })` to sort and truncate data
- use the new functions in `getPageContent()`
- update tests

### 9. Use TypeScript generics with `getData()`

The `getData()` function returns an array of `any` type. We can take advantage of TypeScript generics and have it return a known type that we specify.

- update the signature to be `getData<T>(): Promise<T[]>`
- make `Contributor` and `Member` interfaces for our data
- cast the `json()` calls in `getData()` to the type `T`
- when calling `getData()`, pass in the generic type like `getData<Contributor>(...)`
- update other functions that use the data to use the interfaces

### 10. Add run-time data validation

If GitHub changes their response format, we'll have unexpected unhandled errors.

- use Zod to make run-time validated interfaces
- update getData `getData<T extends z.ZodTypeAny>(schema: T): Promise<Array<z.infer<T>>>`
- use `schema.parse()` to validate data rows in `getData()`
- use `z.infer` to redefine our existing interfaces for `Contributor` and `Member`

### 11. Next steps

The React code in `components` has similar issues. Can it be cleaned up in the same way? Remember that files with JSX need the extension `.tsx`.

- Should there be more components created?
- Better TypeScript interfaces?
- Functional approach?
- Tests?

## Takeaways

1. make functions do one thing
2. consider inputs and outputs and consider using function parameters for inputs
3. consider a functional approach instead of an imperative approach. When you see state mutation operations like let , push , += , = (without const) be wary.
4. use TypeScript types with generics to write safe, flexible code
5. think about how code will be tested. If you can test it easily, it's probably well designed.
