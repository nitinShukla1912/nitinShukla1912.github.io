import React from 'react';

const PatentsSection = () => {
  const patents = [
    {
      title: "A cost-effective targeted Next-Generation Sequencing method and kit for High-Resolution HLA Typing using Adapter-Tagged amplicons",
      status: "Submitted",
      year: "2025",
      description: "Patent application for innovative HLA typing technology that provides high-resolution results at significantly reduced costs."
    }
  ];

  return (
    <section id="patents" className="publications-section">
      <div className="section-container">
        <h2 className="section-title">patents</h2>
        <div className="publications-content">
          {patents.map((patent, index) => (
            <div key={index} className="publication-item">
              <div className="publication-title">
                <strong>{patent.title}</strong>
              </div>
              <div className="publication-venue">
                Status: {patent.status} ({patent.year})
              </div>
              <div className="publication-authors">
                {patent.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatentsSection;
