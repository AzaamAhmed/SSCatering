import React, { useEffect } from 'react';
import Create from './Create';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Report from './Report';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'

function Home() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();
    const [showReport, setShowReport] = useState(false);
    

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setItems(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        // Implement delete logic here
        console.log('Delete item with id:', id);
    };
    const handleCheckboxChange = (item) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.find(selectedItem => selectedItem._id === item._id)) {
                return prevSelectedItems.filter(selectedItem => selectedItem._id !== item._id);
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };
    

    const handleSaveSelectedItems = () => {
        // Send selected items to the database
        console.log('Selected items:', selectedItems);
        
        setShowReport(true);


        // Example: Axios post request to send selectedItems to the backend
        // axios.post('http://localhost:3001/saveSelectedItems', { selectedItems })
        //     .then(response => {
        //         console.log('Selected items saved successfully:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error saving selected items:', error);
        //     });
    };


    const handleGoBack = () => {
        setShowReport(false);
    };
    

    return (
        <div>
            <Navbar/>

        <div className="row">
            <div className="leftcolumn">
                <div className="card">
                    <h2>SS Weding Hall</h2>
                    <img src='../public/Buffet-Banner.jpg' className="fakeimg" style={{ height: '300px' }} alt="Food Image" />
                </div>
            </div>
        </div>
        {showReport ? (
              <div>
                <br></br>
                <br></br>
              <Report selectedItems={selectedItems} />
              <button onClick={handleGoBack}>Go Back</button>
          </div>
        ) : (
        <div>
        <h3 style={{textAlign:'center'}}>Main Courses</h3>
        <div className="card-container">


        {items.filter(item => item.item === 'main').map(item => (
        <div key={item._id} className="card2" style={{width:'200px'}}>
            <img src='../public/food.jpg'/>
            <h2>{item.name}</h2>
            <h5>{item.price}</h5>
            <p>{item.description}</p>
            <input type='checkbox'
            onChange={() => handleCheckboxChange(item)}
            checked={selectedItems.find(selectedItem => selectedItem._id === item._id)}
        />
        </div>
        ))
        }
        </div>
        <br></br>
        <h3 style={{textAlign:'center'}}>Desserts</h3>
        <div className="card-container">


        {items.filter(item => item.item === 'dessert').map(item => (
        <div key={item._id} className="card2" style={{width:'200px'}}>
            <img src='../public/dessert.jpg'/>
            <h2>{item.name}</h2>
            <h5>{item.price}</h5>
            <p>{item.description}</p>
            <input type='checkbox'
            onChange={() => handleCheckboxChange(item)}
            checked={selectedItems.find(selectedItem => selectedItem._id === item._id)}
        />
        </div>
        ))
        }
        </div>
        <br></br>
        <h3 style={{textAlign:'center'}}>Beverages</h3>
        <div className="card-container">


        {items.filter(item => item.item === 'bev').map(item => (
        <div key={item._id} className="card2" style={{width:'200px'}}>
            <img src='../public/bev.jpg'/>
            <h2>{item.name}</h2>
            <h5>{item.price}</h5>
            <p>{item.description}</p>
            <input type='checkbox'
            onChange={() => handleCheckboxChange(item)}
            checked={selectedItems.find(selectedItem => selectedItem._id === item._id)}
        />
        </div>
        ))
        }
        </div>
        <br></br>
        <h3 style={{textAlign:'center'}}>Appetizers</h3>
        <div className="card-container">


        {items.filter(item => item.item === 'ap').map(item => (
        <div key={item._id} className="card2" style={{width:'200px'}}>
            <img src='../public/ap.jpg'/>
            <h2>{item.name}</h2>
            <h5>{item.price}</h5>
            <p>{item.description}</p>
            <input type='checkbox'
            onChange={() => handleCheckboxChange(item)}
            checked={selectedItems.find(selectedItem => selectedItem._id === item._id)}
        />
        </div>
        ))
        }
        </div>


        <button onClick={handleSaveSelectedItems} style={{float:'right'}}>Generate Report</button>
        <br></br>
        </div>

        )}
        <Footer/>
        
    </div>
    );
}

export default Home;
