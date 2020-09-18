# Reproduction of `apollo-cache-persist` bug with parameterized local fields

This reproduction is a small SPA that displays a list of GraphQL `Launch` objects from the spacex.land API.

The app includes a simple client side router that exposes a single route param: `/:page` to apollo client's local state cache. e.g. for url `/`, the `page` param is null, for url `/page-1`, the `page` param is `'page-1'`.

Field policies are defined for two local state fields:

- `page` on `Query`, representing the top level pathname of the current URL
- `selected(page: Boolean)` on `Launch`, representing whether a launch is selected for a given page

The goal of this reproduction is to have more-than-one separate `selected` states for each `Launch`. The basic `selected` state accounts for the `Launch` as viewed on the root page - without any `/:page` parameter from the client side router.

## Steps to Reproduce
1. clone this repo
1. ```npm ci```
1. ```npm start```

You'll see two lists, one queried using a client with a persisted cache, and another queried using a client without a persisted cache.

The app is considered to work properly when these steps are completed:

1. load the app at `/` (e.g. via `npm start`)
1. deselect the first launch in each list
1. 👉 observe that all but the first list item are selected
1. click **"View the list with a `page` arg passed to `selected`"**
1. 👉 observe that no items are selected
1. select the first launch in each list
1. 👉 observe that only the first list item is selected
1. click **"View the list without a `page` arg passed to `selected`"**
1. 👉 observe that all but the first list item are selected
1. click **"View the list with a `page` arg passed to `selected`"**
1. 👉 observe that only the first list item is selected
1. reload the page
1. 👉 observe that only the first list item is selected
1. click **"View the list without a `page` arg passed to `selected`"**
1. 👉 observe that all but the first list item are selected

Currently, the state is not accurately preserved in the case of the persisted cache.