Your Solution Documentation
===========================
### Backend

## Clean architecture 
I'm using a MVC design pattern for this simple application. 
    - Model layer consists of entities that represent tables in db Suburbs, Jobs, Category

    - View layer - consists of Data Transfer Objects (DTOs). We decouple our entities from actual representation of data:
        - This gives us control over what data we expose to the client 
        - Allows us combine complex data into a DTO in a single request (saving the client from doing multiple expensive calls)   

    - Controller contains our business logic.

## Database
- Using a connection pool
    - Creating a connection is expensive op i.e. opening a new network socket and establishing db connection with server, reusing existing connection for performance
        - By setting a max. size for connection pool we're avoid overloading server with too many connections leading to performance issues.
        - A pool is robust, it will handle db errors gracefully by retrying failed queries on new connections automatically.

## What I'd do to improve
    - Add TRY/CATCH at each layer of MVC to capture and handle exceptions e.g. higher level (controller response/request object) errors and lower level (data layer sql transactions errors)
    - Use interfaces: IRepository to define operations -->  We define three interfaces, IJobRepository, ICategoryRepository, and ISuburbRepository, to represent the operations we can perform on our three tables, jobs, categories, and suburbs. These interfaces will contain methods to retrieve, update, and delete records in each respective table
     -> Interface seggregation e.g. concrete classes should depend on abtractions instead of other concrete classes


### Front end

## Tabs - a compound component - taking advantage of reacts composition
## JobsCard - presentation component demo-ing container/presentation pattern
## AuthenticatedRoute - a simple component for checking if user has access to view page using composition 
## useMountCheck hook - its not very useful for this task but wanted to add a utility hook to demo how we can check if a component is still mounted before performing a certain operation.   The idea is to expose a ref that tells if component is still mounted, and it does this by making use of the dispose function of useEffect hook.
## Api.js represents our api client

## Things to improve
# The api could be improved. I'm using to endpoints for accept and decline jobs. Could just one for updating status
# I would not write slq queries directly or concat id passed from client directly into the query (sql injections!). I'd use an ORM for mapping database to backend.
# The goal was to create simple components where the api is kept simple and flexible e.g. Tabs.js, and then build more domain specific components on top of them. I'd probably work on The JobsCardTab.js perhaps.
# dependecies in the hooks could be updated (perhaps) (I usually have an eslint rule for auto updating the dep array)


## Thinking Process
I started with designing the app architecture (MVC), then wrote the endpoints using PostMan, then the front-end components, and finally styling, in this order. 
I was not able to make a pixel perfect UI due to limited time. 
Initially started with writing in typescript, but due to limited time moved to using plain javascript (hence only some components are in typescript)

