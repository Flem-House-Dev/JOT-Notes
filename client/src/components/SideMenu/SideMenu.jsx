import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/note-and-pencil-sm.png";
import Button from "react-bootstrap/Button";
import { Gear } from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import { BoxArrowLeft } from "react-bootstrap-icons";
import ArrowLeft from "react-bootstrap-icons/dist/icons/arrow-left";

const SideMenu = ({ show, handleClose, handleShowModal, handleLogout }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} scroll="true" backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="d-flex justify-content-around align-items-center">
            <Image
              src={logo}
              className="logo-xsmall me-2"
              style={{ height: "64px" }} // ToDo: Move this to css file
              alt="note and pencil logo"
            />
            <h1 className=" text-primary mb-0">JOT Notes</h1>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex justify-content-end me-5">
          <Button
            className="btn side-menu-item d-flex mb-2"
            variant="outline-secondary"
            onClick={handleShowModal}
            style={{ width: "125px" }}
          >
            <Gear size={24} className="me-3" />
            Settings
          </Button>
        </div>
        <div className="d-flex justify-content-end me-5">
          <Button
            className="btn side-menu-item d-flex mb-2"
            variant="outline-secondary"
            onClick={handleLogout}
            style={{ width: "125px" }}
          >
            <BoxArrowLeft size={24} className="me-3" />
            Logout
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideMenu;
