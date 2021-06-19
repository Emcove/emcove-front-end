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
  padding: 24px 0 0;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const User = styled.span`
  font-weight: 600;
  color: ${colors.textColor};
`;

const EmptyMessage = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
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
          <div>
            <span>{comment.title}</span>
            <p>{comment.description}</p>
          </div>
        </Card>
      ))}
      {(!comments || comments.length === 0) && <EmptyMessage>{wording}</EmptyMessage>}
    </Container>
  </>
);

export default CommentsList;
