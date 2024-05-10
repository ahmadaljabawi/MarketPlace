import Filters from "../components/Filters/Filters";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/ui/Breadcrumb";
import Pagination from "../components/ui/Pagination";
const url = "https://staja-marketplace.onrender.com";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectedValuesChange = (values) => {
    setSelectedValues(values);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let productsUrl = `${url}/products`;
        if (selectedValues.length > 0) {
          const categories = new URLSearchParams({
            categories: selectedValues.join(","),
          });
          productsUrl += `?${categories.toString()}`;
        }
        const response = await axios.get(`${productsUrl}?page=${currentPage}`);
        setProducts(response.data.products);
        setTotalPages(response.data.pages);
        console.log("response.data.products");
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedValues, currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="d-block d-sm-flex container-fuild">
        <div className="container">
          <Breadcrumbs />

          <h2 className="my-4 fw-bold ">Products</h2>
          <div className="row">
            <div className="col col-md-3">
              <Filters
                onSelectedValuesChange={handleSelectedValuesChange}
                products={products}
              />
            </div>
            <div className="col d-flex flex-wrap justify-content-center justify-content-lg-start mt-3 mt-md-0 gap-4 gap-md-0   ">
              {products.map((product) => (
                <div key={product.id} className={`col col-md-4 mb-5  `}>
                  <Card
                    productSlug={product.slug}
                    name={product.name}
                    img={`${url}${product.image[0]}`}
                    price={product.price}
                    discount={product.discount}
                  />{" "}
                </div>
              ))}
            </div>
          </div>
          <Pagination
            current={currentPage}
            pages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
