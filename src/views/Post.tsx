import React from "react";
import { Form, Button } from "react-bootstrap";

import post from "api/post";
import { AuthContext } from "components";

import "styles/Post.scss";

interface State {
  postData: {
    topic_header: string;
    topic_body: string;
  };
  isLoading: boolean;
  isPost: boolean;
  isPostFailed: boolean;
  isValidated: boolean;
}

class Post extends React.Component {
  state: State = {
    postData: {
      topic_header: "",
      topic_body: "",
    },
    isLoading: false,
    isPost: false,
    isPostFailed: false,
    isValidated: false,
  };

  handlePostDataChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const postData = this.state.postData;
    if (name === "topic_header" || name === "topic_body") {
      postData[name] = value;
    }
    console.log(postData);
    this.setState({ postData });
  };

  handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      this.setState({ isValidated: true });
    } else {
      this.setState({ isPostFailed: false, isValidated: false});

      try {
        const result = await post(this.state.postData);
        if (result) {
          console.log("Post success!!!");
          this.setState({ isPost: true });
        } else {
          console.log("Post failed!!!");
          this.setState({ isPostFailed: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className="post-container">
        <div className="form-container">
          <div className="form-card">
            <Form>
              <Form.Group controlId="formBasicTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control 
                  required
                  type="topic_header"
                  name="topic_header"
                  value={this.state.postData.topic_header}
                  onChange={this.handlePostDataChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicBody">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                  required
                  as="textarea" 
                  rows={10} 
                  type="topic_body" 
                  name="topic_body"
                  value={this.state.postData.topic_body}
                  onChange={this.handlePostDataChange}
                />
              </Form.Group>
              <div className="content-right">
                <Button 
                  variant="primary" 
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>      
    );
  }
}

Post.contextType = AuthContext;

export default Post;