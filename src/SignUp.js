import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign.css';
import { AuthContext } from './AuthContext';

const SignUp = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [accountType, setAccountType] = useState('private');
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const validateForm = () => {
    const formData = new FormData(document.getElementById('signup-form'));
    const firstName = formData.get('firstName');
    const middleName = formData.get('middleName');
    const lastName = formData.get('lastName');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const age = formData.get('age');

    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = 'Please enter your first name';
    }
    if (!middleName) {
      newErrors.middleName = 'Please enter your middle name';
    }
    if (!lastName) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Please enter your phone number';
    }
    if (!email) {
      newErrors.email = 'Please enter your email';
    }
    if (!password) {
      newErrors.password = 'Please enter a password';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      newErrors.password =
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!age) {
      newErrors.age = 'Please enter your age';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const confirmPassword = formData.get('confirmPassword');

      signIn(email, password);
      setIsSignUpSuccessful(true);
      window.alert('You have successfully signed up!');
    }
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  if (isSignUpSuccessful) {
    return <div className="signup-container">You are successfully signed up!</div>;
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <div className="signup-form">
        <h2 className="signup-subtitle">Create an account</h2>
        <form id="signup-form" onSubmit={handleSignUp}>
          <div className="form-field">
            <label htmlFor="accountType">Account Type</label>
            <select
              id="accountType"
              name="accountType"
              value={accountType}
              onChange={handleAccountTypeChange}
            >
              <option value="private">Private</option>
              <option value="business">Business</option>
            </select>
          </div>

          {accountType === 'business' && (
            <div>
              <div className="form-field">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" />
              </div>
              <div className="form-field">
                <label htmlFor="companyAddress">Company Address</label>
                <input type="text" id="companyAddress" name="companyAddress" />
              </div>
            </div>
          )}

          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            {accountType === 'business' ? (
              <div className="name-input">
                <select id="title" name="title">
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
                <input type="text" id="firstName" name="firstName" />
              </div>
            ) : (
              <input type="text" id="firstName" name="firstName" />
            )}
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="middleName">Middle Name</label>
            <input type="text" id="middleName" name="middleName" />
            {errors.middleName && <span className="error">{errors.middleName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;




