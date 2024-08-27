import React from "react";

const HeroSection = () => {
  return (
    <div className="pt-8 Hero-Section flex flex-col justify-center items-center gap-6">
      <div>
        <h3 className="text-5xl text-center font-bold leading-relaxed">
          Discover the weather in <br />
          every city you go
        </h3>
      </div>
      <div>
        <form action="">
          <input
            type="text"
            name="City"
            id=""
            className="w-96 rounded-lg px-4 py-2 text-center text-black Search-box"
            autoComplete="off"
          />
          <button type="submit" className="relative end-7 text-black z-1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="flex justify-center overflow-y-hidden cards-container">
        <div id="Hero-card-1" className="hero-card">
          <div className="">
            <i className="fa-solid fa-cloud text-4xl"></i>
          </div>
          <h1 className="text-3xl">
            18{""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
        <div id="Hero-card-2" className="hero-card">
          <div className="">
            <i className="fa-solid fa-cloud text-4xl"></i>
          </div>
          <h1 className="text-3xl">
            18{""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
        <div id="Hero-card-3" className="hero-card">
          <div className="">
            <i className="fa-solid fa-cloud text-4xl"></i>
          </div>
          <h1 className="text-3xl">
            18{""}
            <sup>
              {""}
              <sup>
                <i className="fa-regular fa-circle fa-2xs text-xs"></i>
              </sup>
              C
            </sup>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
