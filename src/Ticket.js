import React from "react";
import "./stylesheets/Ticket.css";

function Ticket(props) {
  // Map priority levels to Bootstrap badge color classes
  const priorityColors = {
    Low: "success",
    Medium: "warning",
    High: "danger",
  };

  // Trigger parent delete function with this ticket's ID
  const onDeleteTicket = () => {
    props.deleteTicket(props.ticketId);
  }

  // Trigger parent getTicketById function for editing
  const onEditTicket = () => {
    props.getTicketById(props.ticketId);
  }

  return (
    <div className="ticket-element">
        <div className="ticket-element-info">
            <div className="section-1">
                <div className="title-element">
                    <h5 className="card-title">
                    #{props.number} - {props.title}
                    </h5>
                </div>

                <div className="description-element">
                    <p className="card-text">{props.description}</p>
                </div>
            </div>
            <div className="section-2">
                <div className="priority-element">
                    <b>Priority</b>
                    <p>
                    <span className={`badge bg-${priorityColors[props.priority] || "secondary"}`}>
                        {props.priority}
                    </span>
                    </p>
                </div>
                <div className="due-date-element">
                    <b>Due Date</b>
                    <p>
                    {props.dueDate}
                    </p>
                </div>
            </div>
        </div>

        <div className="ticket-element-btns">
            <button className="edit-ticket-btn" onClick={onEditTicket}>Edit</button>
            <button className="delete-ticket-btn" onClick={onDeleteTicket}>Delete</button>
        </div>
        </div>
  );
}

export default Ticket;
