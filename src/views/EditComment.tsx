import React, { FC, useEffect, useState, useCallback } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

import { getCommentById, editComment } from "api/editComment";
import { LoadingIcon } from "components";

import "styles/ViewTopic.scss";

interface RouterProps {
  commentId: string;
}

interface CommentData {
  commentId: number;
  message: string;
  topicId: number;
}

const EditComment: FC<RouteComponentProps<RouterProps>> = ({
  match: {
    params: { commentId },
  },
}) => {
  const [commentData, setCommentData] = useState<CommentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  const fetchCommentData = useCallback(async () => {
    setIsLoading(true);
    // try {
      const commentResponse = await getCommentById(commentId);
      setCommentData({
        commentId: commentResponse.comment_id,
        message: commentResponse.comment_text,
        topicId: commentResponse.comment_topic,
      });
      setIsLoading(false);
    // } catch (error) {
    //   alert("Error!");
    //   alert(error);
    //   setRedirect("/");
    // }
  },[]);

  const handleCommentChange = (text: string) => {
    if (commentData) {
      const commentDataOld = { ...commentData };
      commentDataOld.message = text;
      setCommentData(commentDataOld);
    }
  };

  const handleChangeComment = async () => {
    setIsLoading(true);
    if (commentData) {
      const response = await editComment(
        commentData.commentId.toString(),
        commentData.message
      );
      if (!response) {
        alert("Error!");
      }
      setRedirect(`/topic/${commentData.topicId}`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!commentId) {
      window.location.assign("/");
    }

    // LOAD DATA
    fetchCommentData();
  }, [commentId, fetchCommentData]);

  return redirect ? (
    <Redirect to={redirect} />
  ) : isLoading ? (
    <LoadingIcon />
  ) : (
    <div className="view-topic-page">
      <div className="content-container">
        <div className="add-comment">
          <Card>
            <Card.Body>
              <Form onSubmit={handleChangeComment}>
                <Form.Group>
                  <Form.Label>Edit Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={commentData?.message}
                    onChange={(e) => handleCommentChange(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit">Save</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
