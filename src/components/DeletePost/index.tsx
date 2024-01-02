import { ActionFunctionArgs, Form, redirect } from "react-router-dom"
import auth from "../../lib/auth";
import { Post } from "../../types";
import Styles from "./DeletePost.module.css"

export const action = async (args: ActionFunctionArgs) => {
  const { postId } = args.params;

  try {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL +
        "/posts/" +
        postId,
      {
        headers: {
          Authorization: "Bearer " + auth.getJWT(),
        },
        method: "DELETE",
      }
    )
    if (!response.ok) {
      const { message } = await response.json();

      return { message };
    }

    return redirect("/")

  } catch (error) {
    console.error("Error deleting comment: " + error)
    throw error;
  }
}

const DeletePost = ({ post }: { post: Post }) => {

  return(
    <Form
      method="delete"
      action={`/posts/${post._id}/delete-post`}
    >
      <input type="hidden" value={post._id} name="postId" />
      <input
        type="hidden"
        value={location.pathname + location.search}
        name="returnTo"
      />
      <button type="submit" className={Styles.button}>Delete post</button>
    </Form>  )
}

export default DeletePost