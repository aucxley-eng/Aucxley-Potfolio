import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectDetail.module.css';

function SchemaViewer({ schema }) {
  const [expandedTable, setExpandedTable] = useState(null);
  const [highlightRel, setHighlightRel] = useState(null);

  const toggleTable = (name) => {
    setExpandedTable(prev => prev === name ? null : name);
  };

  return (
    <div className={styles.schemaContainer}>
      <div className={styles.schemaHeader}>
        <h3 className={styles.schemaTitle}>
          Database Schema
          <span className={styles.tableCount}>{schema.tables.length} tables</span>
        </h3>
        <p className={styles.schemaDesc}>
          Click a table to explore its columns and relationships. Lines show foreign key connections.
        </p>
      </div>

      <div className={styles.erdGrid}>
        {schema.tables.map((table) => {
          const isExpanded = expandedTable === table.name;
          const isHighlighted = highlightRel && (
            highlightRel === table.name ||
            schema.relationships.some(r =>
              (r.from === highlightRel && r.to === table.name) ||
              (r.to === highlightRel && r.from === table.name)
            )
          );

          return (
            <motion.div
              key={table.name}
              layout
              className={`${styles.tableCard} ${isHighlighted ? styles.highlighted : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className={styles.tableHeader}
                onClick={() => toggleTable(table.name)}
                onMouseEnter={() => setHighlightRel(table.name)}
                onMouseLeave={() => setHighlightRel(null)}
              >
                <div className={styles.tableNameRow}>
                  <svg className={styles.tableIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <span className={styles.tableName}>{table.name}</span>
                </div>
                <div className={styles.tableMeta}>
                  <span className={styles.columnCount}>{table.columns.length} cols</span>
                  <motion.svg
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className={styles.tableBody}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.tableDesc}>{table.description}</div>
                    {table.unique && (
                      <div className={styles.uniqueBadge}>
                        UNIQUE: {table.unique}
                      </div>
                    )}
                    <div className={styles.columns}>
                      <div className={styles.colHeader}>
                        <span>Column</span>
                        <span>Type</span>
                        <span>Constraints</span>
                      </div>
                      {table.columns.map(col => (
                        <div key={col.name} className={styles.colRow}>
                          <div className={styles.colName}>
                            {col.constraints.includes('PK') && (
                              <span className={styles.pkBadge} title="Primary Key">PK</span>
                            )}
                            {col.constraints.includes('FK') && (
                              <span className={styles.fkBadge} title="Foreign Key">FK</span>
                            )}
                            {col.name}
                          </div>
                          <div className={styles.colType}>{col.type}</div>
                          <div className={styles.colConstraints}>{col.constraints}</div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.relationships}>
                      <h4 className={styles.relTitle}>Relationships</h4>
                      {schema.relationships
                        .filter(r => r.from === table.name || r.to === table.name)
                        .map((rel, i) => (
                          <div key={i} className={styles.relRow}>
                            <span className={styles.relFrom}>{rel.from}</span>
                            <span className={`${styles.relArrow} ${
                              rel.type === '1:1' ? styles.relOneOne : styles.relOneMany
                            }`}>
                              {rel.type === '1:1' ? '───' : '──╼'}
                            </span>
                            <span className={styles.relTo}>{rel.to}</span>
                            <span className={styles.relVia}>(via {rel.via})</span>
                            {rel.note && <span className={styles.relNote}>{rel.note}</span>}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.legends}>
        <div className={styles.legend}>
          <span className={`${styles.pkBadge} ${styles.legendBadge}`}>PK</span>
          <span>Primary Key</span>
        </div>
        <div className={styles.legend}>
          <span className={`${styles.fkBadge} ${styles.legendBadge}`}>FK</span>
          <span>Foreign Key</span>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLine}>───</span>
          <span>One-to-One</span>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLine}>──╼</span>
          <span>One-to-Many</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetail({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleRow}>
            <h2 className={styles.modalTitle}>{project.title}</h2>
            <span className={styles.modalDate}>{project.date}</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.tabs}>
          {['overview', ...(project.schema ? ['schema'] : [])].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' ? 'Overview' : 'Database Schema'}
            </button>
          ))}
        </div>

        <div className={styles.modalBody}>
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.imageSection}>
                <img src={project.imageUrl} alt={project.title} className={styles.detailImage} />
              </div>

              <p className={styles.detailDesc}>{project.description}</p>

              {project.problem && (
                <div className={styles.problemCard}>
                  <h4 className={styles.problemTitle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    The Problem It Solves
                  </h4>
                  <p className={styles.problemText}>{project.problem}</p>
                </div>
              )}

              <div className={styles.detailGrid}>
                <div className={styles.detailCard}>
                  <h4 className={styles.detailCardTitle}>Tech Stack</h4>
                  <div className={styles.techList}>
                    {project.technologies.map(tech => (
                      <span key={tech} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                  <p className={styles.techDetail}>{project.techDetail}</p>
                </div>

                <div className={styles.detailCard}>
                  <h4 className={styles.detailCardTitle}>Key Features</h4>
                  <ul className={styles.featureList}>
                    {project.highlights.map((h, i) => (
                      <li key={i} className={styles.featureItem}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'schema' && project.schema && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <SchemaViewer schema={project.schema} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
