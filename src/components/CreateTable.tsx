import { useState, type FormEvent } from "react";
import { useTable } from "../utils";
import { Link } from "react-router-dom";

export default function CreateTable() {
  const [name, setName] = useState("");
  const { handleCreateTable } = useTable();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateTable(name);
    setName("");
  };

  return (
    <form
      className="create_table"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}
      onSubmit={handleSubmit}
    >
      <h1>CreateTable</h1>
      <input
        value={name}
        type="text"
        placeholder="enter table name"
        required
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled={!name.trim()}>create</button>

      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          flexDirection: "column",
        }}
      >
        <Link to={"/select"}>go to select file</Link>
        <Link to={"/"}>go to select action</Link>
      </div>
    </form>
  );
}
