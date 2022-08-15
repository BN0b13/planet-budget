import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import './purchase-item-add.styles.scss';

class PurchaseItemAdd extends React.Component{
    constructor(props){
      super(props);
  
      this.state = {
        loading: false,
        purchaseName: '',
        amount: '',
        purchaseType: 'bill',
        errorVisible: false,
        errorMsg: 'Please fill in all fields to add purchase.',
      }
    }

    handleChange = e => {
        const { value, name } = e.target;
    
        this.setState({ [name]: value });
    }

    handleAdd = () => {
        if(this.state.purchaseName === '' || this.state.amount === '') {
            this.setState({ errorVisible: true });
            return
        }
        const purchase = {
            purchaseName: this.state.purchaseName,
            amount: this.state.amount,
            purchaseType: this.state.purchaseType,
        };

        this.props.newPurchase(purchase);
        this.setState({ loading: true });
    }



    render() {
        return (
            <div className={'single-item'}>
                <Form>
                    <Form.Label>Purchase: </Form.Label>
                    <Form.Control
                    name="purchaseName" 
                    type="text" 
                    value={this.state.purchaseName} 
                    onChange={this.handleChange}
                    required
                    ></Form.Control>
                    <Form.Label>Amount: </Form.Label>
                    <Form.Control
                    name="amount" 
                    type="text" 
                    value={this.state.amount} 
                    onChange={this.handleChange}
                    required
                    ></Form.Control>
                    <Form.Label>Type: </Form.Label>
                    <Form.Select
                    id="purchaseType" 
                    name="purchaseType"
                    value={this.state.purchaseType} 
                    onChange={this.handleChange}
                    >
                    <option value="bill">Bill</option>
                    <option value="expense">Expense</option>
                    <option value="fun">Fun</option>
                    </Form.Select>
                    { this.state.errorVisible && 
                        <Alert variant={'danger'} onClose={() => this.setState({ errorVisible: false })} dismissible>
                        {this.state.errorMsg}
                        </Alert>
                    }
                </Form>
                {this.state.loading ? 
                        <div className='spinnerDiv'>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    :
                    <div className='btnContainer'>
                        <Button className='addBtn' onClick={() => this.props.cancelAdd(true)}>Cancel</Button>
                        <Button className='addBtn' onClick={() => this.handleAdd()}>Save</Button>
                    </div>
                }
            </div>
        );
    }
};

export default PurchaseItemAdd;