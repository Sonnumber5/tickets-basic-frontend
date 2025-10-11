import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './stylesheets/App.css';
import dataSource from './DataSource';
import Ticket from './Ticket';
import TicketFormModal from './TicketFormModal';
import TicketModal from './TicketModal';
import React from 'react';


function App() {
    const [allTickets, setAllTickets] = useState([]);
    const [tickets, setTickets] = useState([]); 
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketsBuffering, setTicketsBuffering] = useState(true);
    const [ticketSortingMethod, setTicketSortingMethod] = useState('dueDate');
    const [ticketPriorityFilter, setTicketPriorityFilter] = useState('Select Priority');
    const [showModal, setShowModal] = useState(false);

    const loadTickets = async () => {
        setTicketsBuffering(true);
        try {
            const response = await dataSource.get('/tickets');
            const fetchedTickets = response.data;
    
            // Sort by dueDate immediately
            const sortedTickets = [...fetchedTickets].sort((a, b) => {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            });
    
            setAllTickets(sortedTickets);
            setTickets(sortedTickets);
        } catch (err) {
            console.log("Error loading tickets", err);
        } finally{
            setTicketsBuffering(false);
        }
    };

    const getTicketById = async (ticketId) => {
        setTicketsBuffering(true);
        try {
            const response = await dataSource.get(`/tickets/${ticketId}`);
            setSelectedTicket(response.data);
            setShowModal(true);
        } catch (err) {
            console.log('Error retrieving selected ticket', err);
        } finally{
            setTicketsBuffering(false);
        }
    };

    const createTicket = async (ticket) => {
        setTicketsBuffering(true);
        try {
            await dataSource.post('/tickets', ticket);
            loadTickets();
        } catch (err) {
            console.log("Error creating ticket", err);
        } finally{
            setTicketsBuffering(false);
        }
    };

    const updateTicket = async (ticket, ticketId) => {
        setTicketsBuffering(true);
        try {
            await dataSource.put(`/tickets/${ticketId}`, ticket);
            loadTickets();
        } catch (err) {
            console.log("Error updating ticket", err);
        } finally{
            setTicketsBuffering(false);
        }
    };

    const deleteTicket = async (ticketId) => {
        setTicketsBuffering(true);
        try {
            await dataSource.delete(`/tickets/${ticketId}`);
            setTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));
            setAllTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));
        } catch (err) {
            console.log('Error deleting ticket', err);
        } finally{
            setTicketsBuffering(false);
        }
    };

    const sortTicketsByDueDate = () => {
        const sorted = [...tickets].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setTickets(sorted);
    };

    const sortTicketsByPriority = () => {
        const priorityValues = { Low: 1, Medium: 2, High: 3 };
        const sorted = [...tickets].sort((a, b) => priorityValues[b.priority] - priorityValues[a.priority]);
        setTickets(sorted);
    };

    const resetFilters = () => {
        setTicketPriorityFilter('Select Priority');
        setTicketSortingMethod('dueDate');
        setTickets(allTickets);
    };

    const onModalClose = () => {
        setShowModal(false);
        setSelectedTicket(null);
    };

    useEffect(() => {
        loadTickets();
    }, []);

    // Update displayed tickets whenever the priority filter changes
    useEffect(() => {
        if (ticketPriorityFilter === 'Select Priority') {
            setTickets(allTickets);
        } else {
            const filtered = allTickets.filter(ticket => ticket.priority === ticketPriorityFilter);
            setTickets(filtered);
        }
    }, [ticketPriorityFilter, allTickets]);

    // Update displayed tickets whenever sorting method changes
    useEffect(() => {
        if (!tickets.length) return;

        if (ticketSortingMethod === 'dueDate') {
            sortTicketsByDueDate();
        } else if (ticketSortingMethod === 'priority') {
            sortTicketsByPriority();
        }
    }, [ticketSortingMethod]);

    const formattedTickets = (tickets || []).map((ticket, index) => (
            <React.Fragment key={ticket.ticketId}>
            <Ticket
                ticketId={ticket.ticketId}
                number={index + 1}
                title={ticket.title}
                description={ticket.description}
                priority={ticket.priority}
                dueDate={ticket.dueDate}
                deleteTicket={deleteTicket}
                getTicketById={getTicketById}
            />
            </React.Fragment>
    ));

    const ticketsList = () => {
        if (ticketsBuffering) {
            return (
                <div className='empty-ticket'>
                    <p>Loading...</p>
                </div>
            );
        } else {
            return formattedTickets;
        }
    };

    const changePriority = () => {
        setTicketPriorityFilter('High');
    }

    return (
        <div className="App">
            <div className='header-navbar'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Basic Ticket App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className='body-content-home'>
                <div className='tickets-section'>
                    <div className='tickets-menu'>
                        <div className='tickets-menu-section-1'>
                            <select className='filter-dropdown' value={ticketPriorityFilter} onChange={(e) => {setTicketPriorityFilter(e.target.value)}}>
                                <option>Select Priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                            <select className='filter-dropdown' value={ticketSortingMethod} onChange={(e) => {setTicketSortingMethod(e.target.value)}}>
                                <option value={"dueDate"}>Sort By</option>
                                <option value={"priority"}>Priority ↓</option>
                                <option value={"dueDate"}>Date ↑</option>
                            </select>
                            <button className='reset-filters-btn' onClick={resetFilters}>Reset Filters</button>
                            <button className='reset-filters-btn'>Another New Button</button>

                        </div>
                        <div className='tickets-menu-section-2'>
                            <button className="add-ticket-btn" onClick={() => setShowModal(true)}>Add Ticket</button>
                        </div>
                    </div>
                    <div className='tickets-list'>
                        {ticketsList()}
                        <TicketModal
                        updateTicket={updateTicket}
                        selectedTicket={selectedTicket}
                        show={showModal}
                        onClose={onModalClose}
                        createTicket={createTicket}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
