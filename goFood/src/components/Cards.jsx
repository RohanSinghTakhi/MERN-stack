import img from "../assets/c1.jpg"

function Cards() {
  return (
    <div><div className="card mt-3 " style={{ width: "18rem", maxHeight: "360px" }}>
    <img src={img} className="card-img-top" alt="..." />
    <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is some important text</p>
        <div className="container w-100">
            <select className="m-2 h-100  bg-success text-white border-light " id="">
                {Array.from({ length: 6 }, (e, i) => (
                    <option key={i + 1} value={i + 1}>
                        {i + 1}
                    </option>
                ))}
            </select>
            <select className="m-2 h-100  bg-success rounded text-white border-light">
                <option value="half">Half</option>
                <option value="full">Full</option>
            </select>
            <div className="d-inline h-100 fs-5 " style={{fontWeight:"medium"}}>
                Total Price
            </div>

        </div>
    </div>
</div></div>
  )
}

export default Cards