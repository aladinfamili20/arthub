import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
import   "./ViewProducts.css";

import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("posts");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, image) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, image);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, image) => {
    try {
      await deleteDoc(doc(db, "posts", id));

      const storageRef = ref(storage, image);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
     <div>
      <div className='AdminTable'>
      <table className="table-container">
        <tr>
          <th>Id</th>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
            {
             data.map((product, index)=>{
              const {id, image, name, medium, price} = product;
              return(
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/imageview/${id}`}>
                    <img src={image}alt='artwork'/>
                    </Link>
                  </td>
                  <td>{name}</td>
                  <td>{medium}</td>
                  <td>{price}</td>
                  <td><div className='tableIcons'>
                  {/* <Link to={`/admin/add-product/${id}`}>
                  <FaEdit size={24} className='editIcon'
                  
                  /></Link> */}
                  <FaTrash className='trashIcon' 
                  onClick={() => confirmDelete(id, image)}
                  />
                  </div></td>
                </tr>
              )
             })
           }
           
        {/* Add more table rows as needed */}
      </table>
    </div>
    </div>
    </>
  );
};

export default ViewProducts;
