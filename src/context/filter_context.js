import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'lowest-price',
  filters:{
    text:'',
    company:'all',
    category:'all',
    color:'all',
    min_price:0,
    max_price:0,
    shipping:false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products])
  useEffect(() => {
    dispatch({type:FILTER_PRODUCTS})
   dispatch({type:SORT_PRODUCTS})
  }, [products,state.sort,state.filters])


  

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const updateSort = (e) => {
    // const name = e.target.name
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  const updateFilters =(e)=>{
    let value = e.target.value 
    let name = e.target.name

dispatch({type:UPDATE_FILTERS, payload:{name,value}})
  }
  const clearFilters =()=>{

  }
  

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort,updateFilters,clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
