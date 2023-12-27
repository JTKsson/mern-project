import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { ActionData } from "../types";
import auth from "../lib/auth";

export const createPostAction = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Authorization": `Bearer ${auth.getJWT()}`,
    },
    body: formData
  });

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }

  return redirect("/")
};

// export const updatePostAction = async ({ request, params }: ActionFunctionArgs) => {
//   const { postId } = params;
//   const formData = await request.formData();

//   const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/posts/${postId}`, {
//     method: "PUT",
//     headers: {
//       "Authorization": `Bearer ${auth.getJWT()}`,
//     },
//     body: formData
//   });

//   if (!response.ok) {
//     const { message } = await response.json();
//     return { message };
//   }

//   return redirect("/");
// };

const CreatePost = () => {
  const error = useActionData() as ActionData;

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Assuming you have access to postId for updating
  //   const postId = params;
  //   // Use the appropriate action based on whether postId exists
  //   const actionFunction = postId ? updatePostAction : createPostAction;

  //   const response = await actionFunction({ request: { formData }, params: { postId } });

  //   }  };

  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Create a new post</h2>
      <Form className={styles.formContainer} method="post" encType="multipart/form-data">
        {error && (
          <p>
            <b>Error:</b>
            {error.message}
          </p> 
        )}
        <div className={styles.inputField}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="link">Link (optional)</label>
          <input type="link" name="link" id="link" />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="body">Body (optional)</label>
          <input type="body" name="body" id="body" />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="image">Image (optional)</label>
          <input type="file" name="image" id="image" accept="image/*" />
        </div>
        <div>
          <button className={styles.submitButton} type="submit">
            Create post
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
