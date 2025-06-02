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

const applySelectFilters = (data, filters) => {
    return Object.entries(filters).reduce((filtered, [key, value]) => {
        if (!value || key === 'search') return filtered;

        return filtered.filter(item => {
            if (Array.isArray(item[key])) {
                return item[key].includes(value);
            }
            return item[key] === value;
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
                aVal = a.projectCont || 0;
                bVal = b.projectCont || 0;
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