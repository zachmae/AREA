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
    background-color: #E0E0E0;
    color: black;
`;

export default class RequestGet extends React.Component {
    render() {
        return (
            <div>
                <Container style={{backgroundColor: this.props.background}}>
                    <h2 style={{margin: '0px 0px 10px'}}>{this.props.name}</h2>
                    <p><b>Url: </b>{this.props.url}</p>
                    <p><b>Method: </b>{this.props.method}</p>
                    <br/>
                    <p><b>Result: </b>result={JSON.stringify(this.props.result)}</p>
                </Container>
            </div >
        );
    }
};