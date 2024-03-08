import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Asset from "./Asset";
import CustomButton from "./CustomButton";
import { useHistory } from "react-router-dom";

const NotFound = ({ message }) => {
  const noResultsSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1708332982/search_no_results_pujyrg.webp";
  const history = useHistory();

  return (
    <Row className="mt-5">
      <Col>
        <Row>
          <Col className="text-center">
            <CustomButton onClick={() => history.goBack()}>
              Go Back
            </CustomButton>
          </Col>
        </Row>
        <Row className="py-5">
          <Col>
            <Asset
              src={noResultsSrc}
              message={message}
              height={250}
              width={250}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NotFound;
