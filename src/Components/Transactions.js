import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import { async } from "regenerator-runtime";

const Transactions = (props) => {
  const [memos, changeMemos] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      let userMemos = await window.contract.getMemos({
        user: window.accountId,
      });
      changeMemos(userMemos);
    };

    getInfo();
  }, []);

  return (
    <Container>
      {memos.map((x, i) => {
        return (
          <Row
            style={{ margin: "3vh" }}
            key={i}
            className='d-flex justify-content-center'
          >
            <Card>
              <Card.Title>Trasaction #{i}</Card.Title>
              <Card.Body>{x}</Card.Body>
            </Card>
          </Row>
        );
      })}
    </Container>
  );
};

Transactions.propTypes = {};

export default Transactions;
