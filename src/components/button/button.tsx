import React, { ReactNode } from 'react';
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
  image?: ReactNode;
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
  image,
}) => {
  const buttonStyle: Record<string, string | undefined> = {
    '--bg-color': bgColor,
    '--text-color': textColor,
    '--border-radius': borderRadius,
    '--border': borderColor ? `1px solid ${borderColor}` : 'none',
    '--padding': padding,
    '--font-weight': fontWeight,
  };

  return link ? (
    <a href={link} className={styles.button} style={buttonStyle}>
      {image && <div className={styles.btnImgBlock}>{image}</div>}
      <p>{text}</p>
    </a>
  ) : (
    <button
      className={styles.button}
      type={type}
      style={buttonStyle}
      onClick={onClick}
    >
      {image && <div className={styles.btnImgBlock}>{image}</div>}
      <p>{text}</p>
    </button>
  );
};
