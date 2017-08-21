

export default class ScrollIn extends React.Component {

  fixedStyle = {
    position: 'fixed',
    WebkitTransition: 'all .2s ease-in-out',
    MozTransition: 'all .2s ease-in-out',
    OTransition: 'all .2s ease-in-out',
    transition: 'all .2s ease-in-out',
    bottom: '1rem',
    right: '1rem',
    zIndex: 1
  };

  hiddenStyle = {
    WebkitTransform: 'translateY(200%)',
    MsTransform: 'translateY(200%)',
    transform: 'translateY(200%)'
  };

  scrolledInStyle = {
    WebkitTransform: 'translateY(0)',
    MsTransform: 'translateY(0)',
    transform: 'translateY(0)'
  };




}