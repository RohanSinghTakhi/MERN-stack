import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.email || !user.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/api/Loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess("Login successful!");
      console.log(result);

      // Navigate to another page after successful login
      navigate("/"); // replace with the desired route
    } catch (error) {
      setError("Error logging in: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      {/* Display error or success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
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
          <small id="emailHelp" className="form-text text-muted">
            We never share your email with anyone else.
          </small>
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Submit
        </button>

        {/* Link to Signup */}
        <Link to="/Signup" className="m-3 btn btn-danger">
          New user
        </Link>
      </form>
    </div>
  );
}

export default Login;
