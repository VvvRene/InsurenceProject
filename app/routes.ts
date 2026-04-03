import { ro } from "@faker-js/faker";
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
        index("routes/dashboard.tsx"),
        route("playground", "routes/playground.tsx"),
        route("about", "routes/about.tsx"),
        route("post/:postId", "routes/post.tsx"),
        route("client/files", "routes/clientFileManagement.tsx"),
        route("client/files/download/:fileId", "routes/clientFileDownload.$fileId.ts"),
        // route("agent/files", "routes/agentFileManagement.tsx"),
        // route("agent/files/download/:fileId", "routes/agentFileDownload.$fileId.ts"),
        route("client", "routes/clientsInfo.tsx"),
        route("policy", "routes/policyInfo.tsx"),
        // --- ADD THIS TO SILENCE THE CHROME ERROR ---
        route(".well-known/appspecific/com.chrome.devtools.json", "routes/chrome-devtools.ts"),
] satisfies RouteConfig;
