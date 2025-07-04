import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  ...props 
}) => {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      className={clsx(
        'bg-white rounded-lg shadow-sm border border-gray-200',
        hover && 'hover:shadow-md transition-shadow duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      whileHover={hover && onClick ? { y: -2 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </Component>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4 border-b border-gray-200', className)}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;