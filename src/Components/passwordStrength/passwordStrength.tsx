import { useEffect, useState } from 'react';
import './passwordStrengthStyles.scss';

interface PasswordStrengthProps {
  password: string;
  minStrength: number;
}

const PasswordStrengthIndicator = ({
  password,
  minStrength,
}: PasswordStrengthProps) => {
  const [strength, setStrength] = useState(0);

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    if (minStrength > 0) {
      const newStrength = evaluatePasswordStrength(password);
      setStrength(newStrength);
    }
  }, [minStrength, password]);

  const getStrengthClass = () => {
    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'strength-weak';
      case 3:
        return 'strength-medium';
      case 4:
      case 5:
        return 'strength-strong';
      default:
        return '';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 0:
      case 1:
        return 'very weak';
      case 2:
        return 'weak';
      case 3:
        return 'medium';
      case 4:
        return 'strong';
      case 5:
        return 'very strong';
      default:
        return '';
    }
  };
  return (
    <div className="indicator-container">
      {(minStrength > 0 || strength === 5) && (
        <>
          <div className="strength-container">
            <div id="strength-bar" className={getStrengthClass()}></div>
          </div>
          <p id="strength-text" className={`${getStrengthClass()}-text`}>
            Your password is {getStrengthText()}
          </p>
        </>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
