import React from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      cartCount: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')).reduce(
            (acc, item) => acc + item.count,
            0
          )
        : 0,
      size: '',
      sort: '',
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    let cartCount = this.state.cartCount
    let alreadyInCart = false
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++
        alreadyInCart = true
        cartCount++
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
      cartCount++
    }
    this.setState({ cartItems, cartCount })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    let cartCount = this.state.cartCount
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count--
        cartCount--
      }
    })
    const filteredItems = cartItems.filter((item) => item.count > 0)
    this.setState({ cartItems: filteredItems, cartCount })
    localStorage.setItem('cartItems', JSON.stringify(filteredItems))
  }

  sortProducts = (e) => {
    const sort = e.target.value
    this.setState((state) => ({
      sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }))
  }

  filterProducts = (e) => {
    if (e.target.value === '') {
      this.setState({ size: e.target.value, products: data.products })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      })
    }
  }

  createOrder = (order) => {
    alert(order.name)
  }

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href='/'>ShoppingNow</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
                count={this.state.products.length}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className='sidebar'>
              <Cart
                createOrder={this.createOrder}
                cartCount={this.state.cartCount}
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>Personal Shopping Mall</footer>
      </div>
    )
  }
}

export default App
