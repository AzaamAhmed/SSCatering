import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Admin() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/reports')
      .then(result => setReports(result.data))
      .catch(err => console.error('Error fetching reports:', err));
  }, []);

  const generatePDF = () => {
    const filteredReports = reports.filter(report =>
      report.occasion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const doc = new jsPDF();

    // Set table headers and data
    const tableHeaders = ['Occasion', 'Head Count', 'Total Cost'];
    const tableRows = filteredReports.map(report => [report.occasion, report.headCount, report.total]);

    // Add title and date/time of PDF print
    const currentDate = new Date().toLocaleString();
    const title = 'Ordered Report ';

    // Set font size for the title
    doc.setFontSize(20);
    doc.text(title, 14, 20);

    // Set font size and position for date/time
    doc.setFontSize(10);
    doc.text(currentDate, doc.internal.pageSize.width - 50, 10, 'right');

    // Create table
    doc.autoTable({
      startY: 40, // Adjust Y position for the table
      head: [tableHeaders],
      body: tableRows,
      theme: 'grid', // Optional - 'striped', 'grid', 'plain'
      styles: {
        fontSize: 12,
        fontStyle: 'normal',
        textColor: [0, 0, 0],
        cellPadding: 4,
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
      },
      didDrawPage: () => {
        // Save the PDF with a specific name
        doc.save('Order_report.pdf');
      },
    });
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const filteredReports = reports.filter(report =>
    report.occasion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div> 
      <Navbar />
      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <h2>SS Wedding Hall</h2>
            <img src="../public/Buffet-Banner.jpg" className="fakeimg" style={{ height: '300px' }} alt="Food Image" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="leftcolumn">
          <div className="card">
            <h3>Generated Reports</h3>
            <input
              type="text"
              placeholder="Search by occasion..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <br />
            <table id="customers" ref={tableRef}>
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Head Count</th>
                  <th>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map(report => (
                  <tr key={report._id}>
                    <td>{report.occasion}</td>
                    <td>{report.headCount}</td>
                    <td>{report.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={generatePDF}>Download PDF</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
