import img1 from "../assets/1img.jpg";
import img2 from "../assets/2img.jpg";
import img3 from "../assets/3img.jpg";

function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
          </form>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="position-relative">
              <img src={img1} className="d-block w-100" alt="Image 1" style={{ width: '900px', height: '600px' }} />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative">
              <img src={img2} className="d-block w-100" alt="Image 2" style={{ width: '900px', height: '600px' }} />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="position-relative">
              <img src={img3} className="d-block w-100" alt="Image 3" style={{ width: '900px', height: '600px' }} />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.5 }}></div>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
