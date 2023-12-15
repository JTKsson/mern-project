import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { ActionData } from "../types";
import auth from "../lib/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const postData = Object.fromEntries(formData.entries());

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${auth.getJWT()}`,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }

  return redirect("/")
};

const CreatePost = () => {
  const error = useActionData() as ActionData;
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Create a new post</h2>
      <Form className={styles.formContainer} method="post">
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
            Create post
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
