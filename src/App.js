import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Employees from "./Components/Employees/Employees";
import Tasks from "./Components/Tasks/Tasks";
import EditEmployee from "./Components/Form/EditEmployee";
import Employee from "./Components/Employees/Employee";
import EditTask from "./Components/Form/EditTask";

import "./App.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="employees" element={<Employees />} />
          <Route path="employees/edit" element={<EditEmployee />} />
          <Route path="employees/employ/:id" element={<Employee />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/edit" element={<EditTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
