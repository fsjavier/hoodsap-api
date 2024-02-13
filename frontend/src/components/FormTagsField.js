import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FormTagsField = () => {
  const [userTags, setUserTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputSubmit = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      event.preventDefault();
      setUserTags([...userTags, tagInput.trim()]);
      console.log(userTags);
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setUserTags(prevUserTags => prevUserTags.filter((_, index) => index !== indexToRemove));

  };
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
        />
      </Form.Group>
      <div>
        {userTags.map((tag, index) => (
          <Badge key={index} pill variant="secondary" className="mr-2 mb-4">
          {tag}
          <span onClick={() => removeTag(index)} style={{ cursor: 'pointer' }}>
            <XMarkIcon className="ms-2" style={{ width: '16px', height: '16px' }} />
          </span>
        </Badge>
        ))}
      </div>
    </>
  );
};

export default FormTagsField;
