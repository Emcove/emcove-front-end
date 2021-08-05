const colors = {
  primary: '#5BC0EB',
  yellow: '#FDE74C',
  yellowCategory: '#c1b038',
  success: '#9BC53D',
  error: '#E55934',
  pink: '#e05982',
  warning: '#FA7921',
  lightGray: '#b3aeae',
  textColor: '#333',
  primaryTen: 'rgba(91, 192, 235, 0.1)',
  white: '#fff',
  background: '#f5f5f5',
  grayBorder: '#b3aeae82',
  primaryHover: '#5bc0eb3d',
  successHover: 'rgba(155, 197, 61, 0.1)',
  errorHover: 'rgba(229, 89, 52, 0.1)',
  warningHover:'rgba(250, 121, 33, 0.1)',
  yellowHover: 'rgba(253, 231, 76, 0.17)',
  pinkHover: 'rgba(224, 89, 130, 0.1)',
  skeletonGray: '#efefef',
};

const categories = {
  Belleza: { primary: colors.primary, hover: colors.primaryTen },
  Cocina: { primary: colors.success, hover: colors.successHover },
  Artesanal: { primary: colors.yellowCategory, hover: colors.yellowHover },
  Herramientas: { primary: colors.warning, hover: colors.warningHover },
  Servicios: { primary: colors.pink, hover: colors.pinkHover },
  Deco: { primary: colors.error, hover: colors.errorHover },
  BELLEZA: { primary: colors.primary, hover: colors.primaryTen },
  COCINA: { primary: colors.success, hover: colors.successHover },
  ARTESANAL: { primary: colors.yellowCategory, hover: colors.yellowHover },
  HERRAMIENTAS: { primary: colors.warning, hover: colors.warningHover },
  SERVICIOS: { primary: colors.pink, hover: colors.pinkHover },
  DECO: { primary: colors.error, hover: colors.errorHover },
};

module.exports = {
  colors,
  categories,
};
