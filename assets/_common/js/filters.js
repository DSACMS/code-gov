const createFilterState = (data, targetType) => ({
    originalData: data,
    filteredData: [...data],
    targetType,
    filters: {},
    sortBy: 'name-asc'
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

const applySearchFilter = (data, searchTerm, targetType) => {
    if (!searchTerm) return data;

    return data.filter(item => {
        const searchFields = targetType === 'agencies'
            ? [item.name, item.organizations?.join(' ')]
            : [item.name, item.description, item.organization, item.tags?.join(' ')];

        return searchFields.some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));
    });
};

const applySelectFilters = (data, filters, targetType) => {
    return Object.entries(filters).reduce((filtered, [key, value]) => {
        if (!value || key === 'search') return filtered;

        return filtered.filter(item => {
            if (targetType === 'agencies') {
                switch (key) {
                    case 'organization':
                        return item.organizations && item.organizations.includes(value);
                    case 'status':
                        return true;
                    case 'language':
                        return true;
                    case 'category':
                        return true;
                    case 'platform':
                        return true;
                    default:
                        if (Array.isArray(item[key])) {
                            return item[key].includes(value);
                        }
                        return item[key] === value;
                }   
            } else {
                let actualKey = key;
                
                switch (key) {
                    case 'language':
                        actualKey = 'languages'
                        break;
                    case 'category':
                        actualKey = 'categories'
                        break;
                    case 'platform':
                        actualKey = 'platforms'
                        break;
                }

                if (Array.isArray(item[actualKey])) {
                    return item[actualKey].includes(value);
                }
                return item[actualKey] === value;
            }
        });
    }, data);
};

const sortData = (data, sortBy) => {
    const [field, direction] = sortBy.split('-');

    return [...data].sort((a, b) => {
        let aVal, bVal;

        switch (field) {
            case 'name':
                aVal = a.name?.toLowerCase() || '';
                bVal = b.name?.toLowerCase() || '';
                break;
            case 'projects':
                aVal = a.projectCount || 0;
                bVal = b.projectCount || 0;
                break;
            case 'modified':
                aVal = new Date(a.dates?.lastModified || 0);
                bVal = new Date(b.dates?.lastModified || 0);
                break;
            case 'created':
                aVal = new Date(a.dates?.created || 0);
                bVal = new Date(b.dates?.created || 0);
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
   
   filtered = applySearchFilter(filtered, state.filters.search, state.targetType);
   filtered = applySelectFilters(filtered, state.filters, state.targetType);
   filtered = sortData(filtered, state.sortBy);

   return {
    ...state,
    filteredData: filtered
   };
};

const createAgencyCardHTML = (agency) => `
    <div class="agency-card">
        <div class="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
            <div class="usa-card__media usa-card__media--inset display-block pin-top pin-right">
                🏥
            </div>
            <header class="usa-card__header grid-col-9">
                <h3 class="usa-card__heading font-heading-lg margin-top-0">
                    <a href="/agencies/${agency.code}" target="_blank" rel="noopener noreferrer">${ agency.name }</a>
                </h3>
            </header>
            <ul class="width-full usa-card__body font-body-3xs padding-bottom-3 border-bottom-1px border-base-light">
                <li>
                    <span class="text-bold">Projects: </span>${agency.projectCount}
                </li>
                <li>
                    <span class="text-bold">Code.JSON: </span>
                    <a href="#" target="_blank" rel="noopener noreferrer">PLACEHOLDER</a>
                </li>
            </ul>
            <div class="usa-card__footer font-body-3xs padding-bottom-1 padding-top-1px grid-container margin-0">
                <div class="grid-row margin-bottom-105">
                    <div class="grid-col-12">
                        <span class="text-bold"> Organizations: </span>
                        ${agency.organizations.slice(0, 3).join(', ')}
                        ${agency.organizations.length > 3 ? `and ${agency.organizations.length - 3} more` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const createProjectCardHTML = (project) => `
    <div class="project-card">
        <div class="usa-card__container border-base-light radius-0 border-1px hover:shadow-2 card-list-item">
            <header class="usa-card__header">
                <h3 class="usa-card__heading font-heading-lg margin-top-0">
                    <a href="${project.repositoryURL}" target="_blank" rel="noopener noreferrer">${ project.name }</a>
                </h3>
                <div class="usa-card__subheading font-body-sm text-base-dark">
                    ${project.organization} • ${project.agencyName}
                </div>
            </header>
            <div class="usa-card__body">
                <p class="font-body-sm">${project.description}</p>
                <div class="font-body-3xs margin-top-1">
                    <div class="grid-row grid-gap-1">
                        <div class="grid-col-auto">
                            <span class="usa-tag usa-tag-big">${project.status}</status>
                        </div>
                        ${project.languages.slice(0, 3).map(language =>
                            `<div class="grid-col-auto"><span class="usa-tag">${language}</span></div>`
                        ).join('')}
                    </div>
                </div>
            </div>
            <div class="usa-card__footer font-body-3xs">
                <div class="grid-row">
                    <div class="grid-col-6">
                        <span class="text-bold">License: </span>${project.license.name || 'N/A'}
                    </div>
                    <div class="grid-col-6">
                        <span class="text-bold">Updated: </span>
                        ${project.dates.lastModified ? new Date(project.dates.lastModified).toLocaleDateString() : 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    </div>
`;



const createCard = (item, targetType) => {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = targetType === 'agencies'
        ? createAgencyCardHTML(item)
        : createProjectCardHTML(item)

    return cardElement.firstElementChild;
};

const updateDisplay = (state) => {
    const container = document.querySelector(
        state.targetType === 'agencies' ? '.agency-grid' : '.project-grid'
    );

    if (!container) return;

    container.innerHTML = '';

    state.filteredData.forEach(item => {
        const card = createCard(item, state.targetType);
        container.appendChild(card)
    });
};

const updateResultCount = (state) => {
    const countElement = document.getElementById('result-count');
    if (countElement) {
        const total = state.originalData.length;
        const filtered = state.filteredData.length;
        countElement.textContent = `Showing ${filtered} of ${total} ${state.targetType}`;
    }
};

const handleSearchInput = (state, setState) => debounce((e) => {
    const newState = {
        ...state,
        filters: {
            ...state.filters,
            search: e.target.value.toLowerCase()
        }
    };

    const processedState = processFilters(newState);
    setState(processedState);
    updateDisplay(processedState);
    updateResultCount(processedState);
}, 300);

const handleSelectChange = (state, setState) => (e) => {
    const filterName = e.target.name;
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
        sortBy: 'name-asc'
    };

    document.getElementById('filter-form').reset();
    document.getElementById('sort-select').value = 'name-asc'

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

    document.querySelectorAll('[data-filter-type="select"]').forEach(select => {
        select.addEventListener('change', handleSelectChange(state, setState));
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

const initializeFilters = (data, targetType) => {
    let state = createFilterState(data, targetType);
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
    const filterContainer = document.querySelector('.filters-container');
    if (filterContainer) {
        const targetType = filterContainer.dataset.filterTarget;
        const dataScript = document.querySelector(`script[data-${targetType}]`);

        if (dataScript) {
            try {
                const data = JSON.parse(dataScript.textContent);
                initializeFilters(data, targetType);
            } catch (error) {
                console.error('Error parcing data for filters: ', error);
            }
        }
    }
});