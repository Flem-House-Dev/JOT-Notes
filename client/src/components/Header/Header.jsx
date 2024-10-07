import Button from "react-bootstrap/Button";
import { List } from "react-bootstrap-icons";
import logo from "../../assets/note-and-pencil-sm.png";
import Image from "react-bootstrap/Image";

const Header = ({ handleShow }) => {
  return (
    <header className=" notes-page-header d-flex justify-content-between align-items-center mb-5">
      <div className="d-flex justify-content-around align-items-end">
        <div className="d-flex justify-content-around align-items-center">
          <List size={32} className="me-4" style={{ cursor: "pointer" }} onClick={handleShow}/>
          <Image
            src={logo}
            className="logo-xsmall me-2"
            style={{ height: "64px" }} // ToDo: Move this to css file
            alt="note and pencil logo"
          />
          <h1 className=" text-primary mb-0">JOT Notes</h1>
        </div>
      </div>
   
    </header>
  );
};

export default Header;
