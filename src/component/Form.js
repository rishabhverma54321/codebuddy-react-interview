import React, { useState } from 'react';
// import regex from 'uuid/dist/regex';
import '../css/form.css';

function Form() {
  const [currStep, setCurrStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [addError, setAddError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [button, setButton] = useState(0);
  const [phoneError, setPhoneError] = useState(false);
  const [checkbox, setCheckBox] = useState(false);
  const countryCode = ['+91', '+1'];

  const url = process.env.REACT_APP_API_URL;

  const handleFirstForm = e => {
    e.preventDefault();
    console.log(e.target.value);

    if (currStep === 0) {
      const regex = /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/;

      if (email === '') {
        document.getElementById('exampleInputEmail1').style.border = '1px solid red';
      } else if (password === '') {
        document.getElementById('exampleInputPassword1').style.border = '1px solid red';
      } else if (!regex.test(password)) {
        setError(true);
      } else if (button === 1) {
        alert('your value is save');
      } else {
        setCurrStep(1);
      }
    } else if (currStep === 1) {
      if (button === 0) {
        setCurrStep(step => step - 1);
      }

      const regex1 = /^[a-zA-Z]/g;
      if (
        firstName === '' ||
        !regex1.test(firstName) ||
        (firstName.length < 2 && firstName.length > 50)
      ) {
        setFirstNameError(true);
        document.getElementById('firstName').style.border = '1px solid red';
      } else if (address.length < 10) {
        setAddError(true);
        setlastNameError(false);
      } else if (button === 1) {
        alert('yout data is save');
      } else {
        setCurrStep(step => step + 1);
      }
    } else if (currStep === 2) {
      if (button === 0) {
        setCurrStep(step => step - 1);
      }

      const regex2 = /^[6-9]\d{9}$/;
      if (!regex2.test(phone) || phone === '') {
        setPhoneError(true);
      } else if (!checkbox) {
        alert('please fill checkbox');
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(`${url}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        'emailId': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
        'address': address,
        'countryCode': '+91',
        'phoneNumber': phone,
      }),
    });

    const content = await response.json();
    console.log(content);
  };

  console.log(checkbox);
  return (
    <div className="main_container d-flex  justify-content-center flex-column align-items-center">
      <form className=" first_form_container" onSubmit={handleFirstForm}>
        {currStep === 0 && (
          <>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="fs-4 form-label">
                Email address
              </label>
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label fs-4">
                Password
              </label>
              <p className={`error_font ${!error && 'd-none'} `}>
                ** Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special
                characters. **
              </p>
              <input
                type="password"
                className="form-control"
                onChange={e => setPassword(e.target.value)}
                id="exampleInputPassword1"
              />
            </div>
          </>
        )}
        {currStep === 1 && (
          <>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="fs-4 form-label">
                First Name
              </label>
              <p className={`error_font ${!firstNameError && 'd-none'} `}>
                ** llow only alphabets. Minimum of 2 character and maximum 50 **
              </p>
              <input
                onChange={e => setFirstName(e.target.value)}
                type="text"
                className="form-control"
                id="firtName"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="fs-4 form-label">
                Last Name
              </label>
              <p className={`error_font ${!lastNameError && 'd-none'} `}>
                ** Only Contain alphabets **
              </p>
              <input
                onChange={e => setLastName(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="fs-4 form-label">
                Address
              </label>
              <p className={`error_font ${!addError && 'd-none'} `}>**must be greater then 10 **</p>
              <input
                onChange={e => setAddress(e.target.value)}
                type="area"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
          </>
        )}
        {currStep === 2 && (
          <>
            <div className="mb-3 ">
              <label htmlFor="exampleInputEmail1" className="fs-4 form-label">
                Phone Number
              </label>
              <p className={`error_font ${!phoneError && 'd-none'} `}>
                **Number must be 10 digits **
              </p>
              <span>
                <select id="country">
                  <option value="india">+91</option>
                  <option value="america">+1</option>
                </select>
              </span>
              <input
                type="tel"
                className="form-control rounded-0 p-2 fs-5"
                placeholder="Number"
                aria-describedby="emailHelp "
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                id="checkboxNoLabel"
                value=""
                aria-label="..."
                onChange={e => setCheckBox(e.target.checked)}
              />
            </div>
          </>
        )}
        <div className="mt-4">
          <button
            className={` m-2 btn btn-info ${currStep === 0 && 'disabled'}`}
            onClick={() => setButton(0)}
            type="submit"
          >
            Back
          </button>
          <button className="m-2 btn btn-info" type="submit" onClick={() => setButton(1)}>
            Save
          </button>
          <button
            className={` m-2 btn btn-info ${currStep === 2 && 'disabled'}`}
            type="submit"
            onClick={() => setButton(2)}
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
