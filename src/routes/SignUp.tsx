import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import styles from "./SignUp.module.css";
import { ActionData } from "../types";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");
  const passwordConfirmation = formData.get("password_confirmation");

  if (password !== passwordConfirmation) {
    return { message: "Password does not match" };
  }

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/register", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();

    return { message };
  }

  return redirect("/sign-in");
};

const SignUp = () => {
  const error = useActionData() as ActionData;
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Create a new account</h2>
      <Form className={styles.formContainer} method="post">
        {error && (
          <p>
            <b>Error:</b>
            {error.message}
          </p>
        )}
        <div className={styles.inputField}>
          <label htmlFor="username">Username </label>
          <input type="text" name="username" id="username" required />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password">Password </label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password_confirmation">Password confirmation </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            required
          />
        </div>
        <div>
          <button className={styles.submitButton} type="submit">
            Create user
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
