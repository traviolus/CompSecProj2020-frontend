import React from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect, RouteComponentProps } from "react-router-dom";

import editTopic from "api/editTopic";
import { getTopicById } from "api/viewTopic";
import { AuthContext } from "components";

import "styles/Post.scss";

interface RouterProps {
  topicId: string;
}

interface TopicData {
  title: string;
  body: string;
  author: string;
  timestamp: string;
}

interface State {
  editData: {
    topic_header: string;
    topic_body: string;
  };
  isLoading: boolean;
  isEdit: boolean;
  isEditFailed: boolean;
  isValidated: boolean;
  redirect: string;
  topicId: string;
}

class EditTopic extends React.Component<RouteComponentProps<RouterProps>,
State> {
  state: State = {
    editData: {
      topic_header: "",
      topic_body: "",
    },
    isLoading: false,
    isEdit: false,
    isEditFailed: false,
    isValidated: false,
    redirect: "/",
    topicId: "0",
  };

  componentDidMount = async () => {
      let topicId = "0";
      try {
        topicId = this.props.match.params.topicId;
        this.setState({ topicId })
      } catch (error) {
        this.setState({ redirect:  "/" });
      }

      if (!topicId) {
        this.setState({ redirect: "/" });
      }

      const topicData = await getTopicById(topicId);
      console.log(topicData)
  }

  handleEditDataChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const editData = this.state.editData;
    if (name === "topic_header" || name === "topic_body") {
      editData[name] = value;
    }
    this.setState({ editData });
  };

  handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      this.setState({ isValidated: true });
    } else {
      this.setState({ isEditFailed: false, isValidated: false });

      try {
        const result = await editPost(this.state.editData);
        if (result) {
          this.setState({ isEdit: true });
        } else {
          this.setState({ isEditFailed: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isEdit) {
      return <Redirect to={`/topic/${this.state.topicId}`} />;
    }

    return (
      <div className="post-container">
        <div className="form-container">
          <div className="form-card">
            <Form onSubmit={this.handleEdit}>
              <Form.Group controlId="formBasicTopic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  required
                  type="topic_header"
                  name="topic_header"
                  value={this.state.editData.topic_header}
                  onChange={this.handleEditDataChange}
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
                  value={this.state.editData.topic_body}
                  onChange={this.handleEditDataChange}
                />
              </Form.Group>
              <div className="content-right">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={this.state.isLoading}
                >
                  Edit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

EditTopic.contextType = AuthContext;

export default EditTopic;
