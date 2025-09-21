'use client';

import { useRouter } from 'next/navigation';

// DATA
import { productsData } from '@/data/products.js';
// TYPE'S 
import { ProductTy, ColorsTy } from '@/types';
// CSS
import styles from './page.module.scss';

const ProductItem = (props: ProductTy) => {

  const x = useRouter();

  const handleForwadProductDetailPage = (id: number) => {
    x.push(`/board/product-detail/${id}`);
  }

  return(
    <div>
      <div className={styles['img-box']} onClick={ () => handleForwadProductDetailPage(props.id)}>
          <img src={"/"+props.colors[0].mainImage} />
      </div>
      <h2 className={styles.title}>{props.title}</h2>
      <span className={styles.price}>${props.price}</span>
    </div>
  )
}

function ListPage() {
  return (
    <section className={styles['product-collection']}>
      <h1>Latest Collection</h1>
      <div className={styles['product-list']}>
        {
          productsData.map((product) => {
            return <ProductItem key={product.id} {...product} />
          })
        }

      </div>
    </section>
  )
}

export default ListPage;