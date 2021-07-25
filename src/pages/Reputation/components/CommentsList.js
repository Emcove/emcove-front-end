import React from 'react';
import styled  from 'styled-components';

import { colors } from '../../../styles/palette';

import Card from '../../../components/Card';
import Icon from '../../../components/Icons';
import Title from '../../../components/Title';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
  padding: 16px 0 0;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const User = styled.p`
  font-weight: 600;
  color: ${colors.textColor};
  font-size: 20px;
  margin: 0 0 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const EmptyMessage = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
`;

const CommentContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CommentTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const CommentDescription = styled.p`
  font-size: 16px;
  margin: 0;
`;

const CommentsList = ({ comments, wording }) => (
  <>
    <Title>Comentarios</Title>
    <Container className="comment-list__container">
      {comments && comments.map(comment => (
        <Card animated vertical className="comment-list__card">
          <UserInfo>
            <User>{comment.username}</User>
            <Icon type={`reputation-${comment.value}`} className="comment-list__icon" />
          </UserInfo>
          <CommentContent>
            <CommentTitle>{comment.title}</CommentTitle>
            <CommentDescription>{comment.description}</CommentDescription>
          </CommentContent>
        </Card>
      ))}
      {(!comments || comments.length === 0) && <EmptyMessage>{wording}</EmptyMessage>}
    </Container>
  </>
);

export default CommentsList;
