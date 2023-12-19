import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Index, {loader as indexLoader} from "./routes/index.tsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.tsx";
import SignIn, { action as signInAction } from "./routes/SignIn.tsx";
import auth from "./lib/auth.ts";
import CreatePost, {
  action as createPostAction,
} from "./routes/CreatePost.tsx"; //action as insertName gör att man kan använda namnet action i flera filer och kalla de olika saker i denna fil
import RequireAuth from "./components/RequierAuth/index.tsx";
import ShowPost, {loader as showPostLoader} from "./routes/ShowPost.tsx";
import {action as createCommentAction} from "./components/CommentForm/index.tsx";
import {action as voteAction} from "./components/VoteComponent/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: indexLoader,
        element: <Index />,
      },
      {
        path: "posts/:id",
        loader: showPostLoader,
        element: <ShowPost/>
      },
      {
        path: "sign-in",
        action: signInAction,
        element: <SignIn />,
      },
      {
        path: "sign-up",
        action: signUpAction,
        element: <SignUp />,
      },
      {
        path: "sign-out",
        action: () => {
          auth.signOut();
          return redirect("/");
        },
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "create-post",
            action: createPostAction,
            element: <CreatePost />,
          },
          {
            path: "/posts/:postId/comments",
            action: createCommentAction
          },
          {
            path: "/posts/:postId/vote",
            action: voteAction
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
