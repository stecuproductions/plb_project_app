import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

/**
 * Button component with multiple variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button style variant (primary, secondary, outline, text, danger)
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.label] - Button text
 * @param {Function} props.onPress - Button press handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {string} [props.leftIcon] - Ionicons name for left icon
 * @param {string} [props.rightIcon] - Ionicons name for right icon
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 * @param {string} [props.className] - Additional custom classes
 */
export function Button({
  variant = 'primary',
  size = 'md',
  label,
  onPress,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
}) {
  // Base styles
  const baseStyles = 'rounded-lg font-medium flex-row items-center justify-center';
  
  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  };

  // Text size variations
  const textSizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Icon size variations
  const iconSizes = {
    sm: 16, 
    md: 20,
    lg: 24,
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-500 active:bg-secondary-600',
    outline: 'border border-primary-600 bg-transparent active:bg-primary-50',
    text: 'bg-transparent active:bg-primary-50',
    danger: 'bg-danger-500 active:bg-danger-600',
  };

  // Text color based on variant
  const textColors = {
    primary: 'text-surface',
    secondary: 'text-surface',
    outline: 'text-primary-600',
    text: 'text-primary-600',
    danger: 'text-surface',
  };

  // Icon color based on variant
  const iconColors = {
    primary: '#ffffff', // surface
    secondary: '#ffffff', // surface
    outline: '#4f46e5', // primary-600
    text: '#4f46e5', // primary-600
    danger: '#ffffff', // surface
  };

  // Disabled styles
  const disabledStyles = 'opacity-50';

  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Compose button style
  const buttonStyle = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled || isLoading ? disabledStyles : ''} ${widthStyle} ${className}`;

  // Compose text style
  const textStyle = `${textSizeStyles[size]} ${textColors[variant]} font-semibold`;

  // Icon spacing
  const iconSpacing = {
    sm: 'mr-1',
    md: 'mr-2',
    lg: 'mr-2',
  };

  const rightIconSpacing = {
    sm: 'ml-1',
    md: 'ml-2',
    lg: 'ml-2',
  };

  return (
    <Pressable 
      className={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      android_ripple={{ 
        color: variant === 'outline' || variant === 'text' 
          ? 'rgba(79, 70, 229, 0.2)' // primary-600 with opacity
          : 'rgba(255, 255, 255, 0.2)' // surface with opacity
      }}
    >
      {isLoading && (
        <ActivityIndicator 
          size="small" 
          color={iconColors[variant]} 
          className={iconSpacing[size]} 
        />
      )}
      
      {!isLoading && leftIcon && (
        <Ionicons 
          name={leftIcon} 
          size={iconSizes[size]} 
          color={iconColors[variant]} 
          className={iconSpacing[size]} 
        />
      )}
      
      {label && <Text className={textStyle}>{label}</Text>}
      
      {!isLoading && rightIcon && (
        <Ionicons 
          name={rightIcon} 
          size={iconSizes[size]} 
          color={iconColors[variant]} 
          className={rightIconSpacing[size]} 
        />
      )}
    </Pressable>
  );
}

/**
 * Icon button component
 * @param {Object} props - Component props
 * @param {string} props.icon - Ionicons name
 * @param {string} [props.variant='primary'] - Button style variant
 * @param {string} [props.size='md'] - Button size
 * @param {Function} props.onPress - Button press handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {string} [props.className] - Additional custom classes
 */
export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  isLoading = false,
  className = '',
}) {
  // Base styles
  const baseStyles = 'rounded-full flex justify-center items-center';
  
  // Size variations
  const sizeStyles = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  // Icon size variations
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-500 active:bg-secondary-600',
    outline: 'border border-primary-600 bg-transparent active:bg-primary-50',
    text: 'bg-transparent active:bg-primary-50',
    danger: 'bg-danger-500 active:bg-danger-600',
  };

  // Icon color based on variant
  const iconColors = {
    primary: '#ffffff', // surface
    secondary: '#ffffff', // surface
    outline: '#4f46e5', // primary-600
    text: '#4f46e5', // primary-600
    danger: '#ffffff', // surface
  };

  // Disabled styles
  const disabledStyles = 'opacity-50';

  // Compose button style
  const buttonStyle = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled || isLoading ? disabledStyles : ''} ${className}`;

  return (
    <Pressable 
      className={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      android_ripple={{ 
        color: variant === 'outline' || variant === 'text' 
          ? 'rgba(79, 70, 229, 0.2)'  // primary-600 with opacity
          : 'rgba(255, 255, 255, 0.2)' // surface with opacity
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColors[variant]} />
      ) : (
        <Ionicons name={icon} size={iconSizes[size]} color={iconColors[variant]} />
      )}
    </Pressable>
  );
}

/**
 * Floating Action Button (FAB) component
 * @param {Object} props - Component props
 * @param {string} props.icon - Ionicons name
 * @param {Function} props.onPress - Button press handler
 * @param {string} [props.position='bottom-right'] - Position of the FAB
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className] - Additional custom classes
 */
export function FloatingActionButton({
  icon,
  onPress,
  position = 'bottom-right',
  disabled = false,
  className = '',
}) {
  // Position styles
  const positionStyles = {
    'bottom-right': 'absolute bottom-6 right-6',
    'bottom-left': 'absolute bottom-6 left-6',
    'top-right': 'absolute top-6 right-6',
    'top-left': 'absolute top-6 left-6',
  };

  return (
    <Pressable
      className={`w-14 h-14 rounded-full bg-primary-600 shadow-lg justify-center items-center ${positionStyles[position]} ${disabled ? 'opacity-50' : ''} active:scale-95 active:bg-primary-700 ${className}`}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: true }}
    >
      <Ionicons name={icon} size={28} color="white" />
    </Pressable>
  );
}

/**
 * Social media button component
 * @param {Object} props - Component props
 * @param {string} props.provider - Social media provider (google, facebook, apple, twitter)
 * @param {Function} props.onPress - Button press handler
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 */
export function SocialButton({ provider, onPress, fullWidth = false }) {
  // Provider configurations
  const providerConfig = {
    google: {
      icon: 'logo-google',
      label: 'Continue with Google',
      bgColor: 'bg-surface border border-neutral-100',
      textColor: 'text-neutral-800',
      iconColor: '#EA4335',
    },
    facebook: {
      icon: 'logo-facebook',
      label: 'Continue with Facebook',
      bgColor: 'bg-[#1877F2]',
      textColor: 'text-surface',
      iconColor: 'white',
    },
    apple: {
      icon: 'logo-apple',
      label: 'Continue with Apple',
      bgColor: 'bg-black',
      textColor: 'text-surface',
      iconColor: 'white',
    },
    twitter: {
      icon: 'logo-twitter',
      label: 'Continue with Twitter',
      bgColor: 'bg-[#1DA1F2]',
      textColor: 'text-surface',
      iconColor: 'white',
    },
  };

  const { icon, label, bgColor, textColor, iconColor } = providerConfig[provider];

  return (
    <Pressable
      className={`flex-row items-center justify-center px-4 py-3 rounded-lg ${bgColor} active:opacity-90 ${fullWidth ? 'w-full' : ''}`}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      <Ionicons name={icon} size={20} color={iconColor} />
      <Text className={`${textColor} font-semibold text-base ml-3`}>{label}</Text>
    </Pressable>
  );
}

/**
 * Pill button component
 * @param {Object} props - Component props
 * @param {string} props.label - Button text
 * @param {Function} props.onPress - Button press handler
 * @param {boolean} [props.selected=false] - Whether the pill is selected
 * @param {string} [props.className] - Additional custom classes
 */
export function PillButton({ label, onPress, selected = false, className = '' }) {
  return (
    <Pressable
      className={`px-4 py-2 rounded-full ${selected ? 'bg-primary-600' : 'bg-neutral-100'} active:opacity-80 ${className}`}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
    >
      <Text className={`font-medium text-sm ${selected ? 'text-surface' : 'text-neutral-800'}`}>{label}</Text>
    </Pressable>
  );
}