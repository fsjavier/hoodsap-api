import React from "react";
import Form from "react-bootstrap/Form";
import Asset from "../components/Asset";
import Image from "react-bootstrap/Image";
import styles from "../styles/PostEventCreateForm.module.css";
import buttonStyles from "../styles/CustomButton.module.css";

const FormImageField = ({ image, imageInputRef, handleChangeImage }) => {
  const uploadImageSrc =
    "https://res.cloudinary.com/drffvkjy6/image/upload/v1707474874/upload_icon_bdzvjh.webp";

  return (
    <Form.Group>
      {image ? (
        <>
          <figure className={styles.Image__Container}>
            <Image src={image} className={styles.Image} alt="image"/>
          </figure>
          <div>
            <Form.Label
              htmlFor="image-upload"
              className={`${buttonStyles.Button} ${buttonStyles.Primary} ${buttonStyles.Medium}`}
            >
              Change the image
            </Form.Label>
          </div>
        </>
      ) : (
        <Form.Label
          htmlFor="image-upload"
          className="d-flex justify-content-center"
        >
          <Asset
            src={uploadImageSrc}
            message="Click or tap to upload an image"
            height={100}
            width={100}
          />
        </Form.Label>
      )}
      <Form.File
        ref={imageInputRef}
        className="d-none"
        id="image-upload"
        accept="image/*"
        onChange={handleChangeImage}
      />
    </Form.Group>
  );
};

export default FormImageField;
