import React from "react";

function Ticket(props) {
  const priorityColors = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  };

  const onDeleteTicket = () => {
    props.deleteTicket(props.ticketId);
  }

  const onEditTicket = () => {
    props.getTicketById(props.ticketId);
  }

  return (
    <div className="card mb-3" style={{ width: "100%" }}>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-3">
            <h5 className="card-title">
              #{props.number} - {props.title}
            </h5>
          </div>

          <div className="col-md-4">
            <p className="card-text">{props.description}</p>
          </div>

          <div className="col-md-2">
            <p>
              <strong>Priority: </strong>
              <span
                className={`badge bg-${
                  priorityColors[props.priority] || "secondary"
                }`}
              >
                {props.priority}
              </span>
            </p>
          </div>

          <div className="col-md-2">
            <p>
              <strong>Due Date: </strong>
              {props.dueDate}
            </p>
          </div>

          <div className="col-md-1 d-flex flex-column">
            <button className="btn btn-sm btn-primary mb-1" onClick={onEditTicket}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={onDeleteTicket}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
