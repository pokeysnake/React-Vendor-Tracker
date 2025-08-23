import { Link } from "react-router-dom";



export default function Home(){
    return (
        <section className = "page page--home">
            
            {/* A generic container to constrain width and add padding */}
            <div className = "container stack">
                <h1 className = "page-title">Vendor Tracker</h1>
                <p className = "page-subtitle">
                    Track vendors, contacts, and reports. Start by adding a vendor.
                </p>

                {/* Call to action row */}
                <div className = "cta-row">
                    <Link className = "btn btn--primary" to = "/vendors">Go to Vendors</Link>
                    <Link className = "btn" to = "/reports">View Reports</Link>
                </div>

                {/* A simple feature area*/}
                <div className = "grid">
                    <div className = "card">
                        <h2 className = "card-title">Fast Routing</h2>
                        <p className = "card-text">Client-side navigation with React Router. COMPLETE SORTA</p>
                    </div>
                    <div className = "card">
                        <h2 className = "card-title">Controlled Forms</h2>
                        <p className = "card-text">Validate inputs and manage state cleanly. STILL NEED</p>
                    </div>
                    <div className = "card">
                        <h2 className = "card-title">MERN READY</h2>
                        <p className = "card-text"> Hook up Express + MongoDb when the UI is set. NEED MONGO DB AND EXPRESS API</p>
                    </div>
                </div>

                <div className = "grid">
                    <div className = "card">
                        <h2 className = "card-title">Things to add</h2>
                        <p className = "card-text">GO TO VENDORS PAGE NEEDS UPDATING, MAYBE DISPLAY LIST OF VENDORS WITH SAMPLE DATA </p>
                    </div>
                    <div className = "card">
                        <h2 className = "card-title">Vendor History</h2>
                        <p className = "card-text">what have you ordered in the past from a vendor, possibly implement a time expiry ,after 30 days the vendor history is deleted STILL NEED MAYBE IMPLEMENT</p>
                    </div>
                    <div className = "card">
                        <h2 className = "card-title">Copy previous orders</h2>
                        <p className = "card-text">have a new page where user can see prev orders and copy them, maybe have a csv input to have new orders STILL NEED MAYB IMPLEMENT</p>
                    </div>
                    <div className = "card">
                        <h2 className = "card-title">Most Popular Vendor</h2>
                        <p className = "card-text">You have spent the most money with Vendor X COMPLETE EVEN DID LINKS TO VENDORS</p>
                    </div>
                </div>

            </div>
            
        </section>
    );
}