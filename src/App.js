import React from 'react'
import Products from './components/Products'
import data from './data.json'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      sizes: '',
      sort: '',
    }
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
              <Products products={this.state.products} />
            </div>
            <div className='sidebar'>Cart Items</div>
          </div>
        </main>
        <footer>Personal Shopping Mall</footer>
      </div>
    )
  }
}

export default App
