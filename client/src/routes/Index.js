import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react'
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import JobApply from '../pages/JobApply';

const Index = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to={"/jobs"} replace/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path='/jobs' element={<Dashboard />}/>
          <Route path="/job-apply/:id" element={<ProtectedRoute />}>
            <Route path='/job-apply/:id' element={<JobApply />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default Index