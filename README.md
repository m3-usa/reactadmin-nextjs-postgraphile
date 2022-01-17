# React Admin With Postgraphile and Clerk Authentication on Next.JS

This project demonstrates the use of [Clerk](https://clerk.dev/) as an Authentication Provider for [React Admin](https://marmelab.com/react-admin/) in front of [Postgraphile](https://www.graphile.org/postgraphile/) with [Next.JS](https://nextjs.org/).

## Setup

1. Create a Postgres database running locally
2. [Set up a Clerk application](https://docs.clerk.dev/popular-guides/setup-your-application)
3. Copy `.env.sample` to `.env.local`, and set environment variables as appropriate:

- Set `NEXT_PUBLIC_CLERK_FRONTEND_API` to the **Frontend API Key** and `CLERK_API_KEY` to the `default` **Backend API Key** from the [Clerk Dashboard](https://dashboard.clerk.dev/)
- Set the parameters for the DB as appropriate
- Set `NEXT_PUBLIC_GRAPHQL_API_URL`

4. Start the application with `yarn dev`
