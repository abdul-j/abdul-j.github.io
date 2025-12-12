import {isRouteErrorResponse} from "react-router";
import SEO from "./seo";

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  // Routing errors (404 etc)
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;

    // Regular runtime errors
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="flex flex md:flex-row items-center justify-center pt-16 p-4">
      <div className="mx-auto w-1/2">
        <SEO 
          title="WHAT HAVE YOU DONE"
          description="error lowkey."
        />
        <h1>{message}</h1>

        <h2>
          You can either go back{" "}
          <a
            className="lg:text-xl text-red-600 hover:underline hover:text-my-blue"
            href="/"
          >
            home
          </a>{" "}
          or watch my goal in FIFA 14 on the PS2 with Leo Messi.
        </h2>

        <p>{details}</p>

        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}

        <video width="640" height="360" loop autoPlay muted>
          <source src="/assets/vid2.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>  
      <div className="w-1/2">
        <video autoPlay controls>
          <source src="/assets/objection.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  );
}
