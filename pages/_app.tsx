import {
  Admin,
  Resource,
  ListGuesser,
  DataProvider,
  EditGuesser,
} from "react-admin";

import pgDataProvider from "ra-postgraphile";

import "../styles/globals.css";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

function App() {
  const [dataProvider, setDataProvider] = useState<DataProvider>();

  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    (async () => {
      const dataProvider = await pgDataProvider(apolloClient);
      setDataProvider(() => dataProvider);
    })();
  }, []);

  if (!dataProvider) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ClerkProvider>
        <SignedIn>
          <AdminWithClerk dataProvider={dataProvider} />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn afterSignInUrl="/" />
        </SignedOut>
      </ClerkProvider>
    </ApolloProvider>
  );
}

const AdminWithClerk = (props: any) => {
  const user = useUser();
  const { signOut } = useClerk();
  const authProvider = {
    // unused, currently
    checkError: async () => {},
    checkAuth: async () => {},
    login: async () => {},
    logout: async () => signOut(),
    getIdentity: async () => {
      return Promise.resolve({
        id: user.id,
        fullName: user.fullName ?? undefined,
        avatar: user.profileImageUrl,
      });
    },
    getPermissions: async () => "admin",
    // ...
  };
  return (
    <Admin dataProvider={props.dataProvider} authProvider={authProvider}>
      <Resource name="people" list={ListGuesser} edit={EditGuesser} />
      <Resource name="campaigns" list={ListGuesser} />
      <Resource name="lineItems" list={ListGuesser} />
      <Resource name="zebras" list={ListGuesser} />
    </Admin>
  );
};
export default App;
