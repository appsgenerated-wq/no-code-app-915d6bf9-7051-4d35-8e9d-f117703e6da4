import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants';
import './index.css';
import { testBackendConnection } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(undefined); // undefined for loading state
  const [isLoading, setIsLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing');

  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        console.log('Checking for active session...');
        const loggedInUser = await manifest.from('User').me();
        if (loggedInUser) {
          console.log('User session found:', loggedInUser.email);
          setUser(loggedInUser);
          setCurrentScreen('dashboard');
        } else {
          console.log('No active session.');
          setUser(null);
        }
      } catch (error) {
        console.warn('Session check failed, user is not logged in:', error.message);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [])

  useEffect(() => {
    // Test backend connection on app start
    const testConnection = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
      }
    };
    
    testConnection();
  }, []);;

  const handleLogin = async (email, password) => {
    try {
      await manifest.login('User', email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      await manifest.logout();
      setUser(null);
      setCurrentScreen('landing');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${backendConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}
        </div>
      </div>
      
        <div className="text-lg font-medium text-gray-600">Loading Application...</div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <DashboardPage user={user} onLogout={handleLogout} manifest={manifest} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
