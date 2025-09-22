"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
// Zustand
import useShoppingCart from "@/store/useShoppingCart";
// Remix Icon
import { RiStarFill, RiStarLine } from "@remixicon/react";
// TYPE'S
import { ProductTy, ColorsTy, CartItemTy } from "@/types";
// CSS
import styles from "./page.module.scss";
// API
import { useProductItem } from "@/hooks/apis";
// Shadcn
import { toast } from "sonner";

function ProductDetail() {
  const forward = useRouter();
  const { id } = useParams();
  const { getProductItem } = useProductItem();
  const productItem = getProductItem(Number(id));
  // status
  const [item, setItem] = useState(productItem.colors[0]);
  const [mainImage, setMainImage] = useState(productItem.colors[0].mainImage);
  const [size, setSize] = useState<string>(productItem.colors[0].sizes[0]);

  const { addCart, addItems } = useShoppingCart();

  const handleItemChange = (item: ColorsTy) => {
    setMainImage(item.mainImage);
    setItem(item);
    setSize(item.sizes[0]);
  };

  const handleAddCart = () => {
    // unique = id
    const selItems = addItems.filter((item) => item.id === id);
    const isSelItem = selItems.filter((selItem) => selItem.color == item.name);

    // unique-key(id, color)
    if (isSelItem.length == 0) {
      const addItem = {
        id: String(id),
        color: item.name,
        mainImage: item.mainImage,
        title: productItem.title,
        price: Number(productItem.price),
        size: size,
        quantity: 1, // 초기값
      };
      addCart(addItem);

      // toast("장바구니에 상품이 등록되었습니다.", {
      //   description: "항상 감사합니다. 고갱님!!",
      // });

      toast.custom((t) => (
        <div className="w-full h-full bg-blue-500 text-[#ffffff] p-4 ">
          장바구니에 상품이 등록되었습니다.
        </div>
      ));
    } else {
      toast.custom((t) => (
        <div className="w-full h-full bg-red-200 text-[#ffffff] p-4">
          이미 선택한 상품입니다.
        </div>
      ));
    }

    // forward.push("/board/cart");
  };

  return (
    <div className={styles["product-detail"]}>
      <div className={styles["product-img"]}>
        <div className={styles["thumbnail-list"]}>
          <img
            src={`/` + item.mainImage}
            onClick={() => setMainImage(item.mainImage)}
          />
          {item.thumbnails.map((thumbnail, index) => {
            return (
              <img
                src={`/` + thumbnail}
                key={index}
                onClick={() => setMainImage(thumbnail)}
              />
            );
          })}
        </div>
        <div className={styles["main-img"]}>
          <img src={`/` + mainImage} />
        </div>
      </div>

      <div className={styles["product-info"]}>
        <h2 className={styles.title}>Men Casual Round Neck T-Shirt</h2>
        <div className={styles.rating}>
          <RiStarFill size={16} color="#e35f26" />
          <RiStarFill size={16} color="#e35f26" />
          <RiStarFill size={16} color="#e35f26" />
          <RiStarFill size={16} color="#e35f26" />
          <RiStarLine size={16} color="#e35f26" />
          <span>(4.8)</span>
        </div>
        <span className={styles.price}>${productItem.price}</span>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
          laborum aut explicabo molestias voluptas, eum nulla doloremque
          laboriosam. Accusantium omnis illum nulla architecto doloribus.
        </p>
        <div className={styles["size-selection"]}>
          <p>Select Size</p>
          <div className={styles["size-options"]}>
            {item.sizes.map((psize, index) => {
              return (
                <button
                  key={index}
                  className={psize == size ? styles.selected : ""}
                  onClick={() => setSize(psize)}
                >
                  {psize}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles["color-selection"]}>
          <p>Select Color</p>
          <div className={styles["color-options"]}>
            {productItem.colors.map((pitem) => {
              return (
                <img
                  src={`/` + pitem.mainImage}
                  key={pitem.name}
                  className={pitem.name == item.name ? styles.selected : ""}
                  onClick={() => handleItemChange(pitem)}
                />
              );
            })}
          </div>
        </div>
        <button className={styles.btn} onClick={handleAddCart}>
          Add to Cart
        </button>
        <div className={styles["product-policy"]}>
          <p>100% Origial Product.</p>
          <p>Easy return and exchange policy whthin 14 days.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
