import BusinessListItem from './BusinessListItem';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BusinessList = ({businessList}) => {
  
  return (
    <Container>
      {businessList && businessList.map(business => (
        <BusinessListItem animated business={business} />
      ))}
    </Container>
);
}
export default BusinessList;
