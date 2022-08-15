import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { updateUserData } from '../../tools/user-data.tools';
import incomeCalculator from '../../tools/income-calculator.tools';
import './home-profile.styles.scss';

const HomeProfile = ({ data, setReloadUserData, darkMode, setDarkMode }) => {
    const[loading, setLoading] = useState(false);
    const { username = null } = data;
    const [email, setEmail] = useState(data.email);
    const [income, setIncome] = useState(data.profile.income);
    const [compensationType, setCompensationType] = useState(data.profile.compensationType);
    const [compensationRate, setCompensationRate] = useState(data.profile.compensationRate);
    const [openMsg, setOpenMsg] = useState(false);
    const [msgTxt, setMsgTxt] = useState('Please fill all fields to update.');
    const [msgColor, setMessageColor] = useState('danger');
    const { payPeriod } = incomeCalculator(data.profile);

    const handleChange = (e) => {
        const { value, name } = e.target;

        switch(name) {
            case('email'):
                setEmail(value);
                break;
            case('income'):
                setIncome(value);
                break;
            case('compensationType'):
                setCompensationType(value);
                break;
            case('compensationRate'):
                setCompensationRate(value);
                break;
            default:
                break;
        }
    }

    const updateProfile = async () => {
        if(income === '' ||
        email === '') {
            setMsgTxt('Please fill all fields to update.');
            setMessageColor('danger');
            setOpenMsg(true);
            return
        }
        setLoading(true);

        const newUserData = {
            email,
            income,
            compensationRate,
            compensationType,
            darkMode
        }

        await updateUserData(newUserData);
        setReloadUserData(true);
        setLoading(false);
        setMsgTxt('Profile has been updated.');
        setMessageColor('success');
        setOpenMsg(true);
    }
    
    return (
        <div className='profile-content'>
            <div className='profile-text'>
                <h1>{username}'s Profile</h1>
                <p>You make {income}, {compensationType}. You are paid {compensationRate}. Very nice!</p>
                <p>Per pay period that is {payPeriod}. Let's budget that!</p>
            </div>

            <Form className='profile-form'>
                <Form.Label>Email: 
                    <Form.Control 
                    className='profile-form-input'
                    name="email" 
                    type="text" 
                    value={email} 
                    onChange={handleChange}
                    required />
                </Form.Label>
                <Form.Label className={'input'}>Income: 
                    <Form.Control 
                    className='profile-form-input'
                    name="income" 
                    type="text" 
                    value={income} 
                    onChange={handleChange}
                    required />
                </Form.Label>
                <Form.Label>Compensation Type:
                    <Form.Select
                    className='profile-form-input'
                    id="compensationType" 
                    name="compensationType"
                    value={compensationType} 
                    onChange={handleChange}
                    >
                    <option value="hourly">Hourly</option>
                    <option value="annually">Annually</option>
                    </Form.Select>
                </Form.Label>
                <Form.Label>Compensation Rate:
                    <Form.Select 
                    className='profile-form-input'
                    id="compensationRate" 
                    name="compensationRate"
                    value={compensationRate} 
                    onChange={handleChange}
                    >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                        <option value="bimonthly">Bimonthly</option>
                        <option value="monthly">Monthly</option>
                    </Form.Select>
                </Form.Label>
                <Form.Check
                    className='profile-form-input' 
                    type="switch"
                    id="darkModeSwitch"
                    label="Dark Mode"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                />
                {openMsg && 
                <Alert variant={msgColor} onClose={() => setOpenMsg(false)} dismissible>
                    {msgTxt}
                </Alert>
                }
                {loading ? 
                    <div className='spinnerDiv'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                :
                    <Button
                        className='profile-form-input'
                        onClick={() => updateProfile()}
                    >
                        Update Profile
                    </Button>
                }
            </Form>
        </div>
      )
};

export default HomeProfile;