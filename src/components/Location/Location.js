
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Modal from '../Modal';
import TextInput from '../TextInput';
import Subtitle from '../Subtitle';
import Button from '../Button';
import Icon from '../Icons';
import Loading from '../Loading';
import Snackbar from '../Snackbar';

import { colors } from '../../styles/palette';

import BusinessService from '../../services/BusinessService';
import UserService from '../../services/UserService';

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

  ${props => props.hidden && css `
     visibility: hidden;
     height: 32px;
  `}
`;

const AddressItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 0px;
  width: 100%;
`;

const AddressList = styled.div`
  align-items: center;
  width: 100%;
`;

const Text = styled.span`
  font-size: 16px;
  line-height: 1.25;
  color: ${colors.textColor};
`;

const AddressText = styled.span`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.25;
  color: ${colors.textColor};
  border-bottom: solid 1px ${colors.grayBorder};
  margin-right: 16px;
  padding: 4px 10px;
  width: 100%;
`;

const Location = ({ visible, closeModal, businessLocations, locations = [], limit = 4 }) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [chosenAddress, setChosenAddress] = useState(undefined);
  const [addressList, setAddressList] = useState(locations);
  const [isLoading, setLoading] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ show: false });

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
      if (addressList.length + 1 <= limit) {
        chosenAddress.description = description;
        setAddressList([...addressList, chosenAddress]);
        setAddress('');
        setDescription('');
        setChosenAddress(undefined);
      }
    }
  };

  const deleteLocation = (index) => {
    let auxLocations = [...addressList];
    auxLocations.splice(index, 1);

    setAddressList(auxLocations);
  };

  const handleCancel = () => {
    setChosenAddress(undefined);
    closeModal(false);
  };

  const saveDeliveryPoints = () => {
    setLoading(true);
    const Service = businessLocations ? BusinessService : UserService;
    const promises = addressList.map(addressItem => {
      if (addressItem.displayName) {
        const requestObject = {
          phoneNumber: "",
          address: {
            street: addressItem.route ||??"",
            number: parseInt(addressItem.street_number, 10) ||??0,
            postCode: 0,
            floor: "",
            state: addressItem.administrative_area_level_1 ||??"",
            department: addressItem.locality ||??"",
            isHome: true,
            isWork: false,
            description: addressItem.description
          },
          attentionAvailability: ["", ""],
        };

        return Service.addDeliveryPoint(requestObject);
      }

      return null;
    });
    
    Promise.all(promises.filter(promise => promise)).then(responses => {
      const failedRequest = responses.find(promise => promise.status !== 200);
      if (failedRequest) {
        setSnackbarData({
          show: true,
          message: businessLocations ? "Ocurri?? un error guardando tus puntos de entrega, por favor intent?? nuevamente." : "Ocurri?? un error guardando tu direcci??n de entrega, intent?? nuevamente.",
          type: "error",
        });

        setTimeout(() => {
          setSnackbarData({ show: false });
        }, 2000);
      } else {
        setSnackbarData({
          show: true,
          message: businessLocations ? "Puntos de entrega guardados con ??xito." : "Direcci??n guardada correctamente.",
          type: "success",
        });

        setTimeout(() => {
          handleCancel();
          setSnackbarData({ show: false });
        }, 2000);
      }

      setLoading(false);
    });
  };

  return (
    <Modal open={visible} minWidth="70%" setVisibility={handleCancel}>
      <Container>
        <Subtitle>Agregar puntos de entrega</Subtitle>
        {businessLocations && <Text>Agreg?? las direcciones que quieras disponibilizar para que tus clientes retiren sus pedidos.</Text>}
        {businessLocations && limit <= addressList.length  && <Text>Estas son las direcciones que ten??s disponibles para que tus clientes retiren sus pedidos.</Text>}
        {!businessLocations && limit > addressList.length && <Text>Agreg?? tu direcci??n para que los emprendedores que hagan env??os te hagan llegar tus pedidos.</Text>}
        {!businessLocations && limit <= addressList.length && <Text>Esta es la direcci??n en la que los emprendedores te van a hacer llegar tus pedidos en caso de que realicen env??os.</Text>}
        <Group className="first-group" hidden={limit <= addressList.length}>
          <TextInput
            id="locationInput"
            label="Direcci??n del punto de entrega"
            value={address}
            type="text"
            onChange={(value) => setAddress(value)}
            placeholder="Ingres?? una direcci??n para el punto de entrega"
          />
          <TextInput
            id="descriptionInput"
            label="Descripci??n"
            value={description}
            type="text"
            onChange={(value) => setDescription(value)}
            placeholder="Piso, depto, entre calles..."
          />
          <Button backgroundColor={colors.success} onClick={addNewLocation} alignment="center">
            <Icon type="check" className="done-button__icon"/>
          </Button>
        </Group>
        {!!addressList.length &&
          <AddressList>
          {addressList.map((add, idx) => (
            <AddressItem key={`${add.displayName}-${idx}`}>
              {add.displayName && <AddressText>{add.displayName}</AddressText>}
              {!add.displayName && <AddressText>{add.address.street} {add.address.number}, {add.address.department} {add.address.state}</AddressText>}
              <AddressText>{add.description}</AddressText>
              {!isLoading && add.displayName &&
                <Button backgroundColor="transparent" onClick={() => deleteLocation(idx)} alignment="center">
                  <Icon type="cross" className="delete-row__icon" />
                </Button>
              }
            </AddressItem>
          ))}
          </AddressList>
        }

        <Group bottom>
          <Button primary disabled={isLoading} onClick={saveDeliveryPoints}>
            {!isLoading && "Guardar"}
            {isLoading && <Loading component />}
          </Button>
          <Button secondary disabled={isLoading} onClick={() => handleCancel()}>{limit <= addressList.length ? "Cerrar" : "Cancelar"}</Button>
        </Group>
      </Container>
      <Snackbar message={snackbarData.message} show={snackbarData.show} type={snackbarData.type} />
    </Modal>
  )
};


export default Location;