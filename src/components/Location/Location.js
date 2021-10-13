
import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from '../Modal';
import TextInput from '../TextInput';
import Subtitle from '../Subtitle';

const Container = styled.div`
  width: 100%;
`;

const Location = ({ visible, closeModal }) => {
  const [address, setAddress] = useState('');
  const [addressList, setAddressList] = useState([]);

  const google = window.google;
  const options = {
    componentRestrictions: { country: "ar" },
    fields: ["formatted_address", "address_components"],
    strictBounds: false,
  };
  const input = document.getElementById("locationInput");
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  
  const handleChange = () => {
    const place = autocomplete.getPlace();
    const address = place.address_components;

    if (address) {
      setAddress(place.formatted_address);
    }
  };

  autocomplete.addListener('place_changed', handleChange);

  return (
    <Modal open={visible} minWidth="70%" setVisibility={closeModal}>
      <Container>
        <Subtitle>Agregar puntos de entrega</Subtitle>
        <TextInput
          id="locationInput"
          label="Dirección"
          value={address}
          type="text"
          onChange={(value) => setAddress(value)}
        />
      </Container>
    </Modal>
  )
};


export default Location;