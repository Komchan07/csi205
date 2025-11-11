import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Products.css';

function Products({ products, carts, setCarts }) {
    return (
        <div className='products-items-container'>
            {products.map((product) => (
                <Card style={{ width: '18rem' }} key={product.id}>
                    <Card.Img variant="top" src={product.thumbnailUrl} />
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>

                        {carts.find((carts) => carts.id === product.id) ? (
                            <span className='badge bg-danger'>Added</span>
                        ) : (
                            <Button variant='outline-primary' onClick={() => {
                                setCarts([...carts, product])
                            }}>Add to Cart</Button>

                        )}
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Products
