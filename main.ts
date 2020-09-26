import type { ApolloClientElement } from '@apollo-elements/components/apollo-client';

import '@apollo-elements/components/apollo-client';
import '@power-elements/json-viewer/json-viewer';

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { persistCacheSync } from "apollo3-cache-persist";
import { pageVar } from './router';

import './toggle-arg';
import './component';

/****************
 * LOCAL FIELDS *
 ****************/

/**
 * For Demo purposes, we'll share the same options between cache instances
 */
const cacheOptions = {
  typePolicies: {
    Query: {
      fields: {
        /**
         * Define `page @client` query field to fetch the current `/:page` from the router.
         */
        page() {
          return pageVar() ?? null;
        }
      },
    },
    Launch: {
      fields: {
        /**
         * Define `selected` on launch
         */
        selected: {
          keyArgs: ['page'],
          read(prev, { args, storage }) {
            /**
             * If there is no `page` arg, then the selected state should relate to the global list,
             * i.e, "is the launch selected on the root page"
             */
            if (!args?.page)
              return prev ?? true;
            /**
             * If there is a `page` arg, then the selected state should be scoped to that particular arg,
             * i.e. "is the launch selected on this specific page"
             */
            else {
              return storage[args.page] ?? false;
            }
          },
          /**
           * Store the selection state with regards to the current page
           */
          merge(_, next, { args, storage }) {
            storage[args.page ?? null] = next;
            return storage[args.page ?? null];
          },
        },
      },
    }
  }
}

/*****************
 * APOLLO CLIENT *
 *****************/

// <apollo-client> element scopes a client instance to it's subtree
// let's instantiate an apollo client on both cases, but only persist
// the cache on one of them

function setupClient(element: ApolloClientElement) {
  const cache = new InMemoryCache(cacheOptions);

  if (element.dataset.persistCache === 'persist')
    persistCacheSync({ cache, storage: localStorage } as any);

  element.client = new ApolloClient({
    cache,
    connectToDevTools: false,
    link: new HttpLink({
      uri: 'https://api.spacex.land/graphql'
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first' as const,
      },
      watchQuery: {
        returnPartialData: true,
      },
    }
  });
}

async function main() {
  document.getElementById('dependencies').textContent = `DEPENDENCIES`;
  document.querySelectorAll('apollo-client')
    .forEach(setupClient)
}

main();