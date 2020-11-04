import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card } from "react-bootstrap";

import "styles/ViewPost.scss";

interface RouterProps {
  postId: string;
}

interface PostData {
  title: string;
  body: string;
  author: string;
  timestamp: string;
}

interface CommentData {
  message: string;
  author: string;
  timestamp: string;
}
interface State {
  post: PostData;
  comments: Array<CommentData>;
}

class ViewPost extends React.Component<
  RouteComponentProps<RouterProps>,
  State
> {
  state = {
    post: {
      title: "รีวิวคาเฟ่น่าเที่ยว",
      body: "klfmslkmvsdkvsmdlvsmkdv",
      author: "Melvin Macaranas",
      timestamp: "13 Dec 1989",
    },
    comments: [
      {
        message: "WOWWWWW",
        author: "Kritsana Khankaew",
        timestamp: "13 Dec 2020",
      },
      {
        message: "Great job !",
        author: "Kongtap",
        timestamp: "13 Dec 2020",
      },
    ],
  };

  render() {
    return (
      <div className="view-post-page">
        <div className="content-container">
          <div className="post-container">
            <Card className="post">
              <Card.Header>
                <Card.Title>{this.state.post.title}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>{this.state.post.body}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Card.Text>{this.state.post.author}</Card.Text>
                <Card.Text className="text-muted">
                  {this.state.post.timestamp}
                </Card.Text>
              </Card.Footer>
            </Card>
          </div>
          <div className="comment-container">
            <h5 className="comment-topic">Comments</h5>
            {this.state.comments.map((comment) => {
              return (
                <Card className="comment">
                  <Card.Body>
                    <Card.Text>{comment.message}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Text>{comment.author}</Card.Text>
                    <Card.Text className="text-muted">
                      {comment.timestamp}
                    </Card.Text>
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewPost;
