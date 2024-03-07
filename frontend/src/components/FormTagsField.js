import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Alert } from "react-bootstrap";

const FormTagsField = ({ initialTags, handleTagsChange }) => {
  const [userTags, setUserTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputSubmit = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();
      setErrors("");
      setUserTags((prevUserTags) => [...prevUserTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setUserTags((prevUserTags) =>
      prevUserTags.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (initialTags) {
      setUserTags(initialTags);
    }
  }, [initialTags]);

  useEffect(() => {
    if (userTags.length >= 5) {
      setErrors("Maximum of 5 tags allowed.");
      setIsDisabled(true);
    } else {
      setErrors("");
      setIsDisabled(false);
    }
    handleTagsChange(userTags);
  }, [userTags]);

  return (
    <>
      <Form.Group controlId="tags">
        <Form.Label className="d-none">Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add a tag and press Enter"
          name="tags"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputSubmit}
          disabled={isDisabled}
          aria-label="Tags"
        />
      </Form.Group>
      {errors && <Alert variant="warning">{errors}</Alert>}
      <div>
        {userTags.map((tag, index) => (
          <Badge key={index} pill variant="secondary" className="mr-2 mb-4">
            {tag}
            <span
              onClick={() => removeTag(index)}
              style={{ cursor: "pointer" }}
            >
              <XMarkIcon
                className="ms-2"
                style={{ width: "16px", height: "16px" }}
              />
            </span>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default FormTagsField;
