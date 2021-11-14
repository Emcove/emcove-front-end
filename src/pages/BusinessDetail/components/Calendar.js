import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import Title from "../../../components/Title";
import Button from "../../../components/Button";

import { colors } from "../../../styles/palette";
import { GAPI_KEY, GCLIENT_ID, GDISCOVERY_DOCS, GSCOPES } from "../../../Constants";

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const EventContainer = styled.div`
  background-color: ${colors.error};
  border-radius: 4px;
  width: 100%;
  padding: 4px 8px;
`;

const EventTitle = styled.span`
  color: ${colors.white};
  font-weight: 600;
`;

const DayPopup = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 10px;
  z-index: 21;
  padding: 20px;
  box-shadow: 6px 7px 37px -7px rgba(0,0,0,0.59);
  -webkit-box-shadow: 6px 7px 37px -7px rgba(0,0,0,0.59);
  -moz-box-shadow: 6px 7px 37px -7px rgba(0,0,0,0.59);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const DayEventContainer = styled.div`
  display: flex;
  padding: 4px 0;
`;

const Text = styled.span`
  font-size: 16px;
  color: ${colors.textColor};

  ${props => props.title && css `
    font-size: 18px;
    font-weight: 500;
    line-height: 2;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 24px;
  width: 100%;
`;

const Calendar = ({ business }) => {
  const [events, setEvents] = useState([]);
  const [dayPopup, showDayPopUp] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const gapi = window.gapi;
    if (gapi && gapi.client){
      fetchCalendarEvents(gapi);
    } else {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: GAPI_KEY,
          clientId: GCLIENT_ID,
          discoveryDocs: GDISCOVERY_DOCS,
          scope: GSCOPES,
        }).then(() => {
          fetchCalendarEvents(gapi);
        });
      });
    }
  }, [business.googleCalendarId]);

  const fetchCalendarEvents = (gapi) => {
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
            title: "Ocupado",
            date: event.start.dateTime,
            endTime: event.end.dateTime,
          };
          return auxObj;
        })
        setEvents(auxArray);
      }
    });
  }
  
  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.date).toLocaleDateString();
    const dayEvents = events.filter(event => new Date (event.date).toLocaleDateString() === clickedDate);
    
    if (!!dayEvents.length) {
      setDayEvents(dayEvents);
      showDayPopUp(true);
    }
  };

  const renderEventContent = (event) => (
    <EventContainer>
      <EventTitle>{event.event.title}</EventTitle>
    </EventContainer>
  )

  return (
    <Container className="calendar-container">
      <Title>Disponibilidad de {business.name}</Title>
      {dayPopup &&
      <DayPopup>
        <div>
        <Text title>Ocupación día {new Date(dayEvents[0].date).toLocaleDateString()}</Text>
        {dayEvents.map(event => (
          <DayEventContainer>
            <Text>
              {new Date (event.date).getHours()}:{new Date (event.date).getMinutes() < 10 ? `0${new Date (event.date).getMinutes()}` : new Date (event.date).getMinutes()}
            </Text>
            <Text>{" - "}</Text>
            <Text>
              {new Date (event.endTime).getHours()}:{new Date (event.endTime).getMinutes() < 10 ? `0${new Date (event.endTime).getMinutes()}` : new Date (event.endTime).getMinutes()} No disponible
            </Text>
          </DayEventContainer>
        ))}
        <ButtonContainer>
          <Button primary onClick={() => showDayPopUp(false)}>Cerrar</Button>
        </ButtonContainer>
        </div>
      </DayPopup>  
      }
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends
        locale="es"
        events={events}
        eventContent={renderEventContent}
        dateClick={(e) => handleDateClick(e)}
      />
    </Container>
  );
}

export default Calendar;
