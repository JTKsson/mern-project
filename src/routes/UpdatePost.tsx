import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { ActionData } from "../types";
import auth from "../lib/auth";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { postId } = params;
  const formData = await request.formData();
  
  console.log(postId)
  console.log(formData)
  
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts/" + postId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

const UpdatePost = () => {
  const error = useActionData() as ActionData;
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Update a post</h2>
      <Form className={styles.formContainer} method="put">
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
        <div>
          <button className={styles.submitButton} type="submit">
            Update post
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePost;
