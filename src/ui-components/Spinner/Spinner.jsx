import styled, { keyframes } from 'styled-components';
import { Colors } from 'constants/constants';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const sizes = {
  small: 20,
  large: 50
}
 
const Spinner = styled.div`
  margin: auto;
  width: ${({ size }) => sizes[size]}px;
  height: ${({ size }) => sizes[size]}px;
  border: 3px solid ${Colors.PRIMARY_BLUE};
  border-radius: 50%;
  border-top-color: ${Colors.PRIMARY_WHTIE};
  animation: 1s ${spin} infinite ease-in-out
`;

export default Spinner;