import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Title from "../../../components/Title";
import Card from "../../../components/Card";
import ListSkeleton from "../../../components/List/ListSkeleton";

import SubscriptionService from "../../../services/SubscriptionService";

import { colors } from "../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 32px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.lightGray};
`;

const Options = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlanTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.textColor};
  text-decoration: none;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.textColor};
  text-decoration: none;
`;

const SubscriptionDetail = () => {
  const [isLoading, setLoading] = useState(true);
  const [mpPreferences, setMPPreferences] = useState([]);

  useEffect(() => {
    SubscriptionService.getMPPreferences().then(response => {
      setLoading(false);
      if(response.status !== 200) {
        setMPPreferences([]);
        return;
      }

      setMPPreferences(response.data);
    });
  }, []);
  
  return (
    <Container>
      <Title>Elegí un plan</Title>
      <Description>Con la compra de uno de estos planes, vas a mejorar la posición en la que aparezcas cuando un usuario busque emprendimientos.</Description>
      {isLoading && <Options><ListSkeleton height="60px" /></Options>}
      {!isLoading &&
        <Options>
          {mpPreferences.map(planOption => (
            <a key={planOption.id} style={{ "textDecoration": "none" }} href={planOption.sandbox_init_point}>
              <Card animated alignment="space-between" min-width="50%">
                <PlanTitle>{planOption.title}</PlanTitle>
                <Price>$ {planOption.price}</Price>
              </Card>
            </a>
          ))}
        </Options>
      }
    </Container>
  );
}

export default SubscriptionDetail;
