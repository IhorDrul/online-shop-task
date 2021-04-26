import React from 'react';
import PropTypes from 'prop-types';

import './productsList.scss';

export const ProductsList = ({ addProduct, productsList }) => (
  <ul className="products">
    {
      productsList.map(product => (
        <li key={product.id} className="products__item">
          <h2 className="products__name">{product.name}</h2>
          <p className="products__description">{product.label}</p>
          <p className="products__price">
            {product.price}
            .00 $
          </p>
          <button
            className="products__button"
            type="button"
            onClick={() => {
              addProduct(product.id);
            }}
          >
            Add
          </button>
        </li>
      ))
    }
  </ul>
);

ProductsList.propTypes = {
  addProduct: PropTypes.func.isRequired,
  productsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
