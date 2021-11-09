import React from 'react'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      products: data.products,
      size: '',
      sort: '',
    }
  }

  sortProducts = (e) => {
    console.log(this.state)
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
