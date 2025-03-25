import { Modal } from "antd";
import { Task } from "../types";

const CommandOutput = ({ task, onClose }: { task: Task | null; onClose: () => void }) => {
  return (
    <Modal title="Command Output" open={!!task} onCancel={onClose} footer={null}>
      {task?.taskExecutions && task.taskExecutions.length > 0 ? (
        task.taskExecutions.map((execution, index) => (
          <div key={index}>
            <p><b>Start Time:</b> {execution.startTime ?? "N/A"}</p>
            <p><b>End Time:</b> {execution.endTime ?? "N/A"}</p>
            <p><b>Output:</b> {execution.output ?? "No output available"}</p>
          </div>
        ))
      ) : (
        <p>No command output available.</p>
      )}
    </Modal>
  );
};

export default CommandOutput;
