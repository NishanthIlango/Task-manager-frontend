import { Modal, Form, Input, Button, message } from "antd";
import { createTask } from "../api";

const TaskForm = ({ visible, onClose, refresh }: { visible: boolean; onClose: () => void; refresh: () => void }) => {
  const [form] = Form.useForm();

  const handleCreateTask = async (values: { name: string; owner: string; command: string }) => {
    console.log("Creating task with values:", values); // Debugging log
    try {
      const response = await createTask(values);
      console.log("Task created successfully:", response.data); // Debugging log
      message.success("Task created successfully");
      refresh(); // Refresh the task list
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      message.error("Error creating task");
    }
  };

  return (
    <Modal 
      title="Create Task" 
      open={visible} 
      onCancel={onClose} 
      onOk={() => form.submit()} // Ensure form submits when clicking "Create"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleCreateTask}>
        <Form.Item name="name" label="Task Name" rules={[{ required: true, message: "Task Name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="owner" label="Owner" rules={[{ required: true, message: "Owner is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="command" label="Command" rules={[{ required: true, message: "Command is required" }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
