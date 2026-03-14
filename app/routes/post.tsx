import type { Route } from "./+types/post"

export async function loader({ params }: Route.LoaderArgs ) {
    // params.postId comes from the “$postId” segment
    const postId = params.postId ?? "unknown";
    // you could fetch the post from a DB/API here using postId
    return {postId};
};

export async function action() {}

export default function Post({ loaderData }: Route.ComponentProps ) { 
    const { postId } = loaderData; 
    return (
        <main>
            <h1>Post #{postId}</h1>
            <p>This page was rendered for postId <strong>{postId}</strong>.</p>
        </main>
    );
}