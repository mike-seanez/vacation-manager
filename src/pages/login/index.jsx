import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { cn } from '../../utils/cn';
import { useAuth } from '../../domain/UseCases/authCases/useAuth';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, loadingAuth, logout } = useAuth();

    useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  const checkAuth = () => {
    if (isAuthenticated) {
      navigate("/employee-vacation-portal");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      setTimeout(async () => {
        await login(formData.email, formData.password);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: 'Credenciales inválidas. Por favor intente de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-elevation-2 border border-border">
        <div className="flex flex-col items-center justify-center">
          {/* App Logo */}
          <div className="w-25 h-25 rounded-full flex items-center justify-center mb-4">
            <Image
              className="w-25 h-auto"
              src="/public/assets/images/logo.png"
              alt="logo"
            />
          </div>
          <p className="text-muted-foreground mt-2 text-center">Inicie sesión para acceder al sistema</p>
        </div>

        {errors.form && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email empleado"
            type="text"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="Ingrese su correo electrónico"
            required
          />

          <div className="space-y-2">
            <label
              htmlFor="password-input"
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                errors.password ? "text-destructive" : "text-foreground"
              )}
            >
              Contraseña<span className="text-destructive ml-1">*</span>
            </label>
            
            <div className="relative">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Ingrese su contraseña"
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  errors.password && "border-destructive focus-visible:ring-destructive"
                )}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>
            
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;