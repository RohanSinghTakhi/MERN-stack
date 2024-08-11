import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    geolocations: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.name || !user.email || !user.password || !user.geolocations) {
      setError('Please fill in all fields.');
      return;
    }

    setError(null); // Reset any previous errors
    setSuccess(null); // Reset any previous success messages

    try {
      // Send data to the backend
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          location: user.geolocations // Ensure this field matches backend schema
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess('User created successfully!');
      console.log(result);
    } catch (error) {
      setError('Error creating user: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group m-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        
        {/* Email Input */}
        <div className="form-group m-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">We never share your email with anyone else.</small>
        </div>
        
        {/* Password Input */}
        <div className="form-group m-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        
        {/* Geolocations Input */}
        <div className="form-group m-2">
          <label htmlFor="geolocations">Geolocations</label>
          <input
            type="text"
            className="form-control"
            name="geolocations"
            id="geolocations"
            placeholder="Enter your location"
            value={user.geolocations}
            onChange={handleChange}
          />
        </div>
        
        {/* Submit Button */}
        <button type="submit" className="btn btn-success">Submit</button>
        
        {/* Link to Login */}
        <Link to="/Login" className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
  );
}

export default Signup;
