import React from "react";
import { ListGroup } from "react-bootstrap";

import "styles/Home.scss";

interface Topic {
  topic_id: number;
  topic_header: string;
  topic_created_user: string;
  topic_created_datetime: Date;
}

class Home extends React.Component {
  data: Array<Topic> = [
    {
      topic_id: 1,
      topic_header: "How to hack facebook",
      topic_created_user: "armykongtap",
      topic_created_datetime: new Date("2019-01-16 22:00:00"),
    },
    {
      topic_id: 2,
      topic_header: "How to hack ig",
      topic_created_user: "armykongtap",
      topic_created_datetime: new Date("2019-01-16 23:00:00"),
    },
  ];

  render() {
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="main-card">
            <ListGroup>
              {this.data.map((i) => {
                return (
                  <ListGroup.Item>
                    <a href={`/topic/${i.topic_id}`}>{i.topic_header}</a>
                    <div>
                      <span className="username">{i.topic_created_user} </span>
                      <span className="created_datetime">
                        {i.topic_created_datetime.toLocaleString()}
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
