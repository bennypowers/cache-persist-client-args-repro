/**********
 * ROUTER *
 **********/

// Set up simple SPA routing which exposes /:page as `pageVar` reactive variable

import { makeVar } from '@apollo/client/core';
import { installRouter } from 'pwa-helpers/router';

export function getPathname(location: Location): string {
  return location.pathname.split('/').filter(Boolean)[0] ?? '';
}

export const pageVar =
  makeVar<string>(getPathname(window.location));

installRouter(location => {
  const page = getPathname(location);
  pageVar(page);
  document.querySelector('toggle-arg').page = page;
});
