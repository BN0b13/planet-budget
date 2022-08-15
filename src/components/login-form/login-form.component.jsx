import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import ReCAPTCHA from "react-google-recaptcha";

import { tokenName, api, recaptchaSiteKey } from '../../assets/config';
import { recaptchaCheck } from '../../tools/recaptcha.tools';
import logo from '../../assets/img/logo.png';
import './login-form.styles.scss';

class LoginForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      username: '',
      password: '',
      errorVisible: false,
      errorMsg: 'There was an error. Please try again.',
      recaptcha: false,
    }
  }

  handleChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  }

  checkFields = () => {
    if(this.state.username.length > 0 && this.state.password.length > 0 && this.state.recaptcha) {
      return true
    }
    return false
  }

  recaptchaCheck = async (recaptcha) => {
    const res = await recaptchaCheck(recaptcha);
    if(res) { this.setState({ recaptcha: true })}
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields){
      console.log('Submit recaptcha', this.state.recaptcha)
      this.setState({
        errorVisible: true,
        errorMsg: 'Please complete all fields and complete ReCAPTCHA validation.',
      });
      return
    }

    this.setState({ loading: true });

    try {
      const login = await fetch(api, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, same-origin
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          path: 'login',
        })
      });
      
      const res = await login.json();
      
      if(login.status !== 200) {
        this.setState({ 
          loading: false,
          errorVisible: true,
          errorMsg: res.message,
        });
        return
      }

      if(res && res.token) {
        localStorage.setItem(tokenName, res.token);
        sessionStorage.setItem(tokenName, JSON.stringify(res.data));
        window.location = '/';
      }

    } catch (err) {
      this.setState({ 
        loading: false,
        errorVisible: true,
        errorMsg: 'There was an error. Please try again.',
      });
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <div className='spinnerDiv'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )
    }

    return(
      <div className='login-form-content'>
        <img src={logo} className='logo' />

        <Form className='login-form'>
          <Form.Label className={'input'}>Username: 
            <Form.Control 
            name="username" 
            type="text" 
            value={this.state.username} 
            onChange={this.handleChange}
            required />
          </Form.Label>
          <Form.Label className={'input'}>Password: 
            <Form.Control 
            name="password" 
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange}
            required />
          </Form.Label>
          <ReCAPTCHA
            sitekey={recaptchaSiteKey}
            onChange={this.recaptchaCheck}
          />
          { this.state.errorVisible && 
            <Alert variant={'danger'} onClose={() => this.setState({ errorVisible: false })} dismissible>
              {this.state.errorMsg}
            </Alert>
          }
          <div className={'inlineBtn'}>
            <Button className={'btn'} onClick={this.props.signUp}>Sign Up</Button>
            <Button className={'btn'} onClick={this.handleSubmit}>Login</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginForm;