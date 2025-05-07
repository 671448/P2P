import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Navbar from '../components/Navbar';
import '../css/RegisterPage.css';
import { User } from '../Interfaces/IUser';
import { Errors } from '../Interfaces/IErrors';

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const [User, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({
      ...User,
      [name]: value,
    });

    // Clear the error for this field when user starts typing again
    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    // Validate first name
    if (!User.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Validate last name
    if (!User.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Validate email
    if (!User.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(User.email)) {
      newErrors.email = 'Email address is invalid';
    }

    // Validate email confirmation
    if (User.email !== User.emailConfirm) {
      newErrors.emailConfirm = 'Emails do not match';
    }

    // Validate password
    if (!User.password) {
      newErrors.password = 'Password is required';
    } else if (User.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Validate password confirmation
    if (User.password !== User.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to your API endpoint with createdAt field
      const response = await fetch('http://localhost:5215/api/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: User.firstName,
          lastName: User.lastName,
          email: User.email,
          password: User.password,
          createdAt: new Date().toISOString(), // Add current date/time
        }),
      });

      if (response.ok) {
        // Registration successful, redirect to login or dashboard
        alert('Registration successful!');
        navigate('/login');
      } else {
        // Handle error response
        const errorData = await response.json();
        setErrors({
          server:
            typeof errorData === 'string' ? errorData : 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ server: 'Connection error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="form-container">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
        {errors.server && (
          <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.server}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className={`border rounded-lg p-2 w-full ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              value={User.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className={`border rounded-lg p-2 w-full ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              value={User.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`border rounded-lg p-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              value={User.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="email"
              name="emailConfirm"
              placeholder="Repeat email"
              className={`border rounded-lg p-2 w-full ${errors.emailConfirm ? 'border-red-500' : 'border-gray-300'}`}
              value={User.emailConfirm}
              onChange={handleChange}
            />
            {errors.emailConfirm && (
              <p className="text-red-500 text-sm mt-1">{errors.emailConfirm}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`border rounded-lg p-2 w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              value={User.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Repeat password"
              className={`border rounded-lg p-2 w-full ${errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'}`}
              value={User.passwordConfirm}
              onChange={handleChange}
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">{errors.passwordConfirm}</p>
            )}
          </div>

          <button
            type="submit"
            className="register-button alt w-full py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
