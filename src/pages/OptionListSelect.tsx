import SELECT from "../assets/follow.svg";
import CREATE from "../assets/tabs.svg";
import { useNavigate } from "react-router-dom";

export default function OptionListSelect() {
  const navigate = useNavigate();

  const handleNavigateSelect = () => {
    setTimeout(() => {
      navigate("/select");
    }, 1000);
  };

  const handleNavigateCreate = () => {
    setTimeout(() => {
      navigate("/create");
    }, 1000);
  };

  return (
    <div
      className="block_sselect"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        gap: 20,
      }}
    >
      <button className="btn_select_option" onClick={handleNavigateSelect}>
        <img className="image_asset" src={SELECT} alt="select table" />
      </button>
      <button className="btn_select_option" onClick={handleNavigateCreate}>
        <img className="image_asset" src={CREATE} alt="create table" />
      </button>
    </div>
  );
}
