import React from "react";
import styled from "styled-components";

const Container = styled.div`
    margin: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    height: fit-content;
    background-color: transparent;
    color: black;
`;

export default class RequestPost extends React.Component {
    render() {
        return (
            <div>
                <Container style={{backgroundColor: this.props.background}}>
                    <h2 style={{margin: '0px 0px 10px'}}>{this.props.name}</h2>
                    <p><b>Url: </b>{this.props.url}</p>
                    <p><b>Method: </b>{this.props.method}</p>
                    <p><b>Headers: </b>{JSON.stringify(this.props.headers)}</p>
                    <p><b>Body: </b>{JSON.stringify(this.props.body)}</p>
                    <br/>

                    <p><b>Result: </b>result={JSON.stringify(this.props.result)}</p>
                </Container>
            </div >
        );
    }
};