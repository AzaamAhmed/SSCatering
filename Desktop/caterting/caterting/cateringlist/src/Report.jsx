import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Report({ selectedItems }) {
    const [headCount, setHeadCount] = useState(1); // State variable for head count
    const [occasion, setOccasion] = useState('');
   
    

    // Calculate the total price for each category
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + parseFloat(item.price), 0) * headCount;
    };

    // Filter selected items for each category
    const selectedMainCourses = selectedItems.filter(item => item.item === 'main');
    const selectedDesserts = selectedItems.filter(item => item.item === 'dessert');
    const selectedBeverages = selectedItems.filter(item => item.item === 'bev');
    const selectedAppetizers = selectedItems.filter(item => item.item === 'ap');

    // Calculate total price for each category
    const totalMainCourses = calculateTotalPrice(selectedMainCourses);
    const totalDesserts = calculateTotalPrice(selectedDesserts);
    const totalBeverages = calculateTotalPrice(selectedBeverages);
    const totalAppetizers = calculateTotalPrice(selectedAppetizers);
    const total = totalAppetizers+totalBeverages+totalDesserts+totalMainCourses;



    const handleSave = () => {
        const reportData = {
            headCount: headCount,
            occasion: occasion,
            totalMainCourses: totalMainCourses,
            totalDesserts: totalDesserts,
            totalBeverages: totalBeverages,
            totalAppetizers: totalAppetizers,
            total: total,
        };

        axios.post('http://localhost:3001/save', reportData)
            .then(response => {
                console.log('Report saved successfully:', response.data);
                alert("Data saved succesfully!!");
                // Optionally, show a success message to the user
            })
            .catch(error => {
                console.error('Error saving report:', error);
                // Optionally, show an error message to the user
            });
    };





    return (

        <div>
            <div className="report-card">
            <div className="report-content">
            <div className="headcount-container">
            <h3 className="report-title">Generate Report</h3>
                <div className="input-field">
                    <label htmlFor="headCount1">Head Count:</label>
                    <input 
                        type="number" 
                        id="headCount1" 
                        name="headCount1" 
                        value={headCount} 
                        onChange={(e) => setHeadCount(parseInt(e.target.value))} 
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="headCount2">Occation :</label>
                    <input 
                                type="text" 
                                id="occasion" 
                                name="occasion" 
                                value={occasion} 
                                onChange={(e) => setOccasion(e.target.value)} 
                            />
                </div>
                
            </div>
            </div>
            </div>
            <br></br>
        <div className="report-card">
        <div className="report-content">
            <h3 className="report-title">E Report</h3>
         
            <div className="category-container">
                <p>Main Course Total: Rs . {totalMainCourses}</p>
                <p>Dessert Total: Rs . {totalDesserts}</p>
                <p>Beverage Total: Rs . {totalBeverages}</p>
                <p>Appetizer Total: Rs . {totalAppetizers}</p>
                <p>Total Cost: Rs . {total}</p>
            </div>
        </div>
    </div>
    <button style={{float:'right'}} onClick={handleSave}>Save</button>
    </div>
    );
}

export default Report;
