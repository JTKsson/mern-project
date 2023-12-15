import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import styles from "./SignIn.module.css";
import auth from "../lib/auth";
import { ActionData } from "../types";

export const action = async (args: ActionFunctionArgs) => {
  const { request } = args;

  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
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

  const { token } = await response.json();
  console.log(token);
  auth.signIn(token);

  return redirect("/");
};

const SignIn = () => {
  const error = useActionData() as ActionData;
  return (
    <div className={styles.body}>
      <h2 className={styles.title}>Sign in to FakeRedd</h2>
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
        <div>
          <button className={styles.submitButton} type="submit">
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
