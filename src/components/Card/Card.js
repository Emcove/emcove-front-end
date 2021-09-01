import styled, { css } from 'styled-components'

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #fff;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  
  ${props => props.animated && css`
      &:hover {
        cursor: pointer;
        box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
      }
  `}

  ${props => props.vertical && css`
      flex-direction: column;
  `}

  ${props => props.minWidth && css`
      min-width: ${props.minWidth};
  `}

  ${props => props.minHeight && css`
      min-height: ${props.minHeight};
  `}

  ${props => props.paddingSize && css `
      padding: ${props.paddingSize};
  `}

  ${props => props.alignment && css `
      justify-content: ${props.alignment};
  `}
`;


export default Card;