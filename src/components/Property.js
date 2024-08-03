import React from 'react'

export default function Property() {
    return (
        <div className='property-Feature'>
            <>
                <div class="bg-dark text-white text-center py-3">
                    <h1>Properties for Sale</h1>
                </div>

                <div class="container mt-4">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card property-card">
                                <img src="https://via.placeholder.com/350x200" class="card-img-top property-image" alt="Property 1"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Modern Family Home</h5>
                                        <p class="card-text">A beautiful 4-bedroom home with spacious living areas and a large backyard. Ideal for families.</p>
                                        <p class="card-text"><strong>$450,000</strong></p>
                                        <a href="#" class="btn btn-primary">View Details</a>
                                    </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card property-card">
                                <img src="https://via.placeholder.com/350x200" class="card-img-top property-image" alt="Property 2"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Luxury Apartment</h5>
                                        <p class="card-text">A high-end apartment in the city center with stunning views and modern amenities.</p>
                                        <p class="card-text"><strong>$750,000</strong></p>
                                        <a href="#" class="btn btn-primary">View Details</a>
                                    </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card property-card">
                                <img src="https://via.placeholder.com/350x200" class="card-img-top property-image" alt="Property 3"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Cozy Country Cottage</h5>
                                        <p class="card-text">Charming cottage with a rustic feel, surrounded by nature and perfect for a quiet retreat.</p>
                                        <p class="card-text"><strong>$320,000</strong></p>
                                        <a href="#" class="btn btn-primary">View Details</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        </div>
    )
}
