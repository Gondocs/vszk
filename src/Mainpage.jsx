// KitchenSinkExample.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Mainpage.css'; // Import the CSS file
import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Collapse, Form } from 'react-bootstrap';


export function Cards() {

  const [value, setValue] = useState([1, 3]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (val) => setValue(val);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
<div className='mainchecks'>
  <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} style={{marginTop: '5rem'}}>
    <ToggleButton
      id="tbg-btn-1"
      value={1}
      variant={value.includes(1) ? 'dark' : 'light'}
      className="border-2 border-dark"
      style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px' }}
      onClick={handleToggleOptions}
    >
      Adatbázis
      <Collapse in={showOptions}>
        <div className="mt-2">
          <Form.Check type="checkbox" label="Elso" onClick={(e) => e.stopPropagation()} />
          <Form.Check type="checkbox" label="masodik" onClick={(e) => e.stopPropagation()} />
          <Form.Check type="checkbox" label="harmadik" onClick={(e) => e.stopPropagation()} />
          <Form.Check type="checkbox" label="negyedik" onClick={(e) => e.stopPropagation()} />
        </div>
      </Collapse>
    </ToggleButton>

        <ToggleButton id="tbg-btn-2" value={2} variant={value.includes(2)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Pénzügy
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value={3} variant={value.includes(3)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Alma
        </ToggleButton>
        <ToggleButton id="tbg-btn-4" value={4} variant={value.includes(4)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Körte
        </ToggleButton>
        <ToggleButton id="tbg-btn-5" value={5} variant={value.includes(5)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Petőfi
        </ToggleButton>
        <ToggleButton id="tbg-btn-6" value={6} variant={value.includes(6)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Osztrák
        </ToggleButton>
        <ToggleButton id="tbg-btn-7" value={7} variant={value.includes(7)  ? 'dark' : 'light'} className="border-2 border-dark" style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin:'2px'}}>
            Volt
        </ToggleButton>        
      </ToggleButtonGroup>
    </div>
    
    <div className='mainpage'>

      <div className="card-container" style={{ marginTop: '5rem' }}>



        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark" bg=''>
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>
        <Card style={{ width: '16rem', height: '26rem' }} border="dark">
          <Card.Img variant="top" src="https://i.scdn.co/image/ab67706c0000bebbe0f6637d703f13ce3fefbcf3" style={{ height: '14rem' }} />
          <Card.Body>
            <Card.Title>Szoftvernév</Card.Title>
            <Card.Text>
              Szoftverleírás vagy hasonló
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Pénzügyi szoftver</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Tovább</Card.Link>
          </Card.Body>
        </Card>

      </div>
    </div></>
  );
}

