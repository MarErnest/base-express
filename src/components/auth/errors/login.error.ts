import { ValidationError } from 'class-validator';

const loginError = new ValidationError();
loginError.property = 'email';
loginError.constraints = {
  'isLoginValid': 'Login failed.'
};

export default loginError;
