import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

import Title from "../../../components/Title";

const Container = styled.div`
  margin-bottom: 40px;
  width: 100%;
`;

const Calendar = ({ business }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const gapi = window.gapi;
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
            };
            return auxObj;
          })
          setEvents(auxArray);
        }
      });
  }, [business.googleCalendarId]);
  
  const handleDateClick = (arg) => {
    console.log('click: ', arg);
  }

  return (
    <Container className="calendar-container">
      <Title>Disponibilidad de {business.name}</Title>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends
        locale="es"
        events={events}
      />
    </Container>
  );
}

export default Calendar;
