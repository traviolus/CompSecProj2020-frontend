import React from "react";
import { ListGroup } from "react-bootstrap";

import allTopics from "api/allTopics";

import "styles/Home.scss";

interface Topic {
  topic_id: number;
  topic_header: string;
  topic_user: string;
  topic_createdtime: Date;
}

interface State {
  data: Array<Topic>;
}

class Home extends React.Component {
  state: State = {
    data: [],
  };
  componentDidMount = async () => {
    const result = await allTopics();
    if (result) {
      this.setState({ data: result });
    }
  };

  render() {
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="main-card">
            <ListGroup>
              {this.state.data.map((i) => {
                return (
                  <ListGroup.Item key={i.topic_id}>
                    <a href={`/topic/${i.topic_id}`}>{i.topic_header}</a>
                    <div>
                      <span className="username">{i.topic_user} </span>
                      <span className="created_datetime">
                        {i.topic_createdtime}
                      </span>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
