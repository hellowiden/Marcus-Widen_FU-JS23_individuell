import React, { useState } from 'react';
import { create } from 'zustand';
import './Profile.css';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user: User) => set({ user }),
  logout: () => set({ user: null }),
}));

const Profile: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  const { user, login, logout } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      return;
    }
    const newUser: User = { email, name };
    login(newUser);
  };

  return (
    <>
          <div className='landingheaderU'></div>
    <div className="profile">
      {!user ? (
        <div className="signup-container">
          <div className="img-logo"></div>
          <div className="c-container">
            <h2>Välkommen till AirBean-familjen!</h2>
            <p>Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className='form-inner-container'>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='form-inner-container'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="gdpr-input">
              <input
                type="checkbox"
                id="gdpr-checkbox"
                name="gdpr-checkbox"
                required
              />
              <label htmlFor="gdpr-checkbox">GDPR Ok!</label>
            </div>
            <button type="submit">Brew me a cup!</button>
          </form>
        </div>
      ) : (
        <>
        <div className="profileContainer">
          <img src="../assets/Profileimg.svg" alt="Profile Image" className="profileImage" />
          <div className="userInfo">
            <h4 className="userName">{user.name}</h4>
            <p className="userEmail">{user.email}</p>
            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
        </div>
        </>
      )}
    </div>
    </>
  );
};

export default Profile;