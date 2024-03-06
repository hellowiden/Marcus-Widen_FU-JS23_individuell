import React, { useState } from 'react';
import './OverlayShoppingList.css';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';

interface MenuItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface OverlayShoppingListProps {
  cart: MenuItem[];
  onEmpty: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const OverlayShoppingList: React.FC<OverlayShoppingListProps> = ({ cart, onEmpty, onIncrement, onDecrement }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const appStore = useAppStore()

  const calculateTotal = () => {
    return cart.reduce((acc: number, item) => acc + item.price * item.quantity, 0);
  };

  const handleTakeMyMoneyClick = async () => {
    setLoading(true);
    try {
      const order = [];

      for (const item of cart) {
        for (let i = 0; i < item.quantity; i++) {
          order.push({
            name: item.title,
            price: item.price,
          });
        }
      }

      const payload = {
        "details": {
          "order": order
        }
      }

      const response = await fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order", {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const body = await response.json();

      appStore.hideOverlay();
      onEmpty();

      navigate(`/status`, {
        state: {
          orderNr: body.orderNr,
          eta: body.eta
        }
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={() => appStore.hideOverlay() }>×</button>
        <h2>Din beställning</h2>
        <ul>
          {cart.map(({ id, title, price, quantity }: MenuItem) => (
            <li key={id} className="overlay-item">
              <div className="menuItem">
                <div className='menuitems-inner'>
                  <span className="item-name">{title}</span>
                  <span className="item-price">{price} kr</span>
                </div>
                <div className="incrementItem">
                  <button onClick={() => onIncrement(id)}>+</button>
                  <span>{quantity}</span>
                  <button onClick={() => onDecrement(id)}>-</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='totalandtax-container'>
          <div className="total">
            <strong>Total:</strong> <span className="total-amount">{calculateTotal()} kr</span>
          </div>
          <div className='tax'>
            <p>inkl moms + drönarleverans</p>
          </div>
        </div>
        <button className='takemymoney' onClick={handleTakeMyMoneyClick} disabled={cart.length === 0 || loading}>Take my money!</button>
        {loading && <p className="loading-text">Loading...</p>}
      </div>
    </div>
  );
};

export default OverlayShoppingList;