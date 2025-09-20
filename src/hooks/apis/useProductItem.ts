// DATA
import { productsData } from '@/data/products.js';

/**
 *  to rest-api 변환
 *  product-detail/[id] 상세 정보
 */

function useProductItem() {

    const getProductItem = (id: number) => {
        return productsData.filter((product) => product.id === id)[0];
    }

    return { getProductItem }
}

export { useProductItem }