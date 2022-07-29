import React,{useState} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row'
import RangeSlider from 'react-bootstrap/FormRange'
import Button from 'react-bootstrap/Button';

const ReservationCard = () => {
    const [startDate, setStartDate] = useState(null);
    const [guestRange, setGuestRange] = useState(1);
    const [note, setNote] = useState();
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }
    return (
        <div className='reservation-card'>
            <div className='calendar-title'>
                <span>Check-in</span>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        includeDateIntervals={[
                            { start: new Date(), end: addDays(new Date(), 14)},
                        ]}
                    
                        placeholderText="Month / Day / Year"
                    />
            </div>

            <div className='guest-range-slider'>
                <span>How Many Guest's</span>
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
                        }}/>
                    </Form.Group>
                </Form>
            </div>
            <hr className="devider-reserve" style={{width:'70%',marginTop:'30px',marginBottom:'30px'}}/>
            
            <Button variant="primary">Reserve</Button>
      </div>

    );
}

export default ReservationCard