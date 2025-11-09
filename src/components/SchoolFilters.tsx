'use client';

import { useState, useEffect } from 'react';

interface SchoolFiltersProps {
  countries: Array<{ value: string; label: string }>;
  onFilterChange?: (filters: FilterState) => void;
  locale?: string;
  t?: (key: string) => string;
}

export interface FilterState {
  country?: string;
  certification?: string;
  courseType?: string;
  level?: string;
}

export default function SchoolFilters({ 
  countries, 
  onFilterChange,
  locale = 'en',
  t = (key: string) => key
}: SchoolFiltersProps) {
  // For client-side filtering, we'll use URL search params
  const [filters, setFilters] = useState<FilterState>({
    country: '',
    certification: '',
    courseType: '',
    level: ''
  });

  useEffect(() => {
    // Read from URL params if available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        country: params.get('country') || '',
        certification: params.get('certification') || '',
        courseType: params.get('courseType') || '',
        level: params.get('level') || ''
      });
    }
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      window.history.pushState({}, '', newUrl);
    }
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      country: '',
      certification: '',
      courseType: '',
      level: ''
    };
    setFilters(emptyFilters);
    
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', window.location.pathname);
    }
    
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.filters.country')}
          </label>
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.filters.all')}</option>
            {countries.map(country => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Certification Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.filters.certification')}
          </label>
          <select
            value={filters.certification}
            onChange={(e) => handleFilterChange('certification', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.filters.all')}</option>
            <option value="AIDA">{t('common.filters.aida')}</option>
            <option value="SSI">{t('common.filters.ssi')}</option>
            <option value="Molchanovs">{t('common.filters.molchanovs')}</option>
          </select>
        </div>

        {/* Course Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('common.filters.courseType')}
          </label>
          <select
            value={filters.courseType}
            onChange={(e) => handleFilterChange('courseType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{t('common.filters.all')}</option>
            <option value="beginner">{t('common.filters.beginner')}</option>
            <option value="depth">{t('common.filters.depth')}</option>
            <option value="fun">{t('common.filters.fun')}</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

