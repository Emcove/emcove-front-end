import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { GAPI_KEY, GCLIENT_ID, GDISCOVERY_DOCS, GSCOPES } from "../../../Constants";

import Link from "../../../components/Link";
import Button from "../../../components/Button";

import { colors } from "../../../styles/palette";
import Title from "../../../components/Title";

const Container = styled.div`
  margin-bottom: 40px;
`;

const DisclaimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%auto;
`;

const Disclaimer = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
  line-height: 1.5;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;


const Calendar = ({ business, handleReject }) => {
  const gapi = window.gapi;
  const [events, setEvents] = useState([]);
  const [userAgreed, setUserAgreed] = useState(false);

  useEffect(() => {
    if (!userAgreed) {
      return null;
    }

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: GAPI_KEY,
        clientId: GCLIENT_ID,
        discoveryDocs: GDISCOVERY_DOCS,
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      });

      // GET EVENT LIST FROM CALENDAR
      gapi.auth2.getAuthInstance().signIn().then(() => {
        gapi.client.calendar.events.list({
          'calendarId': business.googleCalendarId,
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 60,
          'orderBy': 'startTime',
        }).then(response => {
          if (response.status === 200) {
            const gcalEvents = response.result.items;

            const auxArray = gcalEvents.map(event => {
              const auxObj = {
                title: event.summary,
                date: event.start.date,
              };

              return auxObj;
            })
            setEvents(auxArray);
          }
        });
      });
    });
  }, [userAgreed]);

  return (
    <Container className="calendar-container">
      <Title>Disponibilidad de {business.name}</Title>
      {!userAgreed &&
        <DisclaimerContainer>
          <Disclaimer>Antes de avanzar, necesitamos realizar una pequeña autenticación con Google, ¿querés continuar?</Disclaimer>
          <ButtonsContainer>
            <Link onClick={() => handleReject()}>Cancelar</Link>
            <Button primary onClick={() => setUserAgreed(true)}>Aceptar</Button>
          </ButtonsContainer>
        </DisclaimerContainer>
      }
      {userAgreed && 
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          weekends
          events={events}
        />
      }
    </Container>
  );
}

export default Calendar;
