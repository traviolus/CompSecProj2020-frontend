import React from "react";
import { RouteComponentProps } from "react-router-dom";

interface RouterProps {
  postId: string;
}

class ViewPost extends React.Component<RouteComponentProps<RouterProps>> {
  render() {
    return <div>test{this.props.match.params.postId}</div>;
  }
}

export default ViewPost;
