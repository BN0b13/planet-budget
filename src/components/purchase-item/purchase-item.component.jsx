import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import './purchase-item.styles.scss';

const PurchaseItem = ({ id, name, amount, type, sendEditPurchase, sendDeletePurchase }) => {
    const [loading, setLoading] = useState(false);
    const [editState, setEditState] = useState(false);
    const [purchaseName, setPurchaseName] = useState(name);
    const [purchaseAmount, setPurchaseAmount] = useState(amount);
    const [purchaseType, setPurchaseType] = useState(type[0].toUpperCase() + type.substring(1));
    const [errMsg, setErrMsg] = useState('Please fill in all fields.');
    const [showErrMsg, setShowErrMsg] = useState(false);

    useEffect(() => {
        if(!editState) {
            setPurchaseName(name);
            setPurchaseAmount(amount);
            setPurchaseType(type[0].toUpperCase() + type.substring(1));
        }
    }, [editState]);

    const handleChange = e => {
        const { value, name } = e.target;

        switch(name) {
            case('name'):
                setPurchaseName(value);
                break;
            case('amount'):
                setPurchaseAmount(value);
                break;
            case('type'):
                setPurchaseType(value);
                break;
            default:
                console.log('There was an error updating value: ', value);
                break;
        }
    }

    const prepareEditSave = () => {
        if(purchaseName === '' ||
            purchaseAmount === '' ||
            purchaseType === '') {
            setShowErrMsg(true);
            return
        }
        const newPurchase = {
            id,
            purchaseName: purchaseName,
            amount: purchaseAmount,
            purchaseType: purchaseType
        };
        setEditState(false);
        sendEditPurchase(newPurchase);
    }

    const deletePurchase = (id) => {
        setLoading(true);
        sendDeletePurchase(id);
    }

    if(editState) {
        return (
            <div className='single-item'>
                <Form>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        name={'name'} 
                        value={purchaseName}
                        onChange={handleChange}
                    />
                    <Form.Label>Amount: </Form.Label>
                    <Form.Control
                        name={'amount'} 
                        value={purchaseAmount}
                        onChange={handleChange}
                    />
                    <Form.Label>Type: </Form.Label>
                    <Form.Select
                        name={'type'}
                        value={purchaseType}
                        onChange={handleChange}
                    >
                    <option value="bill">Bill</option>
                    <option value="expense">Expense</option>
                    <option value="fun">Fun</option>
                    </Form.Select>
                {showErrMsg && 
                            <Alert variant={'danger'} onClose={() => setShowErrMsg(false)} dismissible>
                                {errMsg}
                            </Alert>
                }
                </Form>
                {loading ? 
                    <div className='spinnerDiv'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                :
                    <div className='btnContainer'>
                        <Button className='editBtn' onClick={() => setEditState(!editState)}>Cancel</Button>
                        <Button className='editBtn' onClick={() => prepareEditSave()}>Save</Button>
                    </div>
                }
            </div>
        );
    }
    return (
        <>
            {loading ? 
                <div className='spinnerDiv'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            :
                <div className='single-item'>
                    <p className='purchaseTxt'>{purchaseType}: {purchaseName} ${purchaseAmount}</p>
                    <div className='purchaseItemBtnDiv'>
                        <Button className='purchaseItemBtn' onClick={() => setEditState(!editState)}>Edit</Button>
                        <Button className='purchaseItemBtn' onClick={() => deletePurchase(id)}>Delete</Button>
                    </div>
                </div>
            }
        </>
      );
};

export default PurchaseItem;