import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import ReCAPTCHA from "react-google-recaptcha";

import { tokenName, api, recaptchaSiteKey } from '../../assets/config';
import { recaptchaCheck } from '../../tools/recaptcha.tools';
import './sign-up-form.styles.scss';

class SignUpForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      username: '',
      password: '',
      email: '',
      income: '',
      compensationType: 'hourly',
      compensationRate: 'weekly',
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

  handleSignUp = async (e) => {
    e.preventDefault();

    const checkFields = this.checkFields();
    if(!checkFields){
      this.setState({
        errorVisible: true,
        errorMsg: 'Please fill out all fields.',
      });
      return
    }

    this.setState({ loading: true });
    
    try {
      const signUp = await fetch(api, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          email: this.state.email,
          profile: {
            income: this.state.income,
            compensationType: this.state.compensationType,
            compensationRate: this.state.compensationRate,
          },
          purchases: [],
          debt: [],
          path: 'sign-up',
        }) // body data type must match "Content-Type" header
      });

      const res = await signUp.json();

      if(signUp.status !== 200) {
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
      <Card className='sign-up-form-content'>
        <Card.Body>
        <Card.Title className='sign-up-form-title'>Sign Up</Card.Title>

        <Form className='sign-up-form'>
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
          <Form.Label className={'input'}>Email: 
            <Form.Control 
            name="email" 
            type="text" 
            value={this.state.email} 
            onChange={this.handleChange}
            required />
          </Form.Label>
          <Form.Label className={'input'}>Income: 
            <Form.Control 
            name="income" 
            type="text" 
            value={this.state.income} 
            onChange={this.handleChange}
            required />
          </Form.Label>
          <Form.Label>Compensation Type:</Form.Label>
            <Form.Select 
            id="compensationType" 
            name="compensationType"
            value={this.state.compensationType} 
            onChange={this.handleChange}
            >
              <option value="hourly">Hourly</option>
              <option value="annually">Annually</option>
            </Form.Select>
          <Form.Label>Compensation Rate:</Form.Label>
          <Form.Select 
          id="compensationRate" 
          name="compensationRate"
          value={this.state.compensationRate} 
          onChange={this.handleChange}
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="bimonthly">Bimonthly</option>
            <option value="monthly">Monthly</option>
          </Form.Select>
          <ReCAPTCHA
            className='recaptcha'
            sitekey={recaptchaSiteKey}
            onChange={this.recaptchaCheck}
          />
          { this.state.errorVisible && 
          <Alert variant={'danger'} onClose={() => this.setState({ errorVisible: false })} dismissible>
            {this.state.errorMsg}
          </Alert>
          }
          <div className={'inlineBtn'}>
            <Button className={'btn'} onClick={this.props.signUp}>Cancel</Button>
            <Button className={'btn'} onClick={this.handleSignUp}>Sign Up</Button>
          </div>
        </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default SignUpForm;