import {
  ActionFunctionArgs,
  Form,
  useLocation,
  redirect,
} from "react-router-dom";
import auth from "../../lib/auth";
import { Comment, Post } from "../../types";

export const action = async (args: ActionFunctionArgs) => {
  const { postId, commentId } = args.params;

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        "/posts/" +
        postId +
        "/comments/" +
        commentId,
      {
        headers: {
          Authorization: "Bearer " + auth.getJWT(),
        },
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const { message } = await response.json();

      return { message };
    }

    return redirect("/posts/" + postId);
  } catch (error) {
    console.error("Error deleding comment: " + error);
    throw error;
  }
};

const DeleteComment = ({ comment, post }: { comment: Comment; post: Post }) => {
  const location = useLocation();

  //  const comment = post.comments.comment._id

  return (
    <Form
      method="delete"
      action={`/posts/${post._id}/comments/${comment._id}/delete-comment`}
    >
      <input type="hidden" value={comment._id} name="commmentId" />
      <input
        type="hidden"
        value={location.pathname + location.search}
        name="returnTo"
      />
      <button type="submit">Delete comment</button>
    </Form>
  );
};

export default DeleteComment;
