import React, { useState, useContext, createContext } from 'react'

const ProductsContext = createContext(0)

function SearchBar(props) {
    return (
        <>
            <input
                type="text"
                value={props.filterText}
                onChange={(v) => {
                    props.setFilterText(v.target.value)
                }}
            />
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={props.inStockOnly}
                        onChange={(v) => {
                            props.setInStockOnly(v.target.checked)
                        }}
                    />
                    Only show products in strock
                </label>
            </div>
        </>
    )
}

function ProductTable(props) {
    const products = useContext(ProductsContext)
    const categorys = getCategorys(products, props.filterText)
    function getCategorys(products, filterText) {
        const filterProducts = filterText
            ? products.filter(
                  (item) => item.name.indexOf(props.filterText) > -1
              )
            : products
        const categorys = categorysObj(filterProducts, props.inStockOnly)
        return categorys
    }
    function categorysObj(productsArr, inStockOnly) {
        const categorys = {}
        productsArr.forEach((item) => {
            if (categorys[item.category]) {
                if (inStockOnly) {
                    if (item.stocked) {
                        categorys[item.category].push(item)
                    }
                } else {
                    categorys[item.category].push(item)
                }
            } else {
                categorys[item.category] = []
                if (inStockOnly) {
                    if (item.stocked) {
                        categorys[item.category].push(item)
                    }
                } else {
                    categorys[item.category].push(item)
                }
            }
        })
        return categorys
    }
    const show = []
    for (let category in categorys) {
        show.push(
            <Products
                key={category}
                name={category}
                items={categorys[category]}
            />
        )
    }
    return (
        <>
            <p>
                <span className="name">Name</span>
                <span>Price</span>
            </p>
            {show}
        </>
    )
}

function Products(props) {
    return (
        <>
            <p>{props.name}</p>
            <ul>
                {props.items.map((item, i) => {
                    return (
                        <li key={i} className={item.stocked ? '' : 'onStock'}>
                            <span className="name">{item.name}</span>
                            <span>{item.price}</span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

function FilterableProductTable(props) {
    const [filterText, setFilterText] = useState('')
    const [inStockOnly, setInStockOnly] = useState(false)
    return (
        <>
            <SearchBar
                filterText={filterText}
                setFilterText={setFilterText}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
            />
            <ProductTable filterText={filterText} inStockOnly={inStockOnly} />
        </>
    )
}

const PRODUCTS = [
    {
        category: 'Sporting Goods',
        price: '$49.99',
        stocked: true,
        name: 'Football',
    },
    {
        category: 'Sporting Goods',
        price: '$9.99',
        stocked: true,
        name: 'Baseball',
    },
    {
        category: 'Sporting Goods',
        price: '$29.99',
        stocked: false,
        name: 'Basketball',
    },
    {
        category: 'Electronics',
        price: '$99.99',
        stocked: true,
        name: 'iPod Touch',
    },
    {
        category: 'Electronics',
        price: '$399.99',
        stocked: false,
        name: 'iPhone 5',
    },
    {
        category: 'Electronics',
        price: '$199.99',
        stocked: true,
        name: 'Nexus 7',
    },
]

function App() {
    return (
        <ProductsContext.Provider value={PRODUCTS}>
            <FilterableProductTable />
        </ProductsContext.Provider>
    )
}

export default App
