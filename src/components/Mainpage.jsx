import React from 'react';
import './Mainpage.css';
import { useState } from 'react';
import { ToggleButtonGroup, ToggleButton} from 'react-bootstrap';



export function Cards() {

  const [value, setValue] = useState([]);
  console.log(value)

  const handleChange = (val) => setValue(val);

  return (
    


    <><div className='mainchecks'>
      <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange} style={{ marginTop: '5rem' }}>

        <ToggleButton id="tbg-btn-1" value={1} variant={value.includes(1) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 1
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2} variant={value.includes(2) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 2
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value={3} variant={value.includes(3) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 3
        </ToggleButton>
        <ToggleButton id="tbg-btn-4" value={4} variant={value.includes(4) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 4
        </ToggleButton>
        <ToggleButton id="tbg-btn-5" value={5} variant={value.includes(5) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 5
        </ToggleButton>
        <ToggleButton id="tbg-btn-6" value={6} variant={value.includes(6) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 6
        </ToggleButton>
        <ToggleButton id="tbg-btn-7" value={7} variant={value.includes(7) ? 'dark' : 'light'} style={{ fontSize: '1.2rem', padding: '0.6rem', width: '9rem', margin: '2px', border: '2px solid grey' }}>
          Tulajdonság 7
        </ToggleButton>

      </ToggleButtonGroup>
    </div><div className='mainpage'>


      </div></>
  );
}

