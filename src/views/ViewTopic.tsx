import React, { FormEvent } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

import { getTopicById, getCommentsByTopicId, addComment } from "api/viewTopic";

import "styles/ViewTopic.scss";

interface RouterProps {
  topicId: string;
}

interface TopicData {
  title: string;
  body: string;
  author: string;
  timestamp: string;
}

interface CommentData {
  commentId: number;
  message: string;
  author: string;
  timestamp: string;
}
interface State {
  topic: TopicData;
  comments: Array<CommentData>;
  addComment: string;
  redirect: string;
}

class ViewTopic extends React.Component<
  RouteComponentProps<RouterProps>,
  State
> {
  state = {
    topic: {
      title: "",
      body: "",
      author: "",
      timestamp: "",
    },
    comments: [
      {
        commentId: 1,
        message: "WOWWWWW",
        author: "Kritsana Khankaew",
        timestamp: "13 Dec 2020",
      },
      {
        commentId: 2,
        message: "Great job !",
        author: "Kongtap",
        timestamp: "13 Dec 2020",
      },
    ],
    addComment: "",
    redirect: "",
  };

  componentDidMount = () => {
    this.handleLoadData();
  };

  handleLoadData = async () => {
    let topicId = "0";
    try {
      topicId = this.props.match.params.topicId;
    } catch (error) {
      this.setState({ redirect: "/" });
    }

    if (!topicId) {
      this.setState({ redirect: "/" });
    }
    const [topicData, commentsData] = await Promise.all([
      getTopicById(topicId),
      getCommentsByTopicId(topicId),
    ]);

    const topic: TopicData = {
      title: topicData.topic_header,
      body: topicData.topic_body,
      author: topicData.topic_user,
      timestamp: topicData.topic_lastmodified
        ? new Date(topicData.topic_lastmodified).toDateString()
        : new Date(topicData.topic_createdtime).toDateString(),
    };

    const comments: CommentData[] = commentsData.map((comment) => {
      const comment_output: CommentData = {
        commentId: comment.comment_id,
        message: comment.comment_text,
        author: comment.comment_user,
        timestamp: new Date(comment.comment_createdtime).toDateString(),
      };
      return comment_output;
    });

    this.setState({ topic, comments });
  };

  handleAddCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    this.setState({ addComment: target.value });
  };

  handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    const result = await addComment(
      this.props.match.params.topicId,
      this.state.addComment
    );
    if (result) {
      this.setState({ addComment: "" });
      this.handleLoadData();
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="view-topic-page">
        <div className="content-container">
          <div className="topic-container">
            <Card className="topic">
              <Card.Body>
                <Card.Title>
                  <h2>{this.state.topic.title}</h2>
                </Card.Title>
                <Card.Text>{this.state.topic.body}</Card.Text>
                <span className="username">{this.state.topic.author}</span>
                <span className="created_datetime">
                  last modified: {this.state.topic.timestamp}
                </span>
              </Card.Body>
            </Card>
          </div>
          <div className="comment-container">
            <h5 className="comment-topic">Comments</h5>
            {this.state.comments.map((comment) => {
              return (
                <Card className="comment" key={comment.commentId}>
                  <Card.Body>
                    <Card.Text>{comment.message}</Card.Text>
                    <span className="username">{comment.author}</span>
                    <span className="created_datetime">
                      {comment.timestamp}
                    </span>
                  </Card.Body>
                </Card>
              );
            })}
            <div className="add-comment">
              <Card>
                <Card.Body>
                  <Form onSubmit={this.handleAddComment}>
                    <Form.Group>
                      <Form.Label>Add Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={this.state.addComment}
                        onChange={this.handleAddCommentChange}
                      />
                    </Form.Group>
                    <Button type="submit">Comment</Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewTopic;
