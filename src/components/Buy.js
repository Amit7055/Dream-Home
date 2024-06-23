import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const listings = [
  {
    id: 1,
    type: "rent",
    propertyType: "Apartment",
    description: "2-bedroom apartment in downtown",
    price: 1500,
    img: "https://media.istockphoto.com/id/1365649825/photo/stylish-micro-apartment-for-one.jpg?s=612x612&w=0&k=20&c=B84a7PkFLhZGTG0GPDOxBs2yDjBvy2NHaqZw5_Vp878=",
    city: "New York",
    area: "Downtown",
  },
  {
    id: 2,
    type: "buy",
    propertyType: "House",
    description: "3-bedroom house with a garden",
    price: 350000,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErDL1tl6xeGFzwxM6VOvUyBIjapS7czYdag&s",
    city: "San Francisco",
    area: "Sunset District",
  },
  {
    id: 3,
    type: "rent",
    propertyType: "Studio",
    description: "Studio apartment near university",
    price: 800,
    img: "https://www.interiorzine.com/wp-content/uploads/2017/11/small-scale-modern-loft-design-sliding-staircase.jpg",
    city: "Boston",
    area: "Cambridge",
  },
  {
    id: 4,
    type: "buy",
    propertyType: "Condo",
    description: "Luxury condo with sea view",
    price: 750000,
    img: "https://c4.wallpaperflare.com/wallpaper/1011/101/300/apartment-condo-design-home-wallpaper-preview.jpg",
    city: "Miami",
    area: "South Beach",
  },
  {
    id: 5,
    type: "rent",
    propertyType: "Apartment",
    description: "1-bedroom apartment in suburbs",
    price: 1200,
    img: "https://c4.wallpaperflare.com/wallpaper/396/394/415/city-apartment-design-wallpaper-preview.jpg",
    city: "Los Angeles",
    area: "Pasadena",
  },
  {
    id: 6,
    type: "buy",
    propertyType: "Cottage",
    description: "Cozy cottage in the countryside",
    price: 250000,
    img: "https://images2.alphacoders.com/688/thumb-1920-688918.jpg",
    city: "Nashville",
    area: "Franklin",
  },
  {
    id: 7,
    type: "rent",
    propertyType: "Room",
    description: "Shared room in a house",
    price: 500,
    img: "https://c1.wallpaperflare.com/preview/49/427/736/apartment-stylish-home-wooden-comfortable-apartment.jpg",
    city: "Austin",
    area: "Downtown",
  },
  {
    id: 8,
    type: "buy",
    propertyType: "Townhouse",
    description: "Modern townhouse with garage",
    price: 400000,
    img: "https://media.istockphoto.com/id/1482804679/photo/modern-apartment-buildings.webp?b=1&s=170667a&w=0&k=20&c=INNQZ1WLyr2dWZe5gcr04xsWQ2Hk6xe_L0vkrgfv79Q=",
    city: "Seattle",
    area: "Capitol Hill",
  },
  {
    id: 9,
    type: "rent",
    propertyType: "Apartment",
    description: "3-bedroom apartment in city center",
    price: 2000,
    img: "https://png.pngtree.com/thumb_back/fh260/background/20230526/pngtree-d-apartment-building-complex-with-a-car-on-the-front-sidewalk-image_2635489.jpg",
    city: "Chicago",
    area: "Loop",
  },
  {
    id: 10,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
  },
  {
    id: 11,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
  },
  {
    id: 12,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
  },
  {
    id: 13,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "New York",
    area: "Manhattan",
  },
  {
    id: 14,
    type: "buy",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "Nashik",
    area: "Manhattan",
  },
  {
    id: 15,
    type: "rent",
    propertyType: "Penthouse",
    description: "Penthouse with panoramic view",
    price: 950000,
    img: "https://img.freepik.com/premium-photo/penthouse-hd-8k-wallpaper-stock-photographic-image_853645-41340.jpg",
    city: "Nashik",
    area: "Manhattan",
  },
];

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
  { value: "0-200000", label: "0 - 200,000" },
  { value: "200000-400000", label: "200,000 - 400,000" },
  { value: "400000-600000", label: "400,000 - 600,000" },
  { value: "600000-800000", label: "600,000 - 800,000" },
  { value: "800000+", label: "800,000+" },
];

const allPriceRanges = [
  ...rentPriceRanges,
  ...buyPriceRanges.filter((range) => range.value !== "all"),
];

export default function Buy() {
  var navigate = useNavigate();
  const [filter, setFilter] = useState({
    type: "buy",
    propertyType: "all",
    priceRange: "all",
    city: "all",
    area: "all",
  });

  const [searchCity, setSearchCity] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [placeholderCity, setPlaceholderCity] = useState("Search City");

  // Add state for area search and dropdown
  const [searchArea, setSearchArea] = useState(""); // Added state for area search
  const [dropdownOpenArea, setDropdownOpenArea] = useState(false); // Added state for area dropdown
  const [placeholderArea, setPlaceholderArea] = useState("Search Area"); // Added state for area placeholder

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
        case "0-200000":
          return [0, 200000];
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
      return [0, Infinity];
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

  return (
    <div>
      <div className=" container options-row row-rent">
        <div className="row">
          <h2 className="text-center">Buy Properties</h2>
        </div>
      </div>
      <div className="container dropdown1">
        <h2 className="text-center">Filter</h2>
        <div className="row">
          <div className="col-md-6" style={{ paddingLeft: "45px" }}>
            <select
              className="form-select area rent-type"
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
          <div className="col-md-6" style={{ paddingLeft: "45px" }}>
            <input
              type="text"
              className="form-control area"
              placeholder={placeholderCity}
              value={searchCity}
              onChange={(e) => {
                setSearchCity(e.target.value);
                setDropdownOpen(true);
              }}
              onClick={() => setDropdownOpen(true)}
            />
            {dropdownOpen && (
              <div className="dropdown mt-2">
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
          <div className="col-md-6" style={{ paddingLeft: "45px" }}>
            <input
              type="text"
              className="form-control area"
              placeholder={placeholderArea}
              value={searchArea}
              onChange={(e) => {
                setSearchArea(e.target.value);
                setDropdownOpenArea(true);
              }}
              onClick={() => setDropdownOpenArea(true)}
            />
            {dropdownOpenArea && (
              <div className="dropdown mt-2">
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

          <div className="col-md-6" style={{ paddingLeft: "45px" }}>
            <select
              className="form-select area"
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

      <div className="container mt-4 list-box">
        <div className="row">
          {filteredListings.map((listing) => (
            <div className="col-md-4 mb-4 list" key={listing.id}>
              <div className="card">
                <img
                  src={listing.img}
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
                      navigate(`/detail?q=${listing.id}`);
                      console.log(listing.id);
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
