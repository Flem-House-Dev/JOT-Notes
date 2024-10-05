import Button from "react-bootstrap/Button";
// const logo = require("../../assets/note-and-pencil-sm.png");
import logo from "../../assets/note-and-pencil-sm.png";
const Header = ({ handleLogout }) => {
  return (
    <header className="border">
      <div className="notes-page-header d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex justify-content-around align-items-end" >
          <img src={logo} className="logo-xsmall me-2" style={{ height: "64px"}} alt="note and pencil logo" />
          <h1 className=" text-primary ">JOT Notes</h1>
        </div>
        <Button
          className="btn"
          variant="outline-secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
