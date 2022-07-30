import React,{useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row'
import RangeSlider from 'react-bootstrap/FormRange'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const ReservationCard = () => {

    const [show, setShow] = useState(false);
    const [fields,setFields] = useState(true)
    const [fieldsVal,setFieldsVal] = useState(true)
    const [startDate, setStartDate] = useState(null);
    const [guestRange, setGuestRange] = useState(1);
    const [note, setNote] = useState('empty');
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phone_number,setPhone_number] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    const handleReserve = (e) => {
        if (!startDate || !guestRange)
        {
            setFields(false)
            return
        }
        setFields(true)
        e.preventDefault()
        handleShow()
    }

    const handleReserveSubmit = (e) => {

        if (!name || !email || !password || !phone_number)
        {
            setFieldsVal(false)
            return
        }
        console.log(name + " " + email + " " + password +" " + phone_number + " " + startDate + " " + guestRange + " " + note)
    }

    return (
        <div className='reservation-card'>
            <div className='calendar-title'>
                <span className='required'>Check-in</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        includeDateIntervals={[
                            { start: new Date(), end: addDays(new Date(), 14)},
                        ]}
                    
                        placeholderText="Month / Day / Year"
                        required={true}
                    />
            </div>

            <div className='guest-range-slider'>
                <span className='required'>How Many Guest's</span>
                <Form style={{width:'80%'}}>
                    <Form.Group as={Row}>
                        <Col xs="9">
                        <RangeSlider
                            min={1}
                            max={10}
                            value={guestRange}
                            onChange={(e) => {setGuestRange(e.target.value)}}
                        />
                        </Col>
                        <Col xs="3">
                        <Form.Control 
                        value={guestRange}
                        readOnly
                        />
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div className='note-textarea'>
                <span>Note</span>
                <Form style={{width:'80%'}}>
                    <Form.Group className="textarea-note" controlId="exampleForm.ControlTextarea1">
                        <Form.Control 
                        as="textarea" 
                        rows={5} 
                        onChange={(e) => {
                            setNote(e.target.value)
                        }}
                        style={{maxHeight:'calc(6.5em + 0.75rem + 2px)',minHeight:'calc(6.5em + 0.75rem + 2px)'}}
                        />
                    </Form.Group>
                </Form>
            </div>
            <hr className="devider-reserve" style={{width:'70%',marginTop:'30px',marginBottom:'30px'}}/>
            {!fields ? 
                <div className='validate-notification'>please fill all required field</div> 
            : <></>}
            <Button 
            variant="primary" 
            className='reserve-btn' 
            onClick={ 
                (e) => { 
                    handleReserve(e) 
                    }}>Reserve</Button>


            {/*_____________ VALIDATION FORM ________________ */}
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Validation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                        <Form.Group className="mb-3 validate-pop-up" >
                            <Form.Label className='required'>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="name"
                                autoFocus
                                onChange={(e) => {setName(e.target.value)}}
                            />
                            </Form.Group>


                            <Form.Group className="mb-3 validate-pop-up" >
                            <Form.Label className='required'>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3 validate-pop-up" >
                            <Form.Label className='required'>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                            </Form.Group>

                            <Form.Group className="mb-3 validate-pop-up" >
                            <Form.Label className='required'>Phone Number</Form.Label>
                            <Form.Control
                                type="Phone"
                                placeholder="phone number"
                                onChange={(e) => {setPhone_number(e.target.value)}}
                            />
                            </Form.Group>

                        </Form>
                        {!fieldsVal ? 
                            <div className='validate-notification'>please fill all required field</div> 
                        : <></>}
                    </Modal.Body>


                    <Modal.Footer>
                        

                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button variant="success" onClick={handleReserveSubmit}>
                            Reserve
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
            {/* _____________________________________ */}

      </div>

    );
}

export default ReservationCard