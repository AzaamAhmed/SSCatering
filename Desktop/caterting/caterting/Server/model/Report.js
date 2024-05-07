const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    headCount: String,
    occasion: String,
    totalMainCourses: String,
    totalDesserts: String,
    totalBeverages: String,
    totalAppetizers: String,
    total: String
});

const ReportModel = mongoose.model('Report', ReportSchema); // Pass 'User' as the model name
module.exports = ReportModel;
