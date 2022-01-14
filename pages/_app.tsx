import { Admin, Resource, ListGuesser, UserIdentity } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useClerk,
  useUser,
} from "@clerk/nextjs";

function App({ pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <SignedIn>
        <AdminWithClerk {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn afterSignInUrl="/" />
      </SignedOut>
    </ClerkProvider>
  );
}

export type AuthProvider = {
  login: (params: any) => Promise<any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getPermissions: (params: any) => Promise<any>;
  getIdentity?: () => Promise<UserIdentity>;
  [key: string]: any;
};

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const AdminWithClerk = () => {
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
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" list={ListGuesser} />
      <Resource name="todos" list={ListGuesser} />
    </Admin>
  );
};
export default App;
