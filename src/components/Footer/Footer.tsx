import React, { useEffect, useState } from 'react';

export const Footer = () => {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchLastCommitDate = async () => {
      const response = await fetch('https://api.github.com/repos/C-Naoki/portfolio/commits?per_page=1');
      const commits = await response.json();
      if (commits.length > 0) {
        const lastCommitDate = new Date(commits[0].commit.committer.date);
        const formattedDate = lastCommitDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        setLastUpdated(formattedDate);
      }
    };

    fetchLastCommitDate();
  }, []);

  return (
    <footer style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <p>© 2023 Naoki Chihara. All rights reserved. Last updated on {lastUpdated}</p>
    </footer>
  );
};

export default Footer;
