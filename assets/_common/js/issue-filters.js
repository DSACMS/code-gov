(function() {
  'use strict';
  
  const issuesGrid = document.getElementById('issues-grid');
  const ITEMS_PER_PAGE = 20;
  
  let allIssues = [];
  let filteredIssues = [];
  let currentPage = 1;
  
  // Initialize the page
  function init() {
    try {
      console.log('Loading issues...');
      
      // Get the embedded JSON data
      const scriptElement = document.querySelector('script[data-issues]');
      if (!scriptElement) {
        throw new Error('Issues data not found');
      }
      
      allIssues = JSON.parse(scriptElement.textContent);
      console.log('Found', allIssues.length, 'issues');
      
      // Add repo name to each issue
      allIssues.forEach(issue => {
        if (issue.url) {
          const urlParts = issue.url.split('/');
          issue.repoName = urlParts[urlParts.length - 3] || 'Unknown';
        }
      });
      
      filteredIssues = [...allIssues];
      setupEventListeners();
      renderPage();
    } catch (error) {
      console.error('Error loading issues:', error);
      issuesGrid.innerHTML = '<p>Error loading issues.</p>';
    }
  }
  
  // Setup event listeners for filters
  function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const statusSelect = document.getElementById('status-select');
    const typeSelect = document.getElementById('type-select');
    const sortSelect = document.getElementById('sort-select');
    const clearButton = document.getElementById('clear-filters');
    
    if (searchInput) searchInput.addEventListener('input', filterAndRender);
    if (statusSelect) statusSelect.addEventListener('change', filterAndRender);
    if (typeSelect) typeSelect.addEventListener('change', filterAndRender);
    if (sortSelect) sortSelect.addEventListener('change', filterAndRender);
    if (clearButton) clearButton.addEventListener('click', clearFilters);
  }
  
  // Filter and render issues
  function filterAndRender() {
    currentPage = 1;
    applyFilters();
    renderPage();
  }
  
  // Apply filters to issues
  function applyFilters() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('status-select')?.value || '';
    const typeFilter = document.getElementById('type-select')?.value || '';
    const sortBy = document.getElementById('sort-select')?.value || 'created-desc';
    
    // Filter issues
    filteredIssues = allIssues.filter(issue => {
      // Search filter
      if (searchTerm && !issue.title.toLowerCase().includes(searchTerm)) {
        return false;
      }
      
      // Status filter
      if (statusFilter === 'open' && !issue.isOpen) return false;
      if (statusFilter === 'closed' && issue.isOpen) return false;
      
      // Type filter
      if (typeFilter === 'bug' && !issue.isBug) return false;
      if (typeFilter === 'feature' && !issue.isFeature) return false;
      if (typeFilter === 'beginner' && !issue.isBeginner) return false;
      if (typeFilter === 'help' && !issue.needsHelp) return false;
      
      return true;
    });
    
    // Sort issues
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
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }
  
  // Clear all filters
  function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('status-select').value = '';
    document.getElementById('type-select').value = '';
    document.getElementById('sort-select').value = 'created-desc';
    filterAndRender();
  }
  
  // Render the current page
  function renderPage() {
    updateResultsCount();
    renderIssues();
    renderPagination();
  }
  
  // Update results count
  function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      const total = filteredIssues.length;
      const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
      const end = Math.min(currentPage * ITEMS_PER_PAGE, total);
      
      if (total === 0) {
        resultsCount.textContent = 'No results found';
      } else {
        resultsCount.textContent = `Showing ${start}-${end} of ${total} issues`;
      }
    }
  }
  
  // Create HTML for a single issue card (keeping original list layout)
  function createIssueCard(issue) {
    // Build labels HTML (simplified to show fewer)
    const labelTags = issue.labels && issue.labels.length > 0 
      ? issue.labels.slice(0, 2).map(label => 
          `<div class="grid-col-auto"><span class="usa-tag">${escapeHtml(label)}</span></div>`
        ).join('')
      : '';
    
    // Build issue type tags
    const typeTags = [];
    if (issue.isBug) typeTags.push('<div class="grid-col-auto"><span class="usa-tag usa-tag--error">Bug</span></div>');
    if (issue.isFeature) typeTags.push('<div class="grid-col-auto"><span class="usa-tag usa-tag--info">Feature</span></div>');
    if (issue.needsHelp) typeTags.push('<div class="grid-col-auto"><span class="usa-tag usa-tag--accent-warm">Help Wanted</span></div>');
    if (issue.isBeginner) typeTags.push('<div class="grid-col-auto"><span class="usa-tag usa-tag--success">Good First Issue</span></div>');
    
    return `
      <div class="issue-card">
        <div class="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
          <header class="usa-card__header">
            <h3 class="usa-card__heading font-heading-lg margin-top-0">
              <a href="${issue.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(issue.title || 'Untitled Issue')}</a>
            </h3>
            <div class="usa-card__subheading font-body-sm text-base-dark">
              ${escapeHtml(issue.owner)}/${escapeHtml(issue.repoName)} • by ${escapeHtml(issue.author)}
            </div>
          </header>
          <div class="usa-card__body">
            <div class="font-body-3xs margin-top-1">
              <div class="grid-row grid-gap-1">
                ${typeTags.join('')}
                ${labelTags}
              </div>
            </div>
          </div>
          <div class="usa-card__footer font-body-3xs">
            <div class="grid-row">
              <div class="grid-col-4">
                <span class="text-bold">Status: </span>${issue.isOpen ? 'Open' : 'Closed'}
              </div>
              <div class="grid-col-4">
                <span class="text-bold">Comments: </span>${issue.commentCount}
              </div>
              <div class="grid-col-4">
                <span class="text-bold">Created: </span>${formatDate(issue.createdDate)}
              </div>
            </div>
            ${issue.assignee ? `
              <div class="grid-row margin-top-05">
                <div class="grid-col-12">
                  <span class="text-bold">Assigned to: </span>${escapeHtml(issue.assignee)}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
  
  // Render issues for current page (keeping original list layout)
  function renderIssues() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageIssues = filteredIssues.slice(startIndex, endIndex);
    
    if (pageIssues.length === 0) {
      issuesGrid.innerHTML = '<p class="text-center margin-4">No issues found.</p>';
      return;
    }
    
    issuesGrid.innerHTML = pageIssues.map(createIssueCard).join('');
  }
  
  // Render pagination controls
  function renderPagination() {
    const totalPages = Math.ceil(filteredIssues.length / ITEMS_PER_PAGE);
    
    if (totalPages <= 1) {
      return; // No pagination needed
    }
    
    let paginationHtml = '<nav class="usa-pagination margin-top-4" aria-label="Pagination">';
    paginationHtml += '<ul class="usa-pagination__list">';
    
    // Previous button
    if (currentPage > 1) {
      paginationHtml += `
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="usa-pagination__link usa-pagination__previous-page" data-page="${currentPage - 1}">
            <span class="usa-pagination__link-text">Previous</span>
          </button>
        </li>
      `;
    }
    
    // Page numbers (show up to 5 pages around current page)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage;
      paginationHtml += `
        <li class="usa-pagination__item usa-pagination__page-no">
          <button class="usa-pagination__button ${isCurrentPage ? 'usa-current' : ''}" data-page="${i}">
            ${i}
          </button>
        </li>
      `;
    }
    
    // Next button
    if (currentPage < totalPages) {
      paginationHtml += `
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="usa-pagination__link usa-pagination__next-page" data-page="${currentPage + 1}">
            <span class="usa-pagination__link-text">Next</span>
          </button>
        </li>
      `;
    }
    
    paginationHtml += '</ul></nav>';
    
    // Add pagination after the grid
    issuesGrid.insertAdjacentHTML('afterend', paginationHtml);
    
    // Add event listeners to pagination buttons
    document.querySelectorAll('[data-page]').forEach(button => {
      button.addEventListener('click', (e) => {
        currentPage = parseInt(e.target.dataset.page);
        // Remove existing pagination
        const existingPagination = document.querySelector('.usa-pagination');
        if (existingPagination) {
          existingPagination.remove();
        }
        renderPage();
        // Scroll to top of results
        issuesGrid.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  
  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();