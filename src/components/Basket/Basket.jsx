import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './basket.scss';

export const Basket = (
  {
    storageProd,
    remove,
    removeAll,
    clearBasket,
  },
) => {
  const [basketList, setBasketList] = useState([]);

  const totalPrice = storageProd.reduce((acc, curr) => (acc + curr.price), 0);

  const basketListCreator = (array) => {
    const basketObj = array.reduce((acc, curValue) => (
      acc[curValue.name]
        ? {
          ...acc, [curValue.name]: acc[curValue.name] + 1,
        }
        : {
          ...acc, [curValue.name]: 1,
        }), {});

    setBasketList(Object.entries(basketObj));
  };

  useEffect(() => {
    basketListCreator(storageProd);
  }, [storageProd]);

  return (
    <div className="basket">
      {
        basketList.length === 0
          ? <h2 className="basket__header">Your basket is empty</h2>
          : (
            <>
              <ul className="basket__list">
                {
                  basketList.map(basketItem => (
                    <li key={Math.random()} className="basket__item">
                      <h2 className="basket__product">
                        {basketItem[0]}
                        {' '}
                        -
                        <span className="basket__product-amount">
                          {basketItem[1]}
                        </span>
                      </h2>
                      <div className="basket__button-wrapper">
                        <button
                          type="button"
                          onClick={() => {
                            remove(basketItem[0]);
                          }}
                          className="basket__button"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            removeAll(basketItem[0]);
                          }}
                          className="basket__button"
                        >
                          Remove All
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <button
                type="button"
                onClick={clearBasket}
                className="basket__button"
              >
                Clear basket
              </button>
            </>
          )
      }
      {totalPrice > 0 && (
        <h2>
          Total price:
          {totalPrice}
          .00$
        </h2>
      )}
    </div>
  );
};

Basket.propTypes = {
  storageProd: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  remove: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
  clearBasket: PropTypes.func.isRequired,
};
