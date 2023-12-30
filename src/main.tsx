import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Index, { loader as indexLoader } from "./routes/index.tsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.tsx";
import SignIn, { action as signInAction } from "./routes/SignIn.tsx";
import UpdatePost, {
  action as updatePostAction,
} from "./routes/UpdatePost.tsx";
import auth from "./lib/auth.ts";
import CreatePost, { createPostAction } from "./routes/CreatePost.tsx"; //action as insertName gör att man kan använda namnet action i flera filer och kalla de olika saker i denna fil
import RequireAuth from "./components/RequierAuth/index.tsx";
import ShowPost, { loader as showPostLoader } from "./routes/ShowPost.tsx";
import { action as createCommentAction } from "./components/CommentForm/index.tsx";
import { action as voteAction } from "./components/VoteComponent/index.tsx";
import { action as deleteCommentAction } from "./components/DeleteComment/index.tsx";
import { action as deletePostAction } from "./components/DeletePost/index.tsx";
// import UpdatePost from "./routes/UpdatePost.tsx";

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
        element: <ShowPost />,
      },
      {
        path: "posts",
        action: () => {
          return redirect("/");
        },
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
            action: createCommentAction,
          },
          {
            path: "/posts/:postId/update",
            action: updatePostAction,
            element: <UpdatePost />,
          },
          {
            path: "/posts/:postId/vote",
            action: voteAction,
          },
          {
            path: "/posts/:postId/comments/:commentId/delete-comment",
            action: deleteCommentAction,
          },
          {
            path: "/posts/:postId/delete-post",
            action: deletePostAction,
          },
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
