import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div style={{backgroundColor: "lightblue",height: "100vh"}}>
      <h1 style={{ textAlign: "center",fontFamily:'Arial'}}>Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default App;
