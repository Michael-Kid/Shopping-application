import React from 'react'
import { Provider } from 'react-redux'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import store from './redux/store'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      cartCount: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')).reduce(
            (acc, item) => acc + item.count,
            0
          )
        : 0,
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

  createOrder = (order) => {
    alert(order.name)
  }

  render() {
    return (
      <Provider store={store}>
        <div className='grid-container'>
          <header>
            <a href='/'>ShoppingNow</a>
          </header>
          <main>
            <div className='content'>
              <div className='main'>
                <Filter />
                <Products />
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
      </Provider>
    )
  }
}

export default App
