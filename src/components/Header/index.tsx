import Styles from "./header.module.css";
import { Link, useFetcher } from "react-router-dom";
import auth from "../../lib/auth";

const Header = () => {
  const isAuthenticated = auth.isSignedIn();
  const fetcher = useFetcher();

  return (
    <div className={Styles.header}>
      <Link to="/"><h1 className={Styles.title}>Shreddit</h1></Link>
      <div className={Styles.buttons}>
        {isAuthenticated ? (
          <>
            <Link to="/create-post">
              <button className={Styles.button}>New post</button>
            </Link>
            <fetcher.Form method="post" action="/sign-out">
              <button className={Styles.button} type="submit">
                Sign out
              </button>
            </fetcher.Form>
          </>
        ) : (
          <>
            <Link to="/sign-up">
              <button className={Styles.button}>Sign up</button>
            </Link>
            <Link to="/sign-in">
              <button className={Styles.button}>Sign in</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
