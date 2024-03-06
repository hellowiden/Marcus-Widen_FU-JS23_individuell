import React from 'react';
import './CartButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useAppStore } from '../store';

interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

interface CartButtonProps {
  cart: CartItem[];
}

const CartButton: React.FC<CartButtonProps> = ({ cart }) => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const appStore = useAppStore()

  return (
    <div className="cart-button" onClick={ () => appStore.toggleOverlay() }>
      <FontAwesomeIcon icon={faShoppingBag} className="cart-icon" aria-label="Cart" />
      {totalItems > 0 && <div className="cart-counter">{totalItems}</div>}
    </div>
  );
};

export default CartButton;