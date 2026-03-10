import { useState, useEffect } from "react";
import { useParams, useSearchParams} from "react-router-dom";
import adminApi from "../../../Services/apiservice";
import { useAlert } from "../../../Context/AlertContext";
import type { PickupLocation } from "../organisation.types";
import EmptyState from "../../../Components/UI/EmptyState";
import { ImLocation } from "react-icons/im";
import { 
  FaMapMarkerAlt, 
  FaFilter, 
  FaCheckCircle, 
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import SaveButton from "../../../Components/Form/SaveButton";
import CirclularLoader from "../../../Components/UI/CircularLoader";

interface FilterOptions {
  states: string[];
  districts: string[];
  cities: string[];
}

const ManagePickupLocations = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const orgType = searchParams.get('type') || 'office';
  const { showAlert } = useAlert();

  const [allLocations, setAllLocations] = useState<PickupLocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<PickupLocation[]>([]);
  const [assignedLocationIds, setAssignedLocationIds] = useState<number[]>([]);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    states: [],
    districts: [],
    cities: []
  });
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    city: '',
    pin_code: '',
    search: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showUnassignedOnly, setShowUnassignedOnly] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
    fetchAssignedLocations();
  }, [id]);

  useEffect(() => {
    fetchAllLocations();
  }, [filters]);

  const fetchFilterOptions = async () => {
    try {
      const response = await adminApi.get('/pickup-locations/filter-options');
      if (response.data.success) {
        setFilterOptions(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch filter options', error);
    }
  };

  const fetchAllLocations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.state) params.append('state', filters.state);
      if (filters.district) params.append('district', filters.district);
      if (filters.city) params.append('city', filters.city);
      if (filters.pin_code) params.append('pin_code', filters.pin_code);
      if (filters.search) params.append('search', filters.search);

      const response = await adminApi.get(`/pickup-locations/all?${params.toString()}`);

      if (response.data.success) {
        setAllLocations(response.data.data);
        applyUnassignedFilter(response.data.data);
      }
    } catch (error: any) {
      showAlert('Failed to fetch locations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedLocations = async () => {
    try {
      const response = await adminApi.get(`/Organisation/${id}/pickup-locations?type=${orgType}`);

      if (response.data.success) {
        const ids = response.data.data.map((loc: PickupLocation) => loc.id);
        setAssignedLocationIds(ids);
      }
    } catch (error: any) {
      showAlert('Failed to fetch assigned locations', 'error');
    }
  };

  const applyUnassignedFilter = (locations: PickupLocation[]) => {
    if (showUnassignedOnly) {
      const unassigned = locations.filter(loc => !assignedLocationIds.includes(loc.id));
      setFilteredLocations(unassigned);
    } else {
      setFilteredLocations(locations);
    }
  };

  useEffect(() => {
    applyUnassignedFilter(allLocations);
  }, [showUnassignedOnly, assignedLocationIds, allLocations]);

  const handleCheckboxChange = (locationId: number) => {
    setAssignedLocationIds(prev =>
      prev.includes(locationId)
        ? prev.filter(id => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = filteredLocations.map(loc => loc.id);
    const allSelected = visibleIds.every(id => assignedLocationIds.includes(id));

    if (allSelected) {
      setAssignedLocationIds(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      const newIds = [...new Set([...assignedLocationIds, ...visibleIds])];
      setAssignedLocationIds(newIds);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await adminApi.post(
        `/Organisation/${id}/pickup-locations/assign`,
        {
          location_ids: assignedLocationIds,
          type: orgType
        }
      );

      if (response.data.success) {
        showAlert(`${response.data.count} locations assigned successfully!`, 'success');
      }
    } catch (error: any) {
      showAlert('Failed to assign locations', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      state: '',
      district: '',
      city: '',
      pin_code: '',
      search: ''
    });
  };


  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const selectedCount = assignedLocationIds.length;

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 mt-4">
      {/* Header Section */}
      

      {/* Filters Section */}
      <div className="bg-gray-50 rounded-md border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-blue-600" size={14} />
          <h3 className="text-xs font-bold text-gray-900 uppercase">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              Active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          {/* State Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              State
            </label>
            <select
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs uppercase focus:ring focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All States</option>
              {filterOptions.states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              District
            </label>
            <select
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs uppercase focus:ring focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All Districts</option>
              {filterOptions.districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              City
            </label>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs uppercase focus:ring focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">All</option>
              {filterOptions.cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Pincode Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              Pincode
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.pin_code}
                onChange={(e) => handleFilterChange('pin_code', e.target.value)}
                placeholder="Enter pincode"
                className="w-full px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-xs uppercase focus:ring focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
            </div>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
              Search Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search location"
                className="w-full px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-xs uppercase focus:ring focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            <FaTimes size={12} />
            Clear Filters
          </button>
          
          <button
            onClick={handleSelectAll}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all shadow-sm"
          >
            <FaCheckCircle size={12} />
            {filteredLocations.every(loc => assignedLocationIds.includes(loc.id))
              ? 'Deselect All'
              : 'Select All'}
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
            <input
              type="checkbox"
              checked={showUnassignedOnly}
              onChange={(e) => setShowUnassignedOnly(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            />
            <span className="text-xs font-semibold text-gray-700 uppercase">Show Unassigned Only</span>
          </label>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-4 px-2">
        <p className="text-xs text-gray-600">
          Showing <span className="font-bold text-gray-900">{filteredLocations.length}</span> locations
        </p>
        {selectedCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-lg">
            <FaCheckCircle className="text-green-600" size={12} />
            <span className="text-xs font-semibold text-green-700">
              {selectedCount} location{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
        )}
      </div>

      {/* Locations Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <CirclularLoader />
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          {filteredLocations.length === 0 ? (
            <div className="py-12">
              <EmptyState />
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredLocations.map((location) => {
                  const isAssigned = assignedLocationIds.includes(location.id);

                  return (
                    <label
                      key={location.id}
                      className={`group relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        isAssigned 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {/* Checkbox */}
                      <div className="absolute top-3 right-3">
                        <input
                          type="checkbox"
                          checked={isAssigned}
                          onChange={() => handleCheckboxChange(location.id)}
                          className="w-5 h-5 text-blue-600 border-gray-200 rounded focus:ring-blue-500 cursor-pointer"
                        />
                      </div>

                      <div className="pr-8">
                        {/* Location Name */}
                        <h4 className="font-bold text-xs text-gray-900 uppercase mb-2 leading-tight">
                          {location.name}
                        </h4>

                        {/* Location Details */}
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <FaMapMarkerAlt className="text-blue-500 mt-0.5 shrink-0" size={15} />
                            <p className="text-xs text-gray-600 uppercase leading-tight">
                              {location.city}, {location.state}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-600 font-mono">
                              {location.pin_code}
                            </p>
                          </div>

                          {location.latitude && location.longitude && (
                            <div className="flex items-center gap-2 ">
                              <ImLocation className="text-green-500 shrink-0" size={15} />
                              <p className="text-xs text-gray-500 font-mono truncate">
                                {location.latitude}, {location.longitude}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Assigned Badge */}
                        {isAssigned && (
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-full uppercase">
                              <FaCheckCircle size={10} />
                              Assigned
                            </span>
                          </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <SaveButton isSaving={saving} onClick={handleSave} label="save"/>
      </div>
    </div>
  );
};

export default ManagePickupLocations;
