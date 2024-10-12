import React from 'react';
import styles from './policy.module.scss';
import { PolicyBlock } from './policyBlock';

interface PolicyBlockProps {
  TITLE: string;
  SUBTITLE?: string;
  DESC: string;
}

interface HeaderProps {
  HEADER: string;
}

interface PolicySectionProps {
  header: HeaderProps;
  blocks: PolicyBlockProps[];
}

export const PolicySection: React.FC<PolicySectionProps> = ({
  header,
  blocks,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.headerText}>{header.HEADER}</h1>
        </div>
        {blocks.map((block, index) => (
          <PolicyBlock
            key={index}
            title={block.TITLE}
            subtitle={block.SUBTITLE || ''}
            desc={block.DESC}
          />
        ))}
      </div>
    </section>
  );
};
