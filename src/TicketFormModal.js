import React, { useState, useEffect } from "react";

const TicketFormModal = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");
    const [formMode, setFormMode] = useState("Add");

  // Pre-fill form if editing an existing ticket
  useEffect(() => {
    if (props.selectedTicket) {
        setFormMode("Edit");
        setTitle(props.selectedTicket.title || "");
        setDescription(props.selectedTicket.description || "");
        setPriority(props.selectedTicket.priority || "Low");
        setDueDate(props.selectedTicket.dueDate || "");
    } else {
        // Reset form if adding a new ticket
        setTitle("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
    }
  }, [props.selectedTicket, props.show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === "Add"){
        props.createTicket({ title, description, priority, dueDate });
    }
    else if (formMode === "Edit"){
        props.updateTicket({ title, description, priority, dueDate }, (props.selectedTicket.ticketId || 0));
    }
    props.onClose();
  };

  if (!props.show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {props.selectedTicket ? "Edit Ticket" : "Add New Ticket"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.onClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={props.onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {props.selectedTicket ? "Save Changes" : "Add Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default TicketFormModal;
