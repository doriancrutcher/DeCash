import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import { Card, Button, Form } from "react-bootstrap";
import { memo } from "react";

const MoneyMemo = (props) => {
  const memoField = useRef("");
  const nearField = useRef("");
  const recipientField = useRef("");

  const [buttonState, changeButtonState] = useState(false);

  const submitButton = async () => {
    console.log("give me code");
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Send NEAR</Card.Title>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Recipient</Form.Label>
            <Form.Control ref={recipientField} placeholder='example.testnet' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={nearField}
              placeholder='Enter NEAR Value '
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Memo Field</Form.Label>
            <Form.Control
              placeholder='write something cool'
              ref={memoField}
              as='textarea'
              rows={5}
            />
          </Form.Group>
        </Form>
        <Button disabled={buttonState} onClick={submitButton} variant='primary'>
          Send NEAR
        </Button>
      </Card.Body>
    </Card>
  );
};

MoneyMemo.propTypes = {};

export default MoneyMemo;
