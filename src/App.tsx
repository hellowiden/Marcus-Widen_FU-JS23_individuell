import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import CartButton from './components/CartButton';
import NavButton from './components/NavButton';
import OverlayShoppingList from './components/OverlayShoppingList';
import { useAppStore } from './store';

const LazyComponent = (path: string) => lazy(() => import(`./pages/${path}.tsx`));

const Landing = LazyComponent('Landing');
const Menu = LazyComponent('Menu');
const About = LazyComponent('About');
const Status = LazyComponent('Status');
const Profile = LazyComponent('Profile');
const NoMatch = LazyComponent('NoMatch');

interface MenuItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const Layout: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Outlet />
  </Suspense>
);

const App: React.FC = () => {
  const appStore = useAppStore();
  const location = useLocation();
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex >= 0) {
      const newCart = [...cart];
      newCart[itemIndex] = { ...newCart[itemIndex], quantity: newCart[itemIndex].quantity + 1 };
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    appStore.showOverlay();
  };

const handleIncrement = (itemId: string) => {
  const newCart = cart.map(item =>
    item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  );
  setCart(newCart);
};

const handleDecrement = (itemId: string) => {
  const newCart = cart.map(item =>
    item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
  ).filter(item => item.quantity > 0);
  setCart(newCart);
};


  const emptyCart = () => {
    setCart([]);
  };

  const getColorForPath = (path: string) => {
    const colorMappings: { [key: string]: string } = {
      '/': '#38846D',
      '/menu': '#F3E4E1',
      '/nav': '#2F2926',
      '/about': '#F3E4E1',
      '/status': '#E5674E',
      '/profile': '#2F2926',
    };
    return colorMappings[path] || '#2F2926';
  };

  const bg = getColorForPath(location.pathname);

  return (
    <div className="appcanvas" style={{ backgroundColor: bg }}>
      <div className="nav-cart-container">
        <NavButton />
        <CartButton cart={cart} />
        {appStore.overlayVisible && (
          <OverlayShoppingList
            cart={cart}
            onEmpty={emptyCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="menu" element={<Menu addToCart={addToCart} />} />
          <Route path="about" element={<About />} />
          <Route path="status" element={<Status />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
