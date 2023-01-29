import React from "react";
import RequestGet from "./requestGet";
import RequestPost from "./requestPost";
import { FetcherGet, FetcherPost } from "../controllers/Fetcher";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
    background-color: #282c34;
    color: white;
    text-align: center;
`;

export default class Services extends React.Component {

  constructor(props) {
    super(props);
    this.state = {background: this.props.services.map(() => 'grey'), result: this.props.services.map(() => null)};
    this.fetch();
  }

  updateRequest(id, result) {
    const tmp = this.state;
    if (JSON.stringify(result) !== "{}" && JSON.stringify(result) !== JSON.stringify({status:false})) {
      tmp.background[id] = 'green';
    } else {
      tmp.background[id] = 'red';
    }
//    tmp.background[id] = result ? 'green' : 'red';
    console.log(result);
    tmp.result[id] = result;
    this.setState(tmp);
  }

  fetch() {
    this.props.services.forEach((req, id)=> {
      if (req.method === 'POST') {
        FetcherPost(req.url, req.method, req.headers, req.body, (result) => {
          this.updateRequest(id, result);
        });
      } else {
        FetcherGet(req.url, req.method, (result) => {
          this.updateRequest(id, result);
        });
      }
    })
  }

  renderRequest(req, id) {
    if (req.method === 'POST') {
      return <RequestPost key={id} background={this.state.background[id]} result={this.state.result[id]}
      url={req.url}
      method={req.method}
      headers={req.headers}
      body={req.body}/>
    } else {
      return <RequestGet key={id} background={this.state.background[id]} result={this.state.result[id]}
      url={req.url}
      method={req.method}/>
    }
  }

  render() {
    return (
      <div>
        <Container>
          <h2>{this.props.name} </h2>
        </Container>

        {this.props.services.map((req, id) => {
          return this.renderRequest(req, id);
        })}
      </div>
    );
  }
}