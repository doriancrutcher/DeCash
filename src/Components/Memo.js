import React from "react";
import PropTypes from "prop-types";

import { Container, Row } from "react-bootstrap";

const Memo = (props) => {
  return (
    <Container>
      <Row>{window.accountId + `Memo's and transactions`}</Row>
    </Container>
  );
};

Memo.propTypes = {};

export default Memo;
