'use client';

// Zustand
import useShoppingCart from "@/store/useShoppingCart";
// CSS
import styles from './page.module.scss';
// Remix Icon
import { RiCloseLargeLine } from "@remixicon/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RowItem = ({item}) => {
  const forward = useRouter();
  const [quantity, setQuantity] = useState<number>(Number(item.quantity));
  const {addItems, deleteCartItem, updateQuantity } = useShoppingCart();

  const handleQuantity = (id, event) => {
    setQuantity(event.target.value);
    updateQuantity(id, event.target.value);
  }

  const handleDeleteCartItem = (id) => {
    deleteCartItem(id);
  }

  return(
    <div className={styles["cart-item"]}>
      <div className={styles.product}>
        <img src={`/`+item.mainImage} 
          className="cursor-pointer"
          onClick={() => forward.push(`/board/product-detail/${item.id}`) }/>
        <div className={styles["item-detail"]}>
          <p>{item.title}</p>
          <div className={styles["size-color-box"]}>
            <span className={styles.size}>{item.size}</span>
            <span className={styles.color}>{item.color}</span>
          </div>
        </div>
      </div>
      <span className={styles.price}>${item.price}</span>
      <div className={styles.quantity}>
        <input type="number" value={quantity} min={1} max={100} 
          onChange={(e) => handleQuantity(item.id, e) }/>
      </div>
      <span className={styles["total-price"]}>${item.price * quantity}</span>
      <button className={styles.remove} onClick={ () => handleDeleteCartItem(item.id) }>
        <RiCloseLargeLine size={20} color='#333' cursor={"pointer"}/>
      </button>
    </div> 
  )
}

function Cart() {
  const { addItems } = useShoppingCart();

  let subTotal = 0;
  let grandTotal = 0;
  addItems.forEach(item => {
      subTotal += item.price * item.quantity;
      grandTotal += item.price * item.quantity;
  });

  return (
    <div className={styles.cart}>
      <div className={styles["cart-header"]}>
        <span>Products</span>     
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Remove</span>
      </div>
      <div className={styles["cart-items"]}>
        {addItems.length > 0 ?
          (addItems.map((item, index)=>{ return <RowItem key={index} item={item} /> })) :
          (<div className={styles["empty-cart"]}>Empty Cart..</div>)
        }
      </div>

      <div className={styles["cart-total"]}>
        <h3>Cart Total</h3>
        <p>Subtotal 
          <span className={styles.subtotal}>
            ${subTotal}
          </span>
        </p>
        <p>Delivery Fee <span>0.2</span></p>
        <p>Grand Total <span className={styles["gran-total"]}>${grandTotal * (0.2*100)}</span></p>
        <button className={styles.btn}>Proceed to Checkbox</button>
      </div>
    </div>
  )
}

export default Cart;
