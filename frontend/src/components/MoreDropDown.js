import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/MoreDropDown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const EllipsisVertical = React.forwardRef(({ onClick }, ref) => (
  <EllipsisVerticalIcon
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={appStyles.Icon}
  />
));

export const MoreDropdown = ({ handleEdit, handleShowDeleteModal }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={EllipsisVertical} />
      <Dropdown.Menu
        className={styles.DropDownMenu}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item aria-label="edit" onClick={handleEdit}>
          <PencilSquareIcon className={appStyles.Icon} />
        </Dropdown.Item>
        <Dropdown.Item aria-label="delete" onClick={handleShowDeleteModal}>
          <TrashIcon className={appStyles.Icon} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
