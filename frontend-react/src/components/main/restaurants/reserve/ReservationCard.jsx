import React,{useState,useRef} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row'
import RangeSlider from 'react-bootstrap/FormRange'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import emailjs from '@emailjs/browser';

const ReservationCard = ({rest_id}) => {

    const user_id = reactLocalStorage.getObject('user').id;
    const token_key = reactLocalStorage.get('token_key');
    const [show, setShow] = useState(false);
    const [fields,setFields] = useState(true)
    const [fieldsVal,setFieldsVal] = useState(true)
    const [startDate, setStartDate] = useState(null);
    const [guestRange, setGuestRange] = useState(1);
    const [note, setNote] = useState('empty');
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone_number,setPhone_number] = useState();
    const form = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    const handleReserve = (e) => {
        
        if (!token_key){
            alert('you need to login')
            return
        }
        else if (!startDate || !guestRange)
        {
            setFields(false)
            return
        }
        setFields(true)
        e.preventDefault()
        handleShow()
    }

    const handleReserveSubmit = async (e) => {

        e.preventDefault();

        if (!name || !email || !phone_number)
        {
            setFieldsVal(false)
            return
        }
        try{
            Moment(startDate).format('DD-MM-YYYY')
            let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/reserve',{
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token_key}`
                },
                body: JSON.stringify({
                    email:email,
                    note:note,
                    number_of_guest:guestRange,
                    reservation_date:startDate,
                    user_id:user_id,
                    restaurant_id:rest_id
                })
            })
            const data = await res.json();

            if (res.status === 200) {
              alert('The restaurant will call you to confirm the appointment')
                
            //   _______________Sending Email for user________________
            
              emailjs.sendForm('service_5cl8dm4', 'template_ir1ol4n', form.current , 'gY5HY8RbpUu5_O3tE')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            //_________________________________________________________
            // ________________Sending Email for restaurant_____________

            emailjs.sendForm('service_5cl8dm4', 'template_frqlsrd', form.current , 'gY5HY8RbpUu5_O3tE')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

            // _________________________________________________________
              handleClose()

            }else if (res.status === 401){

                if(data.error === 'Unauthorized'){
                    alert('You need to login')
                    handleClose()
                }else{
                    alert('invalid email or password')
                    handleClose()
                }

            }else{
                alert('something went wrong try again')
                handleClose()
            }

        }catch(error){
            console.error(error)
        }
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
                    <Form.Group className="textarea-note" >
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
                        <form ref={form} onSubmit={handleReserveSubmit} className="validate-form">

                            <label>Name</label>
                            <input type="text" name="user_name" onChange={(e) =>{setName(e.target.value)}}/>
                            <label>Email</label>
                            <input type="email" name="user_email" onChange={(e) =>{setEmail(e.target.value)}}/>
                            <label>Phone number</label>
                            <input name="phone_number" onChange={(e) =>{setPhone_number(e.target.value)}}/>
                            <input name="restaurant_email" value={'mohammad.mancy994@gmail.com'} style={{display:'none'}} readOnly/>
                            <input name="note" value={note} style={{display:'none'}} readOnly/>
                            <input name="reservation_date" value={Moment(startDate).format('DD-MM-YYYY')} style={{display:'none'}} readOnly/>
                            <input name="guest" value={guestRange} style={{display:'none'}} readOnly/>
                            {!fieldsVal ? 
                                <div className=
                                'validate-notification'>please fill all required field</div> 
                            : <></>}
                            <input className='submit-validate' type="submit" value="Send" />
                        </form>
                    </Modal.Body>
                </Modal>
            </>
            {/* _____________________________________ */}

      </div>

    );
}

export default ReservationCard