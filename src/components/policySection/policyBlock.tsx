import React from 'react';
import styles from './policy.module.scss';

interface PolicyBlockProps {
  title: string;
  subtitle?: string;
  desc: string;
}

export const PolicyBlock: React.FC<PolicyBlockProps> = ({
  title,
  subtitle,
  desc,
}) => {
  return (
    <div className={styles.policyBlock}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};
