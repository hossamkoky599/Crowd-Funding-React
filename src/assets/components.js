import styled from "styled-components";
import bgImage from '../assets/images/logoo.png'; // adjust path as needed
import crowdBg from '../assets/images/515.jpg';


export const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    url(${crowdBg});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 678px;
  max-width: 100%;
  min-height: 640px;
`;

export const SignUpContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${props =>
    props.signingIn !== true
      ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
      `
      : null}
`;

export const SignInContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${props => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.2s ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: transparent;
    border-color: #e63e1f;
    color:#e63e1f;
  }
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: #e63e1f;
    color: #ffffff;
  }
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

export const OverlayContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${props =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  background-image: linear-gradient(to right, rgba(250, 118, 95, 0.8), rgba(250, 125, 154, 0.8)), url(${bgImage}); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${props => (props.signingIn !== true ? `transform: translateX(50%);` : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;
export const LeftOverlayPanel = styled(OverlayPanel).withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  transform: translateX(-20%);
  ${props => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel).withConfig({
  shouldForwardProp: (prop) => prop !== "signingIn",
})`
  right: 0;
  transform: translateX(0);
  ${props => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
const buttonStyle = {
  background: 'linear-gradient(to right, #832ef9, #d94fcd)',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '14px',
  border: 'none',
  cursor: 'pointer',
  transition: 'background 0.3s ease, transform 0.2s ease',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
};
const handleMouseEnter = (e) => {
  e.currentTarget.style.transform = 'scale(1.05)';
};

const handleMouseLeave = (e) => {
  e.currentTarget.style.transform = 'scale(1)';
};

// Profile Image
export const ProfileWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  
  border: 2px solid #ff4b2b;
  object-fit: cover;
  transition: 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(255, 75, 43, 0.4);
  }
`;
