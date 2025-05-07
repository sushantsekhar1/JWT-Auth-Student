// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [formData, setFormData] = useState({
//     name: '', email: '', course: '', address: '', mobile: '', dob: ''
//   });
//   const [students, setStudents] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [loginData, setLoginData] = useState({ username: '', password: '' });

//   useEffect(() => {
//     if (token) {
//       fetchStudents();
//     }
//   }, [token]);

//   const fetchStudents = async () => {
//     try {
//       const res = await fetch('http://localhost:3000/students', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       if (!res.ok) {
//         throw new Error('Unauthorized or failed to fetch students');
//       }

//       const data = await res.json();
//       console.log('Fetched students:', data);
//       setStudents(data);
//     } catch (err) {
//       console.error('Error fetching students:', err);
//     }
//   };

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = editId
//       ? `http://localhost:3000/students/${editId}`
//       : 'http://localhost:3000/students';
//     const method = editId ? 'PUT' : 'POST';

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         alert(editId ? 'Student updated successfully!' : 'Student added successfully!');
//         resetForm();
//         fetchStudents();
//       } else {
//         alert('Failed to submit student');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error');
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: '', email: '', course: '', address: '', mobile: '', dob: '' });
//     setEditId(null);
//   };

//   const handleEdit = (student) => {
//     setFormData({
//       name: student.name,
//       email: student.email,
//       course: student.course,
//       address: student.address,
//       mobile: student.mobile,
//       dob: student.dob,
//     });
//     setEditId(student.id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this student?')) return;
//     try {
//       const res = await fetch(`http://localhost:3000/students/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.ok) {
//         fetchStudents();
//         alert('Student deleted');
//       } else {
//         alert('Failed to delete student');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Hardcoded credentials for testing
//     const loginData = {
//       username: 'sushant',  // Hardcoded username
//       password: 'sekhar',  // Hardcoded password
//     };

//     try {
//       const res = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(loginData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         setToken(data.token);
//         alert('Login successful!');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error during login');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setToken('');
//   };

//   return (
//     <div className="App">
//       <h1>Student Registration System</h1>
//       {/* Conditionally render login page or student registration page */}
//       {!token ? (
//         <div className="login-container-flex" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//           <h2 style={{ marginBottom: '20px' }}>Login</h2>
//           <form onSubmit={handleLogin} className="form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={loginData.username}
//               onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
//               style={{ padding: '10px', width: '200px' }}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={loginData.password}
//               onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//               style={{ padding: '10px', width: '200px' }}
//             />
//             <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
//             <p>Login ID: sushant</p>
//             <p>Password: sekhar</p>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <h2>Student Registration</h2>
//           <form onSubmit={handleSubmit} className="form">
//             {['name', 'email', 'course', 'address', 'mobile', 'dob'].map((field) => (
//               <input
//                 key={field}
//                 name={field}
//                 type={field === 'email' ? 'email' : field === 'dob' ? 'date' : 'text'}
//                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 required
//               />
//             ))}
//             <button type="submit">{editId ? 'Update' : 'Submit'}</button>
//           </form>

//           <h3>Submitted Students</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th><th>Name</th><th>Email</th><th>Course</th>
//                 <th>Address</th><th>Mobile</th><th>DOB</th><th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s) => (
//                 <tr key={s.id}>
//                   <td>{s.id}</td>
//                   <td>{s.name}</td>
//                   <td>{s.email}</td>
//                   <td>{s.course}</td>
//                   <td>{s.address}</td>
//                   <td>{s.mobile}</td>
//                   <td>{s.dob}</td>
//                   <td>
//                     <button onClick={() => handleEdit(s)}>Edit</button>
//                     <button onClick={() => handleDelete(s.id)} className="delete-btn">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '', email: '', course: '', address: '', mobile: '', dob: ''
  });
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      fetchStudents();
    }
  }, [token]);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:3000/students', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed to fetch students');
      }

      const data = await res.json();
      console.log('Fetched students:', data);
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId
      ? `http://localhost:3000/students/${editId}`
      : 'http://localhost:3000/students';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(editId ? 'Student updated successfully!' : 'Student added successfully!');
        resetForm();
        fetchStudents();
      } else {
        alert('Failed to submit student');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', course: '', address: '', mobile: '', dob: '' });
    setEditId(null);
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      address: student.address,
      mobile: student.mobile,
      dob: student.dob,
    });
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(`http://localhost:3000/students/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchStudents();
        alert('Student deleted');
      } else {
        alert('Failed to delete student');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing
    const loginData = {
      username: 'sushant',  // Hardcoded username
      password: 'sekhar',  // Hardcoded password
    };

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setMessage('Login successful!');
        setLoginData({ username: '', password: '' });
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Server error during login');
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <div className="App">
      <h1>Student Registration System</h1>
      {!token ? (
        <div className="login-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Student Registration</h2>
          <form onSubmit={handleSubmit}>
            {['name', 'email', 'course', 'address', 'mobile', 'dob'].map((field) => (
              <input
                key={field}
                name={field}
                type={field === 'email' ? 'email' : field === 'dob' ? 'date' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ))}
            <button type="submit">{editId ? 'Update' : 'Submit'}</button>
          </form>

          <h3>Submitted Students</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Course</th>
                <th>Address</th><th>Mobile</th><th>DOB</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{s.address}</td>
                  <td>{s.mobile}</td>
                  <td>{s.dob}</td>
                  <td>
                    <button onClick={() => handleEdit(s)}>Edit</button>
                    <button onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;

