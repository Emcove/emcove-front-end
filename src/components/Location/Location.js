
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Modal from '../Modal';
import TextInput from '../TextInput';
import Subtitle from '../Subtitle';
import Button from '../Button';
import Icon from '../Icons';
import Loading from '../Loading';

import { colors } from '../../styles/palette';

import BusinessService from '../../services/BusinessService';

const Container = styled.div`
  width: 100%;
  height: 600px;
`;

const Group = styled.div`
  display: flex;
  align-items: center;

  ${props => props.bottom && css `
    position: absolute;
    bottom: 52px;
    right: 40px;
  `}
`;

const AddressItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: solid 1px ${colors.grayBorder};
`;

const AddressList = styled.div``;

const Text = styled.span`
  font-size: 16px;
  line-height: 1.25;
  color: ${colors.textColor};
`;

const Location = ({ visible, closeModal, businessLocations, locations = [] }) => {
  const [address, setAddress] = useState('');
  const [chosenAddress, setChosenAddress] = useState(undefined);
  const [addressList, setAddressList] = useState(locations);
  const [isLoading, setLoading] = useState(false);

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
      const objAddress = {};
      address.reduce((_, curr) => {
        objAddress[curr.types[0]] = curr.long_name;
        return objAddress;
      }, objAddress);
      
      setChosenAddress({ ...objAddress, displayName: place.formatted_address });
      setAddress(place.formatted_address);
    }
  };

  autocomplete.addListener('place_changed', handleChange);

  const addNewLocation = () => {
    if (chosenAddress) {
      setAddressList([...addressList, chosenAddress]);
      setAddress('');
      setChosenAddress(undefined);
    }
  };

  const deleteLocation = (index) => {
    let auxLocations = [...addressList];
    auxLocations.splice(index, 1);

    setAddressList(auxLocations);
  };

  const saveDeliveryPoints = () => {
    setLoading(true);
    const promises = addressList.map(addressItem => {
      const requestObject = {

      };

      return new Promise(BusinessService.addDeliveryPoint(requestObject));
    });
    
    Promise.all(promises).then(responses => {
      console.log(responses);
      isLoading(false);
    });
  };

  return (
    <Modal open={visible} minWidth="70%" setVisibility={closeModal}>
      <Container>
        <Subtitle>Agregar puntos de entrega</Subtitle>
        {businessLocations && <Text>Agregá las direcciones que quieras para que tus clientes retiren sus pedidos.</Text>}
        {!businessLocations && <Text>Agregá las direcciones que quieras para que los emprendedores que hagan envíos te hagan llegar tu pedido.</Text>}
        <Group className="first-group">
          <TextInput
            id="locationInput"
            label="Dirección del punto de entrega"
            value={address}
            type="text"
            onChange={(value) => setAddress(value)}
            placeholder="Ingresá una dirección para el punto de entrega"
          />
          <Button backgroundColor={colors.success} onClick={addNewLocation} alignment="center">
            <Icon type="check" className="done-button__icon"/>
          </Button>
        </Group>
        {!!addressList.length &&
          <AddressList>
          {addressList.map((add, idx) => (
            <AddressItem key={`${add.displayName}-${idx}`}>
              <Text>{add.displayName}</Text>
              {!isLoading &&
                <Button backgroundColor="transparent" onClick={() => deleteLocation(idx)} alignment="center">
                  <Icon type="cross" className="delete-row__icon" />
                </Button>
              }
            </AddressItem>
          ))}
          </AddressList>
        }

        <Group bottom>
          <Button primary disabled={isLoading} onClick={saveDeliveryPoints}>Guardar</Button>
          <Button secondary disabled={isLoading} onClick={() => closeModal(false)}>Cancelar</Button>
        </Group>
      </Container>
    </Modal>
  )
};


export default Location;