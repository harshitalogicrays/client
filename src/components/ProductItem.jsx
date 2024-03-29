import React, { useEffect, useState } from 'react'
import ProductData from './ProductData'
import { Container } from 'react-bootstrap'
import Loader from './Loader'
import useFetchCollection from '../customhooks/useFetchCollection'
import ReactPaginate from 'react-paginate'

const ProductItem = ({products}) => { 
  const {data:categories}=useFetchCollection('categories')

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage=2
  const [currentItems,setCurrentItems]=useState([])
  const [pageCount,setPageCount]=useState(0)

  useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(products.length / itemsPerPage))
  },[currentItems,products,itemOffset])
 
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  }
  return (
    <>
    <Container fluid className='mt-5'>
      {products.length==0 && <Loader/>}
      <div className='row'>
        <div className="col-2">
          <div className="card">
            <div className="card-header">
              Category
            </div>
            <div className="card-body">
              {categories.map((c,i)=>
                <>
                <div class="form-check">
            <input class="form-check-input" type="radio" name="category" value={c.title}/>
            <label class="form-check-label" for="flexRadioDefault1">
            {c.title}
            </label>
        </div>
              
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="row">
              {/* {products.map((product)=><ProductData key={product.id} product={product} />)} */}

              {currentItems.map((product)=><ProductData key={product.id} product={product} />)}
          </div>
        
        </div>
        
      </div>
      <div class="vstack gap-2 col-md-5 mx-auto">
              <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={15}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="page-item active"
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
          />
         </div>
      </Container>
    </>
  )
}

export default ProductItem
