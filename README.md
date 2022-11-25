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

### 1. Split file `getPageContent.tsx` into smaller individual component functions

- getNextPage
- getContributors
- getMembers
- getGroupedMemberData

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
- use array concat operator instead of push in a loop
- use the new generic pagination routine in getContributors and getMembers

### 4. Inject dependencies for `getContributors()` and `getMembers()` functions

Right now the contributor and member functions do both loading the data and
manipulating the data to build a result.

- update functions to receive the data as a parameter
- now we can easily write a tests for them

### 5. use functional approach for `getContributors()` and `getMembers()`

- we are conditionally including values in our result, this can be replaced with a filter function
- we are returning a new array with modified values. This can be replaced with a map function

### 6. Write an `isUser()` function

We use the same logic to check for bots in both places. We can extract this to
a reusable function with its own tests.

- write isUser()
- write tests
- update getContributors and getMembers to use new function

### 7. inject dependencies for `getGroupedMemberData()` data

This function uses the contributor list and member list to get the data for the
page. Right now, the other functions are called in the implementation of this
function. This makes it more difficult to test or refactor.

Instead, we can pass the required data to the function as parameters. This will
allow us to easily pass in mock data in tests. It is a better design that
reduces the dependencies between functions.

- update `getGroupedMemberData()` to `getGroupedMemberData(contributors: any[], members: any[])`
- it no longer needs to be async and can be a pure function
- write a test cast for the new function

### 8. Use a more functional approach for `getGroupedMemberData()`

The function is still using array push running totals and are using a
conditional to filter data inside a forEach.

If there were more than two groups, the approach might be different.

- use a reducer function to partition the array in facebook vs non-facebook data
- use an object map and a reducer to get grouped totals

### 9. Split `getGroupedMemberData()` into discrete functions.

The `getGroupedMembers()` function is doing data aggregation, data partitioning
sorting, etc. Splitting it into single-purpose functions will make the code
cleaner and easier to understand and test.

- split by steps: grouping data, totalling data, cleanup for display
- create `getContributorsByOrganization(contributors: any[], members: any[])` to partition data
- create `getTotalContribututionsByOrganization(groupedContributors: { [key: string]: any[] })` to get totals
- create `getContributorsToDisplay(groupedContributors: { [key: string]: any[] })` to sort and truncate data
- use the new functions in `getPageContent()`
- update tests

### 10. Update `getContributorsToDisplay()` to not mutate input

Sorting and splicing in JavaScript are in-place functions and will modify the
input value. This side-effect could unintentionall impact the code in the
calling context.

- use slice instead of splice to create a copy of the array
- clean up repeated code while we're at it usign an object-map

### 11. Use TypeScript generics with `getData()`

The `getData()` function returns an array of `any` type. We can take advantage of TypeScript generics and have it return a known type that we specify.

- update the signature to be `getData<T>(): Promise<T[]>`
- make `Contributor` and `Member` interfaces for our data
- cast the `json()` calls in `getData()` to the type `T`
- when calling `getData()`, pass in the generic type like `getData<Contributor>(...)`
- update other functions that use the data to use the interfaces

### 12. Add run-time data validation

If GitHub changes their response format, we'll have unexpected unhandled errors.

- use Zod to make run-time validated interfaces
- update getData `getData<T extends z.ZodTypeAny>(schema: T): Promise<Array<z.infer<T>>>`
- use `schema.parse()` to validate data rows in `getData()`
- use `z.infer` to redefine our existing interfaces for `Contributor` and `Member`

### 13. Parallelize promise calls.

The `getContributors()` and `getMember()` function do not depend on each other so we can call them in parallel.

- Use Promise.all and array destructuring to call both APIs at the same time.

### 14. Next steps

The React code in `components` has similar issues. Can it be cleaned up in the same way? Remember that files with JSX need the extension `.tsx`.

- Should there be more components created?
- Better TypeScript interfaces?
- Functional approach?
- Tests?

## Takeaways

**Reduce scope of individual files.** We've decomposed the original file into several smaller files that are easier to understand.

**Add tests** to catch bugs and enable refactoring. We've added a whole bunch of great tests as we split up and improved our code.

**Make functions do one thing.** Several functions were doing multiple things. If we can make them do one thing, it makes testing easier and makes implementations simpler.

**Lift dependencies higher** in your code and pass them in as function arguments. This helps you write code that is more functional and easily tested.

**When you see state mutation, be wary.** Look out for let, push, forEach, sort, slice, += and other mutation operators in JavaScript. When values are mutated, there is more opportunity for untentional side-effects.

**TypeScript is great** and we can use it to write code that is safe and flexible.

**Think about how your code will be tested**. If you can test it easily, it's probably well designed.
