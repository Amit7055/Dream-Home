import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const rentPriceRanges = [
  { value: "all", label: "All Price Ranges" },
  { value: "0-500", label: "0 - 500" },
  { value: "500-1000", label: "500 - 1000" },
  { value: "1000-1500", label: "1000 - 1500" },
  { value: "1500-2000", label: "1500 - 2000" },
  { value: "2000+", label: "2000+" },
];

const buyPriceRanges = [
  { value: "all", label: "All Price Ranges" },
  { value: "50000-200000", label: "50000 - 200,000" },
  { value: "200000-400000", label: "200,000 - 400,000" },
  { value: "400000-600000", label: "400,000 - 600,000" },
  { value: "600000-800000", label: "600,000 - 800,000" },
  { value: "800000+", label: "800,000+" },
];

const allPriceRanges = [
  ...rentPriceRanges,
  ...buyPriceRanges.filter((range) => range.value !== "all"),
];

export default function Home1() {

  const [listings, setListingss] = useState([]);
  const [displayProperties, setDisplayProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:9999/properties/all');
        const fetchedListings = response.data;
  
        const responseImage = await axios.get("http://localhost:9999/api/images/all");
        const imageMap = new Map(
          responseImage.data.map((image) => [
            image.properties.propertyId,
            image.imagedata,
          ])
        );
  
        const updatedProperties = fetchedListings.map((property) => ({
          ...property,
          imageUrl: imageMap.get(property.propertyId)
            ? `data:image/jpeg;base64,${imageMap.get(property.propertyId)}`
            : "",
        }));
  
        setListingss(updatedProperties);
        setDisplayProperties(updatedProperties);
      } catch (error) {
        console.error('There was an error fetching the properties!', error);
      }
    };
  
    fetchProperties();
  }, []);
  

  const [filter, setFilter] = useState({
    type: "all",
    propertyType: "all",
    priceRange: "all",
    city: "all",
    area: "all",
  });

  var navigate = useNavigate();

  const [searchCity, setSearchCity] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [placeholderCity, setPlaceholderCity] = useState("Search City");

  // Add state for area search and dropdown
  const [searchArea, setSearchArea] = useState(""); // Added state for area search
  const [dropdownOpenArea, setDropdownOpenArea] = useState(false); // Added state for area dropdown
  const [placeholderArea, setPlaceholderArea] = useState("Search Area"); // Added state for area placeholder

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      priceRange: "all", // Reset price range when type changes
    }));
  }, [filter.type]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
      ...(name === "type" && { priceRange: "all" }),
    }));
  };

  const handleCitySelect = (city) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      city: city,
      area: "all",
    }));
    setSearchCity("");
    setPlaceholderCity(city === "all" ? "All Cities" : city);
    setDropdownOpen(false);
  };

  const handleAreaSelect = (area) => {
    // Added function for area selection
    setFilter((prevFilter) => ({
      ...prevFilter,
      area: area,
    }));
    setSearchArea("");
    setPlaceholderArea(area === "all" ? "All Areas" : area);
    setDropdownOpenArea(false);
  };

  const getPriceRange = (type, priceRange) => {
    if (type === "rent") {
      switch (priceRange) {
        case "0-500":
          return [0, 500];
        case "500-1000":
          return [500, 1000];
        case "1000-1500":
          return [1000, 1500];
        case "1500-2000":
          return [1500, 2000];
        case "2000+":
          return [2000, Infinity];
        default:
          return [0, Infinity];
      }
    } else if (type === "buy") {
      switch (priceRange) {
        case "50000-200000":
          return [50000, 200000];
        case "200000-400000":
          return [200000, 400000];
        case "400000-600000":
          return [400000, 600000];
        case "600000-800000":
          return [600000, 800000];
        case "800000+":
          return [800000, Infinity];
        default:
          return [0, Infinity];
      }
    } else {
      switch (priceRange) {
        case "0-500":
          return [0, 500];
        case "500-1000":
          return [500, 1000];
        case "1000-1500":
          return [1000, 1500];
        case "1500-2000":
          return [1500, 2000];
        case "2000+":
          return [2000, Infinity];
        case "50000-200000":
          return [50000, 200000];
        case "200000-400000":
          return [200000, 400000];
        case "400000-600000":
          return [400000, 600000];
        case "600000-800000":
          return [600000, 800000];
        case "800000+":
          return [800000, Infinity];
        default:
          return [0, Infinity];
      }
    }
  };

  const [minPrice, maxPrice] = getPriceRange(filter.type, filter.priceRange);

  const filteredListings = listings.filter((listing) => {
    return (
      (filter.type === "all" || listing.type === filter.type) &&
      (filter.propertyType === "all" ||
        listing.propertyType === filter.propertyType) &&
      (filter.city === "all" || listing.city === filter.city) &&
      (filter.area === "all" || listing.area === filter.area) &&
      listing.price >= minPrice &&
      listing.price <= maxPrice
    );
  });

  const filteredCities = Array.from(
    new Set(listings.map((listing) => listing.city))
  ).filter((city) => city.toLowerCase().includes(searchCity.toLowerCase()));

  const filteredAreas = Array.from(
    new Set(
      listings
        .filter(
          (listing) => listing.city === filter.city || filter.city === "all"
        )
        .map((listing) => listing.area)
    )
  ).filter((area) => area.toLowerCase().includes(searchArea.toLowerCase()));

  const show = (value)=>{
      setDropdownOpen(value);
      setDropdownOpenArea(value);
  }

  return (
    <div>
      <div className=" container options-row text-center" onClick={() => show(false)}>
        <div className="row">
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(`/rent`);
              }}
            >
              Rental Section
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(`/buy`);
              }}
            >
              Buy Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(`/seller`);
              }}
            >
              Sell Property
            </button>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(`/landlordtenant`);
              }}
            >
              Landlord/Tenant 
            </button>
          </div>
        </div>
      </div>

      <div className="container dropdown1 text-center" >
        <h2 className="text-center" onClick={() => show(false)}>Filter</h2>
        <div className="row text-center">
          <div className="col-md-6" onClick={() => show(false)}>
            <select
              className="form-select area"
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
            </select>
          </div>
          <div className="col-md-6" onClick={() => show(false)}> 
            <select
              className="form-select area"
              name="propertyType"
              value={filter.propertyType}
              onChange={handleFilterChange}
            >
              <option value="all">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
              <option value="Condo">Condo</option>
              <option value="Cottage">Cottage</option>
              <option value="Room">Room</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div className="col-md-6" onClick={() => setDropdownOpenArea(false)}>
            <input
              type="text"
              className="form-control area"
              placeholder={placeholderCity}
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
                 setDropdownOpen(true);
              }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown ">
                <ul
                  className="dropdown-menu"
                  style={{
                    display: "block",
                    maxHeight: "200px",
                    overflowY: "scroll",
                  }}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleCitySelect("all")}
                    >
                      All Cities
                    </button>
                  </li>
                  {filteredCities.length === 0 ? (
                    <li>
                      <span className="dropdown-item">City not found</span>
                    </li>
                  ) : (
                    filteredCities.map((city) => (
                      <li key={city}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleCitySelect(city)}
                        >
                          {city}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="col-md-6" onClick={() => setDropdownOpen(false)}  >
            <input
              type="text"
              className="form-control area area2"
              placeholder={placeholderArea}
              value={searchArea}
              onChange={(e) => {
                setSearchArea(e.target.value);
                setDropdownOpenArea(true);
              }}
              onClick={() => setDropdownOpenArea(!dropdownOpenArea)}
            />
            {dropdownOpenArea && (
              <div className="dropdown">
                <ul
                  className="dropdown-menu"
                  style={{
                    display: "block",
                    maxHeight: "200px",
                    overflowY: "scroll",
                  }}
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleAreaSelect("all")}
                    >
                      All Areas
                    </button>
                  </li>
                  {filteredAreas.length === 0 ? (
                    <li>
                      <span className="dropdown-item">Area not found</span>
                    </li>
                  ) : (
                    filteredAreas.map((area) => (
                      <li key={area}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAreaSelect(area)}
                        >
                          {area}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="container text-center" onClick={() => show(false)}>
            <div className="row text-center">
                <div className="col-md-12">
                  <select
                    className="form-select"
                    name="priceRange"
                    value={filter.priceRange}
                    onChange={handleFilterChange}
                  >
                    {(filter.type === "all"
                      ? allPriceRanges
                      : filter.type === "rent"
                      ? rentPriceRanges
                      : buyPriceRanges
                    ).map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 list-box p-4" onClick={() => show(false)}>
        <div className="row">
          {filteredListings.map((listing) => (
            <div className="col-md-4 mb-4 mt-4 list" key={listing.id}>
              <div className="card">
                <img
                  src={listing.imageUrl}
                  className="card-img-top listImg"
                  alt={listing.description}
                />
                <div className="card-body">
                  <h5 className="card-title">{listing.propertyType}</h5>
                  <p className="card-text">{listing.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${listing.price}
                  </p>
                  <a
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(`/detail?q=${listing.propertyId}`);
                      console.log(listing.propertyId);
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
