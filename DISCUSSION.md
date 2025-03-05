# Change notes

1. In anticipation of tens of thousands of rows of data, I implemented basic pagination.
2. I fixed a few antipatterns, such as filtering advocates on change
3. I removed need for separate filteredAdvocates array
4. Integrated postgres
5. Used mantine since it had some OOTB components that were nicely styled (eg: pagination)
6. Abstracted some things out for compability
7. Adding some linting/formatting since it's a pet peeve of mine to have messy code

# Loose thoughts

1. Probably could use combination of virtualization if page sizes need to be higher
2. Can probably implement some sort of search wired directly to API/DB, so users aren't limiting to filtering on limited data set
3. UI is pretty basic but gets the job done; table needs some responsive design for smaller screen sizes
4. Unit/integration testing suite (react testing lib / etc) would be nice
5. More input validation is required
6. Some sort of fuzzy search would be nice instead of string matching w/ `.includes`
