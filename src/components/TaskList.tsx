import { useEffect, useState } from "react";
import { Table, Button, Input, message, Modal } from "antd";
import { getTasks, deleteTask, executeTask } from "../api";
import { Task } from "../types";
import TaskForm from "./TaskForm";
import CommandOutput from "./CommandOutput";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      console.log("Fetched tasks:", response); // Debugging log
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      message.error("Error fetching tasks");
    }
    setLoading(false);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      message.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Error deleting task");
    }
  };

  const handleExecuteTask = async (id: string) => {
    try {
      const updatedTask = await executeTask(id);
      message.success("Command executed successfully");
      setSelectedTask(updatedTask.data); // Store the executed task output
      fetchTasks();
    } catch (error) {
      console.error("Error executing command:", error);
      message.error("Error executing command");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input.Search
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, width: 400,marginRight: 10,justifyContent: 'center',marginLeft:16}}
      />
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 16,padding: 10,justifyContent: 'center',fontFamily: 'Roboto',fontSize: 16}}>
        Create Task
      </Button>
      <Table
        style={{ backgroundColor: "lightblue" }}
        dataSource={tasks.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))}
        loading={loading}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Owner", dataIndex: "owner", key: "owner" },
          {
            title: "Command",
            dataIndex: "command",
            key: "command",
            render: (_, record) => (
              <Button onClick={() => handleExecuteTask(record.id)} style={{marginRight:8,backgroundColor:"green",color:"white"}}>Run</Button>
            ),
          },
          {
            title:"Task Executions",
            dataIndex: "taskExecutions",
            key: "taskExecutions",
            render: (_, record) => (
              <>
                <Button onClick={() => setSelectedTask(record)} style={{marginRight:8}}>View Output</Button>
              </>
            )
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <>
                <Button danger onClick={() => handleDeleteTask(record.id)} style={{ marginRight: 8,backgroundColor: "red",color: "white"}}>
                  Delete
                </Button>
                
              </>
            ),
          },
        ]}
      />
      
      {/* Create Task Modal */}
      <TaskForm visible={isModalOpen} onClose={() => setIsModalOpen(false)} refresh={fetchTasks} />

      {/* Command Output Modal */}
      <Modal 
        title="Command Output" 
        open={selectedTask !== null} 
        onCancel={() => setSelectedTask(null)}
        footer={null}
      >
        <CommandOutput task={selectedTask} onClose={() => setSelectedTask(null)}/>
      </Modal>
    </div>
  );
};

export default TaskList;
