const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

function App() {
  // Initialize the tshirt data in the state management
  const [tshirtsData, setTshirtsData] = React.useState(tshirts)


  // click button function initiated
  function onButtonClicked(selectedTitle, quantity) {
    if(quantity){
      // index of the selected t-shirt
      let boughtTshirt = tshirtsData.findIndex(item => item.title === selectedTitle)
      let updatedData = Object.assign({}, tshirtsData[boughtTshirt]);
  
      //updating the stock
      updatedData.stock = updatedData.stock - quantity
      
      let newTshirtData = tshirtsData.slice()
      newTshirtData[boughtTshirt] = updatedData

      setTshirtsData(newTshirtData)
    }
  }

  return (
    <div className="container">
      <h1 className="text-center mb-4">T shirts</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Loop through all the tshirts */}
        {tshirtsData.map(tshirt => (
          <div className="col" key={tshirt.title}>
            <TshirtCard tshirt={tshirt} onButtonClicked={onButtonClicked} />
          </div>
        ))}
      </div>
    </div>
  );
}

//single tshirt component

function TshirtCard({ tshirt, onButtonClicked }) {
  const [selectedQuantity, setSelectedQuantity] = React.useState()
  const onBuyClicked = () => {
    onButtonClicked(tshirt?.title, selectedQuantity);

    // If the stock after the sell is less than the selectedQuantity, the default placeholder is selected so, change the state to 0
    if(tshirt.stock - selectedQuantity < selectedQuantity){
      setSelectedQuantity(0)
    }
  }

  return (
    <div className="card">
      <img src={`images/${tshirt?.image}`} width="100%" alt={tshirt?.title} />
      <div className="card-details">
        <div className="title h5">{tshirt?.title}</div>
        <div className="price h6">$ {tshirt?.price}</div>
        <div className="stock" style={{ color: tshirt?.stock === 0 ? 'red' : 'green' }}>
          {
            tshirt?.stock === 0 ?
              'Out of stock' :
              `${tshirt?.stock} in stock`
          }
        </div>
        {
          tshirt?.stock === 0 ?
            <></> :
            <div>
              <select name="count" onChange={(e) => setSelectedQuantity(e.target.value)}>
                <option value="0">Select Quantity</option>
                {tshirt && [...Array(tshirt.stock)].map((count, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button onClick={onBuyClicked} className="btn btn-primary">
                BUY
              </button>
            </div>
        }
      </div>
    </div>
  );
}


root.render(<App />);