import { Card, Button } from 'react-bootstrap'
import './Carts.css'

function Carts({ carts = [], setCarts = () => {} }) {
  const removeFromCart = (id) => {
    // immutable update
    setCarts(prev => prev.filter(item => item.id !== id))
  }

  if (!Array.isArray(carts) || carts.length === 0) {
    return (
      <div className="carts-container">
        <h4>No items in cart</h4>
      </div>
    )
  }

  return (
    <div className="carts-container">
      <div className="carts-items-container">
        {carts.map(cart => (
          <Card style={{ width: '18rem' }} key={cart.id}>
            {cart.thumbnailUrl && <Card.Img variant="top" src={cart.thumbnailUrl} />}
            <Card.Body>
              <Card.Title>{cart.title}</Card.Title>
              <Card.Text>${cart.price}</Card.Text>
              <Button variant="outline-danger" onClick={() => removeFromCart(cart.id)}>
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <h4>
        <span className='badge bg-danger'>Items : {carts.length} </span> | Total Price:  
      <span className='badge bg-success'>$ {carts.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
      </h4>
      <button className='btn btn-warning'>Checkout <i class="bi bi-credit-card"></i></button>
    </div>
  )
}

export default Carts