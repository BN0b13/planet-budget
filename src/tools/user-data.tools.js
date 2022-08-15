import { tokenName, api } from '../assets/config';

export const userData = async () => {
  try {
    const token = localStorage.getItem(tokenName);

    const res = await fetch(api, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        token,
        path: 'user-data',
       })
    });

    if(res.status === 200) {
      const data = await res.json();
      sessionStorage.setItem(tokenName, JSON.stringify(data.data));

      return {
      statusCode: 200,
      data: JSON.stringify(data.data),
    };
    } else {
      return {
        statusCode: 500
      }
    }
  } catch (err) {
    console.log('There was an error trying to fetch user data: ', err);
  }
}

export const updateUserData = async (data) => {
  try {
    const token = localStorage.getItem(tokenName);
    const res = await fetch(api, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        data,
        path: 'user-data',
       })
    });

    if(res.status === 200) {
      const updateUserDataRes = await res.json();
      return updateUserDataRes;
    } else {
      console.log('Failed to Update User: ', res);
      return {
        statusCode: 500
      }
    }
  } catch (err) {
    console.log('There was an error trying to add purchase: ', err);
  }
}

export const addPurchase = async (purchase) => {
  try {
    const token = localStorage.getItem(tokenName);
    const res = await fetch(api, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        purchase,
        path: 'purchases',
       })
    });

    if(res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log('Failed: ', res);
      return {
        statusCode: 500
      }
    }
  } catch (err) {
    console.log('There was an error trying to add purchase: ', err);
  }
}

export const editPurchase = async (purchase) => {
  try {
    const token = localStorage.getItem(tokenName);
    const res = await fetch(api, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        purchase,
        path: 'purchases',
       })
    });

    if(res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log('Failed: ', res);
      return {
        statusCode: 500
      }
    }
  } catch (err) {
    console.log('There was an error trying to add purchase: ', err);
  }
}

export const deletePurchase = async (id) => {
  try {
    const token = localStorage.getItem(tokenName);
    const res = await fetch(api, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        id,
        path: 'purchases',
       })
    });

    if(res.status === 200) {
      const data = await res.json();
      return data;
    } else {
      console.log('Failed: ', res);
      return {
        statusCode: 500
      }
    }
  } catch (err) {
    console.log('There was an error trying to add purchase: ', err);
  }
}