import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../domain/UseCases/authCases/useAuth';

const NavigationHeader = ({ onMenuToggle, user = null }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOptionsMenuOpen, setMoreOptionsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100 shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden mr-2"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <Link to="/administrator-dashboard" className="flex items-center space-x-3">
            <div className="w-22 h-10 rounded-lg flex items-center justify-center">
              <img
                className="w-20 h-auto"
                src="/public/assets/images/logo.png"
                alt="logo"
              />
            </div>
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="relative"
            iconName="Bell"
            iconSize={20}
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button> */}

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block text-sm font-medium text-foreground">
                {user?.full_name || 'Usuario'}
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-2 z-400">
                {/* <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || 'admin@vacablog.com'}
                  </p>
                </div> */}
                <div className="py-1">
                  {/* <button
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} className="inline mr-2" />
                    Profile Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} className="inline mr-2" />
                    Preferences
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Icon name="HelpCircle" size={16} className="inline mr-2" />
                    Help & Support
                  </button> */}
                  <div className="mt-1 pt-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                      onClick={handleLogout}
                    >
                      <Icon name="LogOut" size={16} className="inline mr-2" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;