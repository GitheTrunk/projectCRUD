# projectCRUD

This is a full-stack CRUD application to manage a product. It uses:

- 📱 **Flutter + Provider** for the frontend UI
- ⚙️ **Node.js + Express** for the REST API
- 🗄️ **SQL Server** (running in Docker with Azura Data Studio) as the database

## 📁 Project Structure

Product_App/
          |
          |_____ backend/ Node and Express.js + SQL Server API
          |
          |_____ frontend/ Flutter with provider

## 🔧 Backend Setup

- cd backend
- npm install
- node index.js (to start the server and API will run on http://localhost:3000)

## 📱 Frontend Setup

Install Packages

- cd frontend
- flutter pub get
- flutter run

## 🎯 Features

- View all products with ListView
- Add new product via form
- Edit existing product
- Delete with confirmation
- Pull-to-refresh
- Loading indicators and error handling

