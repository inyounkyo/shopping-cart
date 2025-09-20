'use client';

// Remix Icon
import { RiStarFill, RiStarLine } from "@remixicon/react";

//CSS
import styles from './page.module.scss';
import { useParams } from "next/navigation";
import { useProductItem } from "@/hooks/apis";
import { useState } from "react";

function page() {
  const { id }= useParams();
  const { getProductItem } = useProductItem();
  const productItem = getProductItem( Number(id) );
  // Stats
  const [item, setItem] = useState(productItem.colors[0]);
  const [mainImage, setMainImage] = useState(productItem.colors[0].mainImage);
  const [size , setSize] = useState(productItem.colors[0].sizes[0]);
  const handleItemChange = (item) => {
    setMainImage(item.mainImage);
    setItem(item);
    setSize(item.sizes[0]);
  }

  return (
    <div className={styles['product-detail']}>
      <div className={styles['product-img']}>
        <div className={styles["thumbnail-list"]}>
            {/* <img src="/images/product1_green_1.jpg" />
            <img src="/images/product1_green_2.jpg" />
            <img src="/images/product1_green_3.jpg" />
            <img src="/images/product1_green_4.jpg" /> */}
            <img src={`/`+item.mainImage} onClick={() => setMainImage(item.mainImage)} />
            {
              item.thumbnails.map((thumbnail, index) => {
                  return <img src={`/`+thumbnail} key={index} 
                    onClick={() => setMainImage(thumbnail)}
                  />
              })
            }
        </div>
        <div className={styles['main-img']}>
          {/* <img src="/images/product1_green_1.jpg" /> */}
          <img src={`/`+mainImage} />
        </div>
      </div>

      <div className={styles['product-info']}>
          <h2 className={styles.title}>Men Casual Round Neck T-Shirt</h2>
          <div className={styles.rating}>
              <RiStarFill size={16} color="#e35f26" />
              <RiStarFill size={16} color="#e35f26" />
              <RiStarFill size={16} color="#e35f26" />
              <RiStarFill size={16} color="#e35f26" />
              <RiStarLine size={16} color="#e35f26" />
              <span>(4.8)</span>
          </div>
          <span className={styles.price}>$100</span>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam laborum aut explicabo molestias voluptas, eum nulla doloremque laboriosam. Accusantium omnis illum nulla architecto doloribus.
          </p>
          <div className={styles["size-selection"]}>
            <p>Select Size</p>
            <div className={styles["size-options"]}>
              {/* <button className={styles.selected}>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
              <button>XXL</button> */}
              { item.sizes.map((psize, index) => {
                return <button 
                  key={index}
                  className={(psize==size)?styles.selected:''}
                  onClick={()=>setSize(psize)}
                  >{psize}</button>

              } )}


            </div>
          </div>
          <div className={styles["color-selection"]}>
            <p>Select Color</p>
            <div className={styles["color-options"]}>
              {/* <img src="/images/product1_green_1.jpg"  className={styles.selected} />
              <img src="/images/product1_yellow_1.jpg"/>
              <img src="/images/product1_red_1.jpg"   />
              <img src="/images/product1_white_1.jpg" />
              <img src="/images/product1_maroon_1.jpg"/> */}
              { productItem.colors.map((pitem) => {
                return <img src={`/`+pitem.mainImage} 
                  key={pitem.name} 
                  className={(pitem.name==item.name)?styles.selected:''}
                  onClick={ () => handleItemChange(pitem) }

              />})
              }
            </div>
          </div>
          <button className={styles.btn}>Add to Cart</button>
          <div className={styles["product-policy"]}>
            <p>100% Origial Product.</p>
            <p>Easy return and exchange policy whthin 14 days.</p>
          </div>
      </div>
    </div>
  )
}

export default page;