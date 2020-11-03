import React from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";

import shorten from "api/shorten";

import "styles/Home.scss";

interface State {
  shortenData: {
    link_original: string;
  };
  link_shorten: string;
  isShorten: boolean;
  isLoading: boolean;
  isValidated: boolean;
  isShortenFailed: boolean;
  isCopied: boolean;
}

class Home extends React.Component {
  state: State = {
    shortenData: {
      link_original: "",
    },
    link_shorten: "",
    isShorten: false,
    isLoading: false,
    isValidated: false,
    isShortenFailed: false,
    isCopied: false,
  };

  handleInputDataChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const shortenData = this.state.shortenData;
    if (name === "link_original") {
      shortenData[name] = value;
    }
    this.setState({ shortenData });
  };

  handleShorten = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({ isLoading: true });
    this.setState({ 
      isShorten: false, 
      link_shorten: "", 
      isValidated: false,
      isCopied: false,
      isShortenFailed: false
    });

    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      this.setState({ isValidated: true });
    } else {
      this.setState({ isShortenFailed: false, isValidated: false });

      try {
        const result = await shorten(this.state.shortenData);
        if (result === "") {
          console.log("Shorten failed!!!");
          this.setState({ isShortenFailed: true });
        } else if (result === "incorrect") {
          console.log("Please enter a correct link!!!");
          this.setState({ isShortenFailed: true });
        } else {
          console.log("Shorten success!!!");
          this.setState({ isShorten: true });
          this.setState({
            link_shorten: process.env.REACT_APP_FRONTEND_URL + result,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    this.setState({ isLoading: false });
  };

  copyToClipboard = () => {
    console.log("Copy success!!!")
    this.setState({ isCopied: true });
  };

  render() {
    return (
      <div className="home-container">
        <div className="card-container">
          <div className="main-card">
            <Form
              noValidate
              validated={this.state.isValidated}
              onSubmit={this.handleShorten}
            >
              <InputGroup className="mb-3">
                <FormControl
                  required
                  type="link_original"
                  placeholder="Shorten your link"
                  name="link_original"
                  aria-label="Shorten your link"
                  aria-describedby="basic-addon2"
                  onChange={this.handleInputDataChange}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    type="submit"
                    disabled={this.state.isLoading}
                  >
                    Shorten
                  </Button>
                </InputGroup.Append>

                <Form.Control.Feedback type="invalid">
                  Please enter link
                </Form.Control.Feedback>
              </InputGroup>
              { this.state.isShortenFailed ? (
                <Form.Text className="text-danger">
                  Please enter a correct link.
                </Form.Text>
              ) : (
                ""
              )}
            </Form>

            {this.state.isShorten ? (
              <InputGroup className="mb-3">
                <Form.Control
                  value={this.state.link_shorten}
                  type="shorten-link"
                  name="link_shorten"
                  disabled
                />
                <InputGroup.Append>
                  <CopyToClipboard
                    text={this.state.link_shorten}
                    onCopy={this.copyToClipboard}
                  >
                    <Button
                      variant="outline-primary"
                      type="copy"
                      disabled={this.state.isLoading}
                    >
                      Copy
                    </Button>
                  </CopyToClipboard>
                </InputGroup.Append>
              </InputGroup>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
