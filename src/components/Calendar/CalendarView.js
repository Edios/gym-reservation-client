import React, { useState,useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {getClasses} from '../../services/classesService'
import ClassDetails from '../Classes/ClassesDetails';
import {getUserId}  from '../../services/authService';

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const userId=getUserId();
    useEffect(() => {
        async function fetchClasses() {
                try {
                    const classes = await getClasses();
                    setEvents(classes.map( c=>({
                        title: c.name,
                        start: c.start_date,
                        end: c.end_date,
                        extendedProps:c,
                        color:c.participants.includes(userId) ? 'green':'red'
                    })));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchClasses();
        },[refetch,userId]);
    const handleEventClick=(info)=>{
        setSelectedClass(info.event.extendedProps);
    };
    const handleClose = () => {
        setSelectedClass(null); // This will close the modal by unmounting ClassDetails
    };
    const triggerRefetch = () => {
        setRefetch(!refetch);
    };
    
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center">Class Schedule</h2>
            <div className="bg-white rounded-lg shadow-lg p-4 w-full">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={handleEventClick}
                    height="auto"
                />
            </div>
            {selectedClass && (
                <div className="modal-overlay">
                    <ClassDetails
                        classData={selectedClass}
                        onClose={handleClose}
                        triggerRefetch={triggerRefetch}
                    />
                </div>
            )}
        </div>
    );

};

export default CalendarView;