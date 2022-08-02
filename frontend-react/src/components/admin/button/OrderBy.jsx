import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample({byName,byDate,byCapacity,locate,byRate,byEmail}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Order By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={byName}>Name</Dropdown.Item>
        <Dropdown.Item onClick={byDate}>Date</Dropdown.Item>
        {locate === 'rest'?
        <Dropdown.Item onClick={byCapacity}>Capacity</Dropdown.Item>
        :locate === 'reviews'?
        <Dropdown.Item onClick={byRate}>Rate</Dropdown.Item>
        :locate === 'users'?
        <Dropdown.Item onClick={byEmail}>Email</Dropdown.Item>
        :
        <></>
        }

      </Dropdown.Menu>
      
    </Dropdown>
  );
}

export default BasicExample;