import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Post from "../../components/Post";
import CommentPostCreateForm from "../comments/CommentPostCreateForm";
import { useCurrentUser } from "../../context/CurrentUserContext";
import PostComment from "../../components/PostComment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [hasLoadedPost, setHasLoadedPost] = useState(false);
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const [hasLoadedComments, setHasLoadedComments] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/post_comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
        setHasLoadedPost(true);
        setHasLoadedComments(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoadedPost(false);
    setHasLoadedComments(false);
    fetchPostData();
  }, [id]);

  return (
    <Container className="h-100 mt-4">
      {hasLoadedPost && hasLoadedComments ? (
        <>
          <Row>
            <Col>
              <Post {...post.results[0]} setPosts={setPost} postPage />
            </Col>
          </Row>
          {currentUser && hasLoadedPost ? (
            <Row>
              <Col>
                <CommentPostCreateForm
                  profile_id={currentUser?.profile_id}
                  profile_image={currentUser?.profile_image}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              </Col>
            </Row>
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          comments.results.length ? (
          <InfiniteScroll
            children={comments.results.map((comment) => (
              <PostComment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))}
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
            className={appStyles.InfiniteScroll}
          />
          ) : currentUser ? (<span>No comments yet, be the first!</span>) : (
          <span>No comments yet.</span>)
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PostPage;
