import './AddToCart.css'; 

interface AddToCartProps {
  item: any;
  addToCart: (item: any) => void; 
}

function AddToCart({ item, addToCart }: AddToCartProps) {

  return (
    <button className="add-to-cart-button" onClick={()=>addToCart(item)}> 
      + 
    </button>
  );
}

export default AddToCart; 