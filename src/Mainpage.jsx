import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Mainpage.css';
import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


export function Cards() {

  const [value, setValue] = useState([]);
  console.log(value)

  const handleChange = (val) => setValue(val);

  return (
    <>

<Carousel style={{height:'320px', width:'100%', margin: 'auto', borderBottom: '4px solid grey' }} className='carousel-inner'>
      <Carousel.Item>
        <img src='https://i.ibb.co/cXtcyM4/bannerxd.png' alt='kepecske1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} text="First slide" />
        <Carousel.Caption>
          <h3>Hihetetlen szoftver</h3>
          <p>Na ide mondjuk mit írjak</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://i.ibb.co/cXtcyM4/bannerxd.png' alt='kepecske1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} text="First slide" />
        <Carousel.Caption>
          <h3>Lerágom a fejemet kategóriás szoftverek </h3>
          <p>Egyre kényelmesebben néz ki az a diófa</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src='https://i.ibb.co/cXtcyM4/bannerxd.png' alt='kepecske1' style={{ objectFit: 'cover', width: '100%', height: '100%' }} text="First slide" />
        <Carousel.Caption>
          <h3>Hehe miért ilyenkor csinálom ezt</h3>
          <p>
            Hozzon valami finomat a foodora, de már nincsen nyitva semmi :x
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


<div className='mainchecks'>
  <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} style={{marginTop: '5rem'}}>

        <ToggleButton id="tbg-btn-1" value={1} variant={value.includes(1) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
          Adatbázis
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2} variant={value.includes(2)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Pénzügy
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value={3} variant={value.includes(3)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Szai
        </ToggleButton>
        <ToggleButton id="tbg-btn-4" value={4} variant={value.includes(4)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Körte
        </ToggleButton>
        <ToggleButton id="tbg-btn-5" value={5} variant={value.includes(5)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Hejo
        </ToggleButton>
        <ToggleButton id="tbg-btn-6" value={6} variant={value.includes(6)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Úszik a pult
        </ToggleButton>
        <ToggleButton id="tbg-btn-7" value={7} variant={value.includes(7)  ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '8rem', margin: '2px', border: '2px solid grey' }}>
            Volt
        </ToggleButton>        

      </ToggleButtonGroup>
    </div>
    <div className='mainpage'>

      <div className="card-container" style={{ marginTop: '5rem' }}>


        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }} >
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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
        <Card style={{ width: '16rem', height: '22rem', border: '2px solid grey'  }}>
          <Card.Img variant="top" src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png" style={{ height: '10rem' }} />
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

