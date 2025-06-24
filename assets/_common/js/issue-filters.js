(function() {
    'use strict';
  
    const issuesGrid = document.getElementById('issues-grid');
  
    let allIssues = [];
    let filteredIssues = [];
  
    function init() {
      try {
        const scriptElement = document.querySelector('script[data-issues]');
        if (!scriptElement) {
          throw new Error('Issues data not found');
        }
  
        allIssues = JSON.parse(scriptElement.textContent);
        // console.log('Found', allIssues.length, 'issues');
  
        allIssues.forEach(issue => {
          if (issue.url) {
            const urlParts = issue.url.split('/');
            issue.repoName = urlParts[urlParts.length - 3] || 'Unknown';
          }
          
          issue.isBeginner = issue.isBeginner || false;
          issue.needsHelp = issue.needsHelp || false;
          issue.isBug = issue.isBug || false;
          issue.isFeature = issue.isFeature || false;
        });
  
        filteredIssues = [...allIssues];
        setupEventListeners();
        renderIssues();
        updateResultsCount();
      } catch (error) {
        console.error('Error loading issues:', error);
        issuesGrid.innerHTML = '<p>Error loading issues. Please refresh or contact us.</p>';
      }
    }
  
    function setupEventListeners() {
      const searchInput = document.getElementById('search-input');
      const statusSelect = document.getElementById('status-select');
      const agencySelect = document.getElementById('agency-select');
      const orgSelect = document.getElementById('org-select');
      const sortSelect = document.getElementById('sort-select');
      const clearButton = document.getElementById('clear-filters');
  
      if (searchInput) searchInput.addEventListener('input', debounce(filterAndRender, 300));
      if (statusSelect) statusSelect.addEventListener('change', filterAndRender);
      if (agencySelect) agencySelect.addEventListener('change', filterAndRender);
      if (orgSelect) orgSelect.addEventListener('change', filterAndRender);
      if (sortSelect) sortSelect.addEventListener('change', filterAndRender);
      if (clearButton) clearButton.addEventListener('click', clearFilters);
    }
  
    // Debounce function for search input
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  
    function filterAndRender() {
      applyFilters();
      renderIssues();
      updateResultsCount();
    }
  
    function applyFilters() {
      const searchTerm = document.getElementById('search-input')?.value.toLowerCase().trim() || '';
      const statusFilter = document.getElementById('status-select')?.value || '';
      const agencyFilter = document.getElementById('agency-select')?.value || '';
      const orgFilter = document.getElementById('org-select')?.value || '';
      const sortBy = document.getElementById('sort-select')?.value || 'created-desc';
  
      filteredIssues = allIssues.filter(issue => {
        if (searchTerm) {
          const searchFields = [
            issue.title || '',
            issue.owner || '',
            issue.repoName || '',
            issue.author || '',
            (issue.labels || []).join(' ')
          ].join(' ').toLowerCase();
          
          if (!searchFields.includes(searchTerm)) {
            return false;
          }
        }
  
        if (statusFilter) {
          if (statusFilter === 'Open' && !issue.isOpen) return false;
          if (statusFilter === 'Closed' && issue.isOpen) return false;
          if (statusFilter === 'Assigned' && !issue.hasAssignee) return false;
          if (statusFilter === 'Unassigned' && issue.hasAssignee) return false;
          if (statusFilter === 'Bug' && !issue.isBug) return false;
          if (statusFilter === 'Feature' && !issue.isFeature) return false;
          if (statusFilter === 'Help Wanted' && !issue.needsHelp) return false;
          if (statusFilter === 'Good First Issue' && !issue.isBeginner) return false;
        }
  
        if (agencyFilter && issue.owner !== agencyFilter) {
          return false;
        }
  
        if (orgFilter && issue.owner !== orgFilter) {
          return false;
        }
  
        return true;
      });
  
      filteredIssues.sort((a, b) => {
        switch (sortBy) {
          case 'created-desc':
            return new Date(b.createdDate) - new Date(a.createdDate);
          case 'created-asc':
            return new Date(a.createdDate) - new Date(b.createdDate);
          case 'modified-desc':
            return new Date(b.lastUpdated) - new Date(a.lastUpdated);
          case 'modified-asc':
            return new Date(a.lastUpdated) - new Date(b.lastUpdated);
          case 'name-asc':
            return (a.title || '').localeCompare(b.title || '');
          case 'name-desc':
            return (b.title || '').localeCompare(a.title || '');
          default:
            return 0;
        }
      });
    }
  
    function clearFilters() {
      const searchInput = document.getElementById('search-input');
      const statusSelect = document.getElementById('status-select');
      const agencySelect = document.getElementById('agency-select');
      const orgSelect = document.getElementById('org-select');
      const sortSelect = document.getElementById('sort-select');
      
      if (searchInput) searchInput.value = '';
      if (statusSelect) statusSelect.value = '';
      if (agencySelect) agencySelect.value = '';
      if (orgSelect) orgSelect.value = '';
      if (sortSelect) sortSelect.value = 'created-desc';
      
      filterAndRender();
    }
  
    function updateResultsCount() {
      const resultsCount = document.getElementById('results-count');
      if (resultsCount) {
        const total = filteredIssues.length;
        if (total === 0) {
          resultsCount.textContent = 'No results found';
        } else {
          resultsCount.textContent = `Showing ${total} issues`;
        }
      }
    }
  
    function createIssueCard(issue) {
      const typeTags = [];
      if (issue.isOpen) {
        typeTags.push('<span class="usa-tag usa-tag--success">Open</span>');
      } else {
        typeTags.push('<span class="usa-tag">Closed</span>');
      }
      
      if (issue.isBug) typeTags.push('<span class="usa-tag usa-tag--error">Bug</span>');
      if (issue.isFeature) typeTags.push('<span class="usa-tag usa-tag--info">Feature</span>');
      if (issue.needsHelp) typeTags.push('<span class="usa-tag usa-tag--accent-warm">Help Wanted</span>');
      if (issue.isBeginner) typeTags.push('<span class="usa-tag usa-tag--accent-cool">Good First Issue</span>');
  
      return `
        <div class="issue-card margin-bottom-2">
          <div class="usa-card__container border-base-light radius-0 border-1px padding-2">
            <h3 class="margin-top-0 margin-bottom-1">
              <a href="${issue.url}" target="_blank" rel="noopener noreferrer" class="usa-link">
                ${escapeHtml(issue.title || 'Untitled Issue')}
              </a>
            </h3>
            
            <div class="margin-bottom-1 text-base-dark font-body-sm">
              ${escapeHtml(issue.owner)}/${escapeHtml(issue.repoName)} created by ${escapeHtml(issue.author)}
            </div>
            
            <div class="margin-bottom-1">
              ${typeTags.join(' ')}
            </div>
            
            <div class="font-body-xs text-base-dark">
              ${issue.commentCount || 0} comments • 
              Created ${formatDate(issue.createdDate)} • 
              Updated ${formatDate(issue.lastUpdated)}
              ${issue.assignee ? ` • Assigned to ${escapeHtml(issue.assignee)}` : ''}
            </div>
          </div>
        </div>
      `;
    }
  
    function renderIssues() {
      if (filteredIssues.length === 0) {
        issuesGrid.innerHTML = '<p class="text-center margin-4">No issues found matching your filters.</p>';
        return;
      }
  
      issuesGrid.innerHTML = filteredIssues.map(createIssueCard).join('');
    }
  
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text.toString();
      return div.innerHTML;
    }
  
    function formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      } catch (e) {
        return 'Invalid Date';
      }
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
  })();