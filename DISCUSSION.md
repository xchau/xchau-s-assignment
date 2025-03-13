## Change notes

1. In anticipation of tens of thousands of rows of data, I implemented basic pagination.
2. I fixed a few antipatterns, such as filtering advocates on change
3. I removed the need for a separate filteredAdvocates array in state, and derive it per render (still performant due to page size constraints)
4. Integrated local postgres DB
5. Used mantine since it had some OOTB components that were pre-styled (eg: pagination)
6. Abstracted some things out for composability
7. Adding some linting/formatting since unformatted code drives me up to wall!

## Loose thoughts

1. Probably could use combination of virtualization if page sizes needed to be > 1000 (eg: infinite scrolling)
2. Can probably integrate the search mechanism directly to API/DB, such that the results aren't limited to what is on the current page
3. UI is pretty bare but I think gets the job done; table needs responsiveness for smaller screen sizes
4. Unit/integration testing suite (react testing lib / etc) would be added with more time and requisite for prod
5. Input validation is required with more time
6. Some sort of fuzzy search (eg: Fuse.js) would be nice instead of string matching w/ `.includes`
7. I thought about implementing Tanstack Query for caching, but was limited by time. For a project this small it is also unnecessary, especially with pagination
