import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Post } from "../types";
import CommentForm from "../components/CommentForm";
import VoteComponent from "../components/VoteComponent";
import DeleteComment from "../components/DeleteComment";
import DeletePost from "../components/DeletePost";
import Styles from "./ShowPost.module.css";

export const loader = async (args: LoaderFunctionArgs) => {
  const { params } = args;

  const { id } = params;

  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + "/posts/" + id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const posts = await response.json();

  return posts;
};

const ShowPost = () => {
  const post = useLoaderData() as Post;

  // const commentFetcher = useFetcher({key: "comment-form-" + post._id})

  return (
    <>
      <div className={Styles.container}>
        <VoteComponent post={post} />
        <div className={Styles.postContent}>
          <h2 className={Styles.title}>{post.title}</h2>
          {post.link ? (
            <Link to={post.link}>
              <p className={Styles.link}>({post.link})</p>
            </Link>
          ) : (
            ""
          )}
          {post.body && (
            <div className={Styles.postBody}>
              <p className={Styles.bodyContent}>{post.body}</p>
              <p className={Styles.author}>by {post.author.userName}</p>
            </div>
          )}
        </div>
      </div>
      <div className={Styles.buttonContainer}>
        <DeletePost post={post} />
        <Link className={Styles.updatePostButton} to={`/posts/${post._id}/update`}>Update post</Link>
      </div>
      <div className={Styles.commentContainer}>
        <CommentForm postId={post._id} />
        {post.comments?.map((comment) => (
          <div key={comment._id} className={Styles.commentContent}>
            <p className={Styles.commentAuthor}>{comment.author.userName}</p>
            <p>{comment.body}</p>
            <DeleteComment post={post} comment={comment} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowPost;
