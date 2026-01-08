import React, { useEffect, useState } from "react";
import { api } from "./repositories/api/api";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSetUsers = () => {
    setLoading(true);
    api
      .get("/users")
      .then((res) => setUsers(res.data), setLoading(false))
      .catch((err) => console.error(err), setLoading(false));
  };

  useEffect(() => {
    handleSetUsers();
  }, []);

  const renderApiWithNames = () => {
    if (loading) return <p>Carregando dados</p>;
    if (!users) return <p>Dados não encontrados</p>;

    return (
      <div>
        <p>Dados da API: </p>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} - {user.email}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <p className="dashboard-p">Dashboard - MFE</p>
      {renderApiWithNames()}
    </div>
  );
};

export default App;
