import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocaleStorage } from './customHooks/useLocaleStorage';
import { Navigation } from './components/Navigation';
import { ProductsList } from './components/ProductsList';
import { Basket } from './components/Basket';
import './App.scss';

const productsList = [
  {
    id: 1,
    name: 'article 1',
    // eslint-disable-next-line max-len
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 25,
  },
  {
    id: 2,
    name: 'article 2',
    // eslint-disable-next-line max-len
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 35,
  },
  {
    id: 3,
    name: 'article 3',
    // eslint-disable-next-line max-len
    label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 45,
  },
];

const App = () => {
  const [addedProducts, setAddedProducts] = useState(
    JSON.parse(localStorage.getItem('data')) || [],
  );
  const [storageProd, setStorageProd] = useLocaleStorage('data', []);

  const addProduct = (productId) => {
    const product = productsList.find(item => item.id === productId);

    setAddedProducts([...addedProducts, product]);
  };

  const remove = (productName) => {
    const index = addedProducts
      .findIndex(product => product.name === productName);

    if (index >= 0) {
      setAddedProducts(prevState => (
        [
          ...prevState.slice(0, index),
          ...prevState.slice(index + 1),
        ]
      ));
    }
  };

  const removeAll = (productName) => {
    setAddedProducts(prevState => (
      prevState.filter(prod => prod.name !== productName)
    ));
  };

  const clearBasket = () => {
    setAddedProducts([]);
    localStorage.clear();
  };

  useEffect(() => {
    setStorageProd(addedProducts.sort((a, b) => a.id - b.id));
  }, [addedProducts, storageProd, setStorageProd]);

  return (
    <>
      <header className="header">
        <Navigation />
      </header>
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <ProductsList
              productsList={productsList}
              addProduct={addProduct}
            />
          </Route>
          <Route path="/basket">
            <Basket
              storageProd={storageProd}
              addedProducts={addedProducts}
              remove={remove}
              removeAll={removeAll}
              clearBasket={clearBasket}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default App;
