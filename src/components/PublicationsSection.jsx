import React, { memo, useMemo, useState } from 'react';
import publicationsBib from '../data/publicationsBib.js';

// Journal badge color mapping
const getBadgeColor = (journal) => {
  const colors = {
    'Agriculture': '#4ade80',
    'Preprint': '#3b82f6',
    'Microbiology Spectrum': '#f97316',
    'New Biotechnology': '#8b5cf6',
    'Applied Microbiology and Biotechnology': '#06b6d4',
    'Scientific Data': '#0891b2',
    'Frontiers in Plant Science': '#22c55e',
    'Frontiers in Genetics': '#10b981',
    'BMC genomics': '#0891b2',
    'Molecular biology and evolution': '#ec4899',
    'Frontiers in Physiology': '#14b8a6',
    'npj Emerging Contaminants': '#0ea5e9',
    'PLOS Global Public Health': '#a855f7'
  };
  return colors[journal] || '#6b7280';
};

// Get shorter badge label for display
const getBadgeLabel = (journal) => {
  const labels = {
    'Applied Microbiology and Biotechnology': 'Appl Microbiol Biotech',
    'Microbiology Spectrum': 'Microbiol Spectrum',
    'New Biotechnology': 'New Biotech',
    'Scientific Data': 'Sci Data',
    'Frontiers in Plant Science': 'Front Plant Sci',
    'Frontiers in Genetics': 'Front Genetics',
    'Frontiers in Physiology': 'Front Physiology',
    'Molecular biology and evolution': 'Mol Biol Evol',
    'BMC genomics': 'BMC Genomics',
    'Preprint': 'Preprint',
    'Agriculture': 'Agriculture',
    'npj Emerging Contaminants': 'npj Emerg Contam',
    'PLOS Global Public Health': 'PLOS Glob Public Health',
  };
  return labels[journal] || journal;
};

// Function to truncate author list
const getAuthorsDisplay = (authors, isExpanded) => {
  const authorList = authors.split(',').map(a => a.trim());

  if (authorList.length <= 3) {
    return authors;
  }

  if (isExpanded) {
    return authors;
  }

  // Show first 3 authors and count the rest
  const firstThree = authorList.slice(0, 3).join(', ');
  const remaining = authorList.length - 3;
  return { firstThree, remaining };
};

// Memoized publication item component
const PublicationItem = memo(({ pub }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBib, setShowBib] = useState(false);
  const badgeColor = getBadgeColor(pub.journal);
  const badgeLabel = getBadgeLabel(pub.journal);

  // Split authors for staggered animation
  const authorList = pub.authors.split(',').map(a => a.trim());
  const shouldTruncate = authorList.length > 3;
  const displayedAuthors = shouldTruncate && !isExpanded ? authorList.slice(0, 3) : authorList;
  const hiddenCount = shouldTruncate ? authorList.length - 3 : 0;

  return (
    <div className="pub-entry-simple">
      <div
        className="pub-badge"
        style={{ backgroundColor: badgeColor }}
        title={pub.journal} // Show full journal name on hover
      >
        {badgeLabel}
      </div>

      <div className="pub-content-simple">
        <h3 className="pub-title-simple">{pub.title}</h3>

        <p className="pub-authors-simple">
          {displayedAuthors.map((author, index) => (
            <span
              key={index}
              className={isExpanded && index >= 3 ? 'author-reveal' : ''}
              style={isExpanded && index >= 3 ? {
                animationDelay: `${(index - 3) * 0.1}s`
              } : {}}
            >
              {author}
              {index < displayedAuthors.length - 1 && ', '}
            </span>
          ))}
          {shouldTruncate && !isExpanded && (
            <>
              {', and '}
              <button
                className="expand-authors-link"
                onClick={() => setIsExpanded(true)}
              >
                {hiddenCount} more author{hiddenCount > 1 ? 's' : ''}
              </button>
            </>
          )}
        </p>

        <p className="pub-venue-simple">
          <em>{pub.journal}</em>, {pub.year}
        </p>

        <div className="pub-buttons">
          {pub.url && (
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pub-action-btn"
            >
              HTML
            </a>
          )}
          <button
            className="pub-action-btn"
            onClick={() => setShowBib(!showBib)}
          >
            BIB
          </button>
        </div>

        {showBib && (
          <div className="bibtex-container">
            <pre className="bibtex-code">{pub.bibtex}</pre>
          </div>
        )}
      </div>

      <div className="pub-year-display">{pub.year}</div>
    </div>
  );
});

PublicationItem.displayName = 'PublicationItem';

const PublicationsSection = () => {
  // Sort publications by year (newest first)
  const publications = useMemo(
    () => publicationsBib.sort((a, b) => b.year - a.year),
    []
  );

  return (
    <section id="publications" className="publications-section">
      <div className="section-container">
        <h2 className="section-title">publications</h2>
        <p className="publications-subtitle">
          publications by categories in reversed chronological order
        </p>

        <div className="publications-list-simple">
          {publications.map((pub, index) => (
            <PublicationItem key={pub.id || index} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(PublicationsSection);
