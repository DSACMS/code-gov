const createIssueFilterState = (data) => ({
  originalData: data,
  filteredData: [...data],
  targetType: 'issues',
  filters: {},
  sortBy: 'created-desc'
});

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
};

const applySearchFilter = (data, searchTerm) => {
  if (!searchTerm) return data;

  return data.filter(issue => {
      const searchFields = [
          issue.title || '',
          issue.owner || '',
          issue.repoName || '',
          issue.author || '',
          (issue.labels || []).join(' ')
      ].join(' ').toLowerCase();
      
      return searchFields.includes(searchTerm.toLowerCase());
  });
};

const applySelectFilters = (data, filters) => {
  return Object.entries(filters).reduce((filtered, [key, value]) => {
      if (!value || key === 'search') return filtered;

      return filtered.filter(issue => {
          switch (key) {
              case 'status':
                  if (value === 'Open' && !issue.isOpen) return false;
                  if (value === 'Closed' && issue.isOpen) return false;
                  if (value === 'Assigned' && !issue.hasAssignee) return false;
                  if (value === 'Unassigned' && issue.hasAssignee) return false;
                  if (value === 'Bug' && !issue.isBug) return false;
                  if (value === 'Feature' && !issue.isFeature) return false;
                  if (value === 'Help Wanted' && !issue.needsHelp) return false;
                  if (value === 'Good First Issue' && !issue.isBeginner) return false;
                  return true;
              case 'agency':
              case 'org':
                  return issue.owner === value;
              default:
                  return issue[key] === value;
          }
      });
  }, data);
};

const sortData = (data, sortBy) => {
  const [field, direction] = sortBy.split('-');

  return [...data].sort((a, b) => {
      let aVal, bVal;

      switch (field) {
          case 'created':
              aVal = new Date(a.createdDate);
              bVal = new Date(b.createdDate);
              break;
          case 'modified':
              aVal = new Date(a.lastUpdated);
              bVal = new Date(b.lastUpdated);
              break;
          case 'name':
              aVal = (a.title || '').toLowerCase();
              bVal = (b.title || '').toLowerCase();
              break;
          default:
              return 0;
      }

      if (direction === 'desc') {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
  });
};

const processFilters = (state) => {
  let filtered = [...state.originalData];
  
  filtered = applySearchFilter(filtered, state.filters.search);
  filtered = applySelectFilters(filtered, state.filters);
  filtered = sortData(filtered, state.sortBy);

  return {
      ...state,
      filteredData: filtered
  };
};

const escapeHtml = (text) => {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text.toString();
  return div.innerHTML;
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
  } catch (e) {
      return 'Invalid Date';
  }
};

const createIssueCardHTML = (issue) => {
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
};

const createCard = (item, targetType) => {
  const cardElement = document.createElement('div');
  cardElement.innerHTML = createIssueCardHTML(item);
  return cardElement.firstElementChild;
};

const updateDisplay = (state) => {
  const container = document.getElementById('issues-grid');
  if (!container) return;

  if (state.filteredData.length === 0) {
      container.innerHTML = '<p class="text-center margin-4">No issues found matching your filters.</p>';
      return;
  }

  container.innerHTML = '';
  state.filteredData.forEach(item => {
      const card = createCard(item, state.targetType);
      container.appendChild(card);
  });
};

const updateResultCount = (state) => {
  const countElement = document.getElementById('results-count');
  if (countElement) {
      const total = state.filteredData.length;
      if (total === 0) {
          countElement.textContent = 'No results found';
      } else {
          countElement.textContent = `Showing ${total} issues`;
      }
  }
};

const handleSearchInput = (state, setState) => debounce((e) => {
  const newState = {
      ...state,
      filters: {
          ...state.filters,
          search: e.target.value.toLowerCase().trim()
      }
  };

  const processedState = processFilters(newState);
  setState(processedState);
  updateDisplay(processedState);
  updateResultCount(processedState);
}, 300);

const handleSelectChange = (state, setState) => (e) => {
  const filterName = e.target.name || e.target.id.replace('-select', '');
  const newState = {
      ...state,
      filters: {
          ...state.filters,
          [filterName]: e.target.value
      }
  };

  const processedState = processFilters(newState);
  setState(processedState);
  updateDisplay(processedState);
  updateResultCount(processedState);
};

const handleSortChange = (state, setState) => (e) => {
  const newState = {
      ...state,
      sortBy: e.target.value
  };

  const processedState = processFilters(newState);
  setState(processedState);
  updateDisplay(processedState);
  updateResultCount(processedState);
};

const handleClearFilters = (state, setState) => () => {
  const clearedState = {
      ...state,
      filters: {},
      sortBy: 'created-desc'
  };

  // Clear all form inputs
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

  const processedState = processFilters(clearedState);
  setState(processedState);
  updateDisplay(processedState);
  updateResultCount(processedState);
};

const bindEvents = (state, setState) => {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput(state, setState));
  }

  const selects = [
      'status-select',
      'agency-select', 
      'org-select'
  ];

  selects.forEach(selectId => {
      const select = document.getElementById(selectId);
      if (select) {
          select.addEventListener('change', handleSelectChange(state, setState));
      }
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
      sortSelect.addEventListener('change', handleSortChange(state, setState));
  }

  const clearButton = document.getElementById('clear-filters');
  if (clearButton) {
      clearButton.addEventListener('click', handleClearFilters(state, setState));
  }
};

const preprocessIssuesData = (issues) => {
  return issues.map(issue => {
      // Extract repo name from URL
      if (issue.url) {
          const urlParts = issue.url.split('/');
          issue.repoName = urlParts[urlParts.length - 3] || 'Unknown';
      }
      
      // Ensure boolean properties exist
      issue.isBeginner = issue.isBeginner || false;
      issue.needsHelp = issue.needsHelp || false;
      issue.isBug = issue.isBug || false;
      issue.isFeature = issue.isFeature || false;
      
      return issue;
  });
};

const initializeIssueFilters = (data) => {
  const processedData = preprocessIssuesData(data);
  let state = createIssueFilterState(processedData);
  
  const setState = (newState) => {
      state = newState;
  };

  bindEvents(state, setState);
  updateDisplay(state);
  updateResultCount(state);

  return {
      getState: () => state,
      setState
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const issuesGrid = document.getElementById('issues-grid');
  if (issuesGrid) {
      const dataScript = document.querySelector('script[data-issues]');

      if (dataScript) {
          try {
              const data = JSON.parse(dataScript.textContent);
              console.log('Found', data.length, 'issues');
              initializeIssueFilters(data);
          } catch (error) {
              console.error('Error parsing data for issues filters:', error);
              issuesGrid.innerHTML = '<p>Error loading issues. Please refresh or contact us.</p>';
          }
      }
  }
});