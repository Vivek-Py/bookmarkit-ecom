// Component for If condition
// Declarative syntax

const If = ({ condition, children, otherwise }) => {
  return condition ? children : otherwise;
};

export default If;
