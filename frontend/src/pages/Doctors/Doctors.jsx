import React, { useState } from "react";
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Handle input change and filter doctors
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter doctors based on search query
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch} // Attach handleSearch function here
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {filteredDoctors.length === 0 ? (
            <p className="text-center mt-4 text-red-500">No doctor found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
