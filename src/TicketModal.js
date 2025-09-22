import React from "react";
import { useState, useEffect } from "react";
import "./stylesheets/TicketModal.css";

const TicketModal = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (props.selectedTicket){
            setTitle(props.selectedTicket.title);
            setDescription(props.selectedTicket.description);
            setPriority(props.selectedTicket.priority);
            setDueDate(props.selectedTicket.dueDate);
        } else{
            setTitle("");
            setDescription("");
            setPriority("Low");
            setDueDate("");
        }
    }, [props.selectedTicket, props.show]);

    if (props.show === false){
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.selectedTicket){
            props.updateTicket({title, description, priority, dueDate}, props.selectedTicket.ticketId);
        } else{
            props.createTicket({title, description, priority, dueDate});
        }
        props.onClose();
    }

    return (
        <>
        <div className="ticket-modal-backdrop" onClick={props.onClose}></div>
        <div className="ticket-modal">
            <div className="ticket-modal-header">
                <h3>{props.selectedTicket?.title || "New Ticket"}</h3>
                <button className="close-ticket-modal-btn" onClick={props.onClose}>X</button>
            </div>
            <div className="ticket-modal-body">
                <form onSubmit={handleSubmit}>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
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
                <div className="ticket-modal-footer">
                    <button
                    type="button"
                    className="ticket-modal-btn cancel-ticket-btn"
                    onClick={props.onClose}
                    >
                    Cancel
                    </button>
                    <button type="submit" className="ticket-modal-btn create-ticket-btn">
                    {props.selectedTicket ? "Save Changes" : "Add Ticket"}
                    </button>
                </div>
                </form>
            </div>
        </div>
        </>
    )
};

export default TicketModal;