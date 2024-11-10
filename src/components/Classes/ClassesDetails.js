import React from 'react';
import { singUpInClass,singOutFromClass } from '../../services/classesService'; 
import { getUserId} from '../../services/authService';

const ClassDetails = ({ classData ,onClose,triggerRefetch}) => {
    const userId = getUserId();
    async function handleSingUp() {
        try {
            await singUpInClass(classData._id);
            // TODO: Add Toast
            alert("Singed up for classes!");
            triggerRefetch();
            onClose();
        } catch (error) {
            console.error(error);
            // TODO: Add Toast
            alert('Error signing up for class');
        }
    }

    const handleSingOut=async () => {
        try{
            await singOutFromClass(classData._id);
            // TODO: Add Toast
            alert("Singed out from classes!")
            triggerRefetch();
            onClose();
        }catch(error){
            console.error(error);
            // TODO: Add Toast
            alert('Class sing out error.');
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">
                &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4">{classData.name}</h3>
            <p><strong>Coach:</strong> {classData.coach}</p>
            <p><strong>Location:</strong> {classData.location}</p>
            <p><strong>Available Seats:</strong> {classData.seats - classData.participants.length}</p>
            <p><strong>Start Date:</strong> {new Date(classData.start_date).toLocaleString()}</p>
            <p><strong>End Date:</strong> {new Date(classData.end_date).toLocaleString()}</p>
            <div className="flex justify-center mt-6">
                <button onClick={classData.participants.includes(userId) ? handleSingOut : handleSingUp} 
                        className={`${classData.participants.includes(userId) ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded-md`}>
                    {classData.participants.includes(userId) ? 'Sign Out' : 'Sign In'}
                </button>
            </div>
        </div>
    </div>
    );
};

export default ClassDetails;