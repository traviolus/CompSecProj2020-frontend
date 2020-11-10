import React, { FormEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

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
  message: string;
  author: string;
  timestamp: string;
}
interface State {
  topic: TopicData;
  comments: Array<CommentData>;
  addComment: string;
}

class ViewTopic extends React.Component<
  RouteComponentProps<RouterProps>,
  State
> {
  state = {
    topic: {
      title: "รีวิวคาเฟ่น่าเที่ยว",
      body:
        "รีวิว Sri the shophouse สี 🏡☕️🥯🌵⛅️ #ภูเก็ต คาเฟ่สีขาวสะอาดตาสไตล์มินิมอลในลุคเกาหลีที่สาวๆเห็นเป็นต้องปลื้ม!! หยิบยกตึกเก่าย่านชิโนโปรตุกีสมาปัดฝุ่นใหม่ให้ไฉไลกว่าเดิม เสิร์ฟความสุขผ่านเมนูคาวและหวานสไตล์โฮมเมด ที่ครีเอทมาเอาใจสายคาเฟ่  ไม่ว่าจะเป็น Beef Cheeseburger, Hamburg Steak with Rice ตบท้ายด้วยเมนูของหวานอย่าง Cloud, Passionfruit Cheesecake, Strawberry Tart, Matcha Terrine, Croffle with Ice Cream อีกทั้ง Specialty Coffee เพียบ จัดเต็มทั้ง Slow Bar และ Speed Bar พร้อมคัดสรรเมล็ดกาแฟจากหลากหลายแหล่งปลูก ให้คอกาแฟได้เลือกตามใจชอบ พลาดไม่ได้กับมุมถ่ายรูปชิคๆ ให้สาวๆได้ถ่ายรูปเก๋ๆ ใครมีแพลนตะลุยคาเฟ่ภูเก็ตปักหมุดกันไว้ รับรองว่าโดนใจอย่างแน่นอน 🥳📍 พิกัด:  ซ. สุ่นอุทิศ ต.ตลาดเหนือ อ.เมืองภูเก็ต 🕘 เปิด 9.00 - 19.00 น. (ปิดทุกวันพุธ)",
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
    addComment: "",
  };

  handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <div className="view-topic-page">
        <div className="content-container">
          <div className="topic-container">
            <Card className="topic">
              <Card.Body>
              <Card.Title><h2>{this.state.topic.title}</h2></Card.Title>
                <Card.Text>{this.state.topic.body}</Card.Text>
                <span className="username">{this.state.topic.author}</span>
                <span className="created_datetime">
                  {this.state.topic.timestamp}
                </span>
              </Card.Body>
            </Card>
          </div>
          <div className="comment-container">
            <h5 className="comment-topic">Comments</h5>
            {this.state.comments.map((comment, index) => {
              return (
                <Card className="comment" key={index}>
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
                    <Form.Control as="textarea" rows={3} onChange={this.handleAddCommentChange} />
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
