import React, { useState } from "react";
import styled from "styled-components";

import Title from "../../../components/Title";
import Button from "../../../components/Button";

import BusinessService from "../../../services/BusinessService";

import { colors } from "../../../styles/palette";

import { GAPI_KEY, GCLIENT_ID, GDISCOVERY_DOCS, GSCOPES } from "../../../Constants";
import Loading from "../../../components/Loading/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 32px;
`;

const Text = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  line-height: 1.5;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  width: 80%;
  margin-top: 48px;
  display: flex;
  justify-content: space-around;
`;

const BlankSpace = styled.div`
  height: 60px;
`;

const GoogleCalendarSetup = ({ business, handleCancel, handleSuccess, handleError }) => {
  const gapi = window.gapi;

  const [isLoading, setLoading] = useState(false);

  const handleCreateEvent = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: GAPI_KEY,
        clientId: GCLIENT_ID,
        discoveryDocs: GDISCOVERY_DOCS,
        scope: GSCOPES,
      });
      
      // Perdon por toda esta cadena de promesas chiquis
      gapi.auth2.getAuthInstance().signIn().then(() => { 
        setLoading(true);
        gapi.client.calendar.calendars.insert({
          summary: business.name,
        }).then(response => {
          if (response.status === 200) {
            const calendarId = response.result.id;

            gapi.client.calendar.acl.insert({
              calendarId: calendarId,
              sendNotifications: false,
              resource: {
                role: "reader",
                scope: {
                  type: "default",
                },
              },
            }).then(resp => {
              if(resp.status === 200) {
                BusinessService.createBusinessCalendar(business.id, calendarId).then(resp => {
                  if (resp.status === 200) {
                    setLoading(false);
                    handleSuccess(resp.data);
                  } 
                });
              }
            });
          } else {
            handleError();
          }
        });
      });
    });
  }
  
  return (
    <Container>
      <Title>Asociar un calendario de Google</Title>
      <Text>Vamos a crear un calendario en Google con el nombre de tu emprendimiento para que puedas gestionar tu tiempo mejor y mostrar tu disponibilidad a tus clientes.</Text>
      <Text>Una vez creado, vas a poder gestionarlo desde la app de Google Calendar o desde su versión web.</Text>
      <BlankSpace />
      <ButtonGroup>
        <Button disabled={isLoading} primary onClick={() => handleCreateEvent()}>
          {!isLoading && "Crear Google Calendar"}
          {isLoading && <Loading component />}
        </Button>
        <Button disabled={isLoading} secondary onClick={() => handleCancel()}>Cancelar</Button>
      </ButtonGroup>
    </Container>
  );
}

export default GoogleCalendarSetup;
