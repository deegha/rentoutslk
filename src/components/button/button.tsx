import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
  borderRadius?: string;
  borderColor?: string;
  padding?: string;
  fontWeight?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick,
  bgColor,
  textColor,
  borderRadius,
  borderColor,
  padding,
  fontWeight,
  type = 'button',
}) => {
  const buttonStyle = {
    '--bg-color': bgColor,
    '--text-color': textColor,
    '--border-radius': borderRadius,
    '--border': borderColor ? `1px solid ${borderColor}` : 'none',
    '--padding': padding,
    '--font-weight': fontWeight,
  } as React.CSSProperties;

  return link ? (
    <a href={link} className={styles.button} style={buttonStyle}>
      {text}
    </a>
  ) : (
    <button
      className={styles.button}
      type={type}
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
