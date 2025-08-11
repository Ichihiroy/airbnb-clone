import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Home,
  X,
  Save,
  Grid3x3,
  List,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllProperties,
  addProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyServices";

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
  });

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    typeOfPlace: "",
    location: {
      city: "",
      country: "",
      address: "",
    },
    price: {
      total: "",
      currency: "USD",
      nights: 1,
    },
    images: ["", "", "", ""],
    roomDetails: {
      bedType: "",
      bathroomType: "",
    },
    description: "",
    host: {
      name: "",
      isSuperhost: false,
      yearsHosting: 1,
    },
    rating: {
      score: 5.0,
      reviewsCount: 0,
    },
    maxGuests: {
      adults: 2,
      children: 2,
      infants: 1,
      pets: 0,
    },
  });

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterProperties();
    loadStats();
  }, [searchTerm, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await getAllProperties();
      setProperties(response.data || response);
    } catch (error) {
      console.error("Error loading properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = () => {
    try {
      const bookings = JSON.parse(
        localStorage.getItem("propertyBookings") || "{}"
      );
      const bookingsArray = Object.values(bookings);

      setStats({
        totalProperties: filteredProperties.length,
        totalBookings: bookingsArray.length,
        totalRevenue: bookingsArray.reduce(
          (sum, booking) => sum + (booking.totalPrice || 0),
          0
        ),
        averageRating:
          filteredProperties.length > 0
            ? (
                filteredProperties.reduce(
                  (sum, prop) => sum + (prop.rating?.score || 0),
                  0
                ) / filteredProperties.length
              ).toFixed(1)
            : 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const filterProperties = () => {
    if (!searchTerm) {
      setFilteredProperties(properties);
      return;
    }

    const filtered = properties.filter(
      (property) =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.city
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.location?.country
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.typeOfPlace?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProperties(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const openModal = (type, property = null) => {
    setModalType(type);
    setSelectedProperty(property);

    if (type === "add") {
      setFormData({
        title: "",
        typeOfPlace: "",
        location: { city: "", country: "", address: "" },
        price: { total: "", currency: "USD", nights: 1 },
        images: ["", "", "", ""],
        roomDetails: { bedType: "", bathroomType: "" },
        description: "",
        host: { name: "", isSuperhost: false, yearsHosting: 1 },
        rating: { score: 5.0, reviewsCount: 0 },
        maxGuests: { adults: 2, children: 2, infants: 1, pets: 0 },
      });
    } else if (type === "edit" && property) {
      setFormData(property);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === "add") {
        const newProperty = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };

        await addProperty(newProperty);
        toast.success("Property added successfully!");
      } else if (modalType === "edit") {
        await updateProperty(selectedProperty.id, formData);
        toast.success("Property updated successfully!");
      }

      closeModal();
      loadProperties();
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property");
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(propertyId);
        toast.success("Property deleted successfully!");
        loadProperties();
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error("Failed to delete property");
      }
    }
  };

  // Property Card Component
  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-100">
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        {/* Actions Overlay */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-1">
            <button
              onClick={() => openModal("view", property)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => openModal("edit", property)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Edit3 className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => handleDelete(property.id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        {property.rating?.score && (
          <div className="absolute top-3 left-3">
            <div className="bg-white rounded-full px-2 py-1 shadow-sm flex items-center">
              <Star
                className="h-3 w-3 text-yellow-400 mr-1"
                fill="currentColor"
              />
              <span className="text-xs font-medium">
                {property.rating.score}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 truncate pr-2">
            {property.title || "Untitled Property"}
          </h3>
          <div className="text-right">
            <div className="font-semibold text-gray-900">
              {property.price?.total || "$0"}
            </div>
            <div className="text-xs text-gray-500">
              per {property.price?.nights || 1} night
              {(property.price?.nights || 1) > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">
            {property.location?.city || "Unknown"},{" "}
            {property.location?.country || "Unknown"}
          </span>
        </div>

        <div className="text-sm text-gray-500 mb-3">
          {property.typeOfPlace || "Property type not specified"}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Host: {property.host?.name || "Unknown"}</span>
          <span>{property.rating?.reviewsCount || 0} reviews</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your properties
              </p>
            </div>
            <button
              onClick={() => openModal("add")}
              className="inline-flex items-center px-4 py-2.5 text-white text-sm font-medium rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add property
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search"
                : "Get started by adding your first property"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openModal("add")}
                className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add property
              </button>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {modalType === "add"
                  ? "Add property"
                  : modalType === "edit"
                  ? "Edit property"
                  : "Property details"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {modalType === "view" ? (
                <div className="p-6 space-y-6">
                  {/* Property Images */}
                  {selectedProperty?.images?.[0] && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={selectedProperty.images[0]}
                        alt={selectedProperty.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Title
                        </h3>
                        <p className="mt-1 text-lg text-gray-900">
                          {selectedProperty?.title}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Type
                        </h3>
                        <p className="mt-1 text-gray-900">
                          {selectedProperty?.typeOfPlace}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Location
                        </h3>
                        <p className="mt-1 text-gray-900">
                          {selectedProperty?.location?.city},{" "}
                          {selectedProperty?.location?.country}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Price
                        </h3>
                        <p className="mt-1 text-lg text-gray-900">
                          {selectedProperty?.price?.total}{" "}
                          {selectedProperty?.price?.currency}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Host
                        </h3>
                        <p className="mt-1 text-gray-900">
                          {selectedProperty?.host?.name}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                          Rating
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star
                            className="h-4 w-4 text-yellow-400 mr-1"
                            fill="currentColor"
                          />
                          <span className="text-gray-900">
                            {selectedProperty?.rating?.score} (
                            {selectedProperty?.rating?.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedProperty?.description && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Description
                      </h3>
                      <p className="text-gray-900 leading-relaxed">
                        {selectedProperty.description}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Basic information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="Beautiful oceanview apartment"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Property type *
                        </label>
                        <select
                          name="typeOfPlace"
                          value={formData.typeOfPlace}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                          <option value="">Select type</option>
                          <option value="Entire home/apt">
                            Entire home/apt
                          </option>
                          <option value="Private room">Private room</option>
                          <option value="Shared room">Shared room</option>
                          <option value="Hotel room">Hotel room</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <input
                          type="text"
                          name="location.country"
                          value={formData.location.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="United States"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="location.address"
                          value={formData.location.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price *
                        </label>
                        <input
                          type="text"
                          name="price.total"
                          value={formData.price.total}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="$299"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          name="price.currency"
                          value={formData.price.currency}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nights
                        </label>
                        <input
                          type="number"
                          name="price.nights"
                          value={formData.price.nights}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Photos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo {index + 1} URL
                          </label>
                          <input
                            type="url"
                            value={image}
                            onChange={(e) =>
                              handleArrayChange("images", index, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                            placeholder="https://example.com/photo.jpg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Host Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Host information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Host name *
                        </label>
                        <input
                          type="text"
                          name="host.name"
                          value={formData.host.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years hosting
                        </label>
                        <input
                          type="number"
                          name="host.yearsHosting"
                          value={formData.host.yearsHosting}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center pt-8">
                        <input
                          type="checkbox"
                          name="host.isSuperhost"
                          checked={formData.host.isSuperhost}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Superhost
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Description
                    </h3>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Describe your property..."
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white  rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {modalType === "add" ? "Add property" : "Update property"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
