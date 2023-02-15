import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятнее всего, вы ещё не выбрали пиццу.
            <br />
            Для того, чтобы заказать пиццу, перейдите на главную страницу.
          </p>
          <img src="/img/empty-cart.png" alt="Empty cart" />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
