/****************
 * UI COMPONENT *
 ****************/

import { ApolloQuery, css, customElement, html } from '@apollo-elements/lit-apollo';
import { gql } from '@apollo/client/core';

import LaunchesQuery from './Launches.query.graphql';

import { pageVar } from './router';

interface Launch {
  id: string;
  mission_name: string;
  selected: boolean;
}

@customElement('query-element')
class QueryElement extends ApolloQuery<{ launches: Launch[] }, null> {
  query = LaunchesQuery;

  static styles = css`:host {display: grid;}`;

  render() {
    return html`
      ${this.loading ? '...loading' : ''}
      ${(this.data?.launches ?? [])?.map(x => html`
      <label>
        <input type="checkbox"
            .checked="${x.selected}"
            data-id="${x.id}"
            @input="${this.onInput}"/>
        ${x.mission_name}
      </label>
    `)}
    `;
  }

  /**
   * When user clicks the checkbox, update the stored state
   */
  onInput(event: Event & { target: HTMLInputElement }) {
    const fragment = gql`
      fragment selected on Launch {
        selected(page: $page) @client
      }
    `;

    const variables = {
      page: pageVar() ?? null
    };

    const id =
      `Launch:${event.target.dataset.id}`;

    const selected =
      event.target.checked;

    this.client.cache.writeFragment({ id, fragment, variables, data: { selected } })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'query-element': QueryElement
  }
}