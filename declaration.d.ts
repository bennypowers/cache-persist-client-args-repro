declare module '*.graphql' {
  import { DocumentNode } from '@apollo/client/core';
  const documentNode: DocumentNode;
  export default documentNode;
}
