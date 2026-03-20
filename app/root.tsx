import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { ThemeProvider } from "./.frontend/contexts/ThemeContext";
import { Paper } from "@mui/material";
import TopNavBar from "./.frontend/components/TopNavBar";
import { ErrorLayout } from "./.frontend/components/ErrorLayout";
import { Box, height } from "@mui/system";

export function meta({ }: Route.MetaArgs) {
  return [
    { charset: "utf-8" },
    { title: "Insurance Management System" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "description", content: "A modern insurance management system built with Remix and Material-UI." },
    { name: "copyright", content: "© 2026 Insurance Management System. All rights reserved." },
  ];
}

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        <ThemeProvider>
          <Paper sx={{ minHeight: '100vh', borderRadius: 0, p: 0, bgcolor: "background.body"}}>
            <TopNavBar />
            <Box sx={{ height: '100%', width: '100%', py: 4, px:8}}  >
              {children}
            </Box>
          </Paper>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <ErrorLayout title={message} description={details} error={stack} />
  );
} 