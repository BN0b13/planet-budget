import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import PurchaseItem from '../purchase-item/purchase-item.component';
import PurchaseItemAdd from '../purchase-item-add/purchase-item-add.component';
import { addPurchase, editPurchase, deletePurchase } from '../../tools/user-data.tools';
import './purchase-entry.styles.scss';

const PurchaseEntry = ( { data, setReloadUserData } ) => {
    const [addNewPurchase, setAddNewPurchase] = useState(false);

    const addPurchaseBtn = () => { setAddNewPurchase(true) }

    const cancelAdd = () => { setAddNewPurchase(false) }

    const newPurchase = async (purchase) => {
        try {
            await addPurchase(purchase);
            cancelAdd();
            setReloadUserData(true);
        } catch (err) {
            console.log('There was an error adding new purchase: ', err);
        }
    }

    const sendEditPurchase = async (purchase) => { 
        try {
            await editPurchase(purchase);
            setReloadUserData(true);
        } catch (err) {
            console.log(`Error updating ${purchase} : ${err}`);
        }
    }

    const sendDeletePurchase = async (id) => {
        try {
            await deletePurchase(id);
            setReloadUserData(true);
        } catch (err) {
            console.log(`Error deleting id ${id} : ${err}`);
        }
    }

    return (
        <div className='purchaseContent'>
            <h3>Purchases</h3>
            {!addNewPurchase ?
            <Button className='newEntryBtn' onClick={addPurchaseBtn}>Add</Button>
            : <PurchaseItemAdd cancelAdd={cancelAdd} newPurchase={newPurchase} />
            }
            {data.purchases.length > 0 &&
            data.purchases.map((purchase) => (
                <PurchaseItem 
                    key={purchase.id} 
                    id={purchase.id} 
                    name={purchase.purchaseName}
                    amount={purchase.amount}
                    type={purchase.purchaseType}
                    sendEditPurchase={sendEditPurchase}
                    sendDeletePurchase={sendDeletePurchase}
                />
            ))}
        </div>
      );
};

export default PurchaseEntry;