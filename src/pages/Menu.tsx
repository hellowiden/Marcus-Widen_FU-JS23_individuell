import React, { useEffect, useState } from 'react';
import './Menu.css';
import AddToCart from '../components/AddToCart';

interface MenuItem {
  id: string;
  title: string;
  price: number;
  desc: string;
}

interface MenuProps {
  addToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ addToCart }) => {

  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("https://airbean-api-xjlcn.ondigitalocean.app/api/beans/")
      .then((res) => res.json())
      .then((res) => setItems(res.menu));
  }, []);

  return (
    <>
    
  <div className='landingheaderU'></div>
  <div className="menu-container">
    <h1>Meny</h1>
    <ul className="menu-list">
      {items.map((item) => (
        <li className="menu-item" key={item.id}>
          <div className='add-group'>
            <AddToCart item={item} addToCart={() => addToCart(item)} />
          </div>
          <div className='menulistcontent'>
            <span className="item-name">{item.title}</span>
            <span className="item-description">{item.desc}</span>
          </div>
          <span className="item-price">{item.price} kr</span>
        </li>
      ))}
    </ul>
  </div>
  <div className='landingheaderN'></div>
</>
  );
};

export default Menu;