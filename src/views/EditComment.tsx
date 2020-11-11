import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

import "styles/ViewTopic.scss";

interface RouterProps {
  commentId: string;
}

interface CommentData {
  commentId: number;
  message: string;
  author: string;
  timestamp: string;
}

const EditComment: FC<RouteComponentProps<RouterProps>> = ({
  match: {
    params: { commentId },
  },
}) => {
  const [commentData, setCommentData] = useState<CommentData | null>(null);

  useEffect(() => {
    if (!commentId) {
      window.location.assign("/");
    }

    // LOAD DATA
  }, []);

  return (
    <div className="view-topic-page">
      <div className="content-container">
        <div className="add-comment">
          <Card>
            <Card.Body>
              <Form
              // onSubmit={this.handleAddComment}
              >
                <Form.Group>
                  <Form.Label>Edit Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    // value={this.state.addComment}
                    // onChange={this.handleAddCommentChange}
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
