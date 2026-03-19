import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
        index("routes/dashboard.tsx"), 
        route("playground", "routes/playground.tsx"),
        route("about", "routes/about.tsx"),
        route("post/:postId", "routes/post.tsx"),
        route("client/files", "routes/clientFileManagement.tsx"),
        route("client/files/download/:fileId", "routes/clientFileDownload.$fileId.ts"),
] satisfies RouteConfig;
