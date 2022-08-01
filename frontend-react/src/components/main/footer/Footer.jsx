import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer, CDBBox } from 'cdbreact';
import foodOclockLogo from './../../../assets/logo/logofoodoclockF.png'
import { Link } from 'react-router-dom';

export const Footer = () => {

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: '80%' }}
      >
        <CDBBox display="flex" alignItems="center">
            <img
              alt="logo"
              src={foodOclockLogo}
              width="300px"
              onClick={goToTop}
              className="logo-footer-img"
            />
        </CDBBox>
        <CDBBox>
          <small className="ml-2">&copy; Mohammad Mancy, 2022. All rights reserved.</small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="dark" className="p-2">
          <a href='https://www.facebook.com/mohammad.mancy.33' style={{color:'#fff'}}>
                <CDBIcon fab icon="facebook-f" />
            </a>
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <a href='https://twitter.com/mancy_mohammad' style={{color:'#fff'}}>
                <CDBIcon fab icon="twitter" />
            </a>
          </CDBBtn>
          <CDBBtn flat color="dark" className="p-2">
            <a href='https://www.instagram.com/mohammad.mancy.33/' style={{color:'#fff'}}>
                <CDBIcon fab icon="instagram" />
            </a>
          </CDBBtn>
          <CDBBtn flat color="dark" className="mx-3 p-2">
            <a href='https://www.linkedin.com/in/mohammad-mancy-75b591227/' style={{color:'#fff'}}>
                <CDBIcon fab icon="linkedin" />
            </a>
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
  );
};