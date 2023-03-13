import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { sortList } from '../components/Sorting';

import Categories from '../components/Categories';
import Sorting from '../components/Sorting';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  // If params changed and there was a 1st render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [navigate, categoryId, sort.sortProperty, searchValue, currentPage]);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));

    window.scrollTo(0, 0);
  };
  // If there was a render to check URL params and save it to Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);
  // If there was a 1st render then expect pizzas from backend(mockapi)
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((pizza) => (
    <PizzaBlock
      id={pizza.id}
      key={pizza.id}
      title={pizza.title}
      price={pizza.price}
      img={pizza.imageUrl}
      sizes={pizza.sizes}
      types={pizza.types}
    />
  ));
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sorting />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :(</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
}

export default Home;
