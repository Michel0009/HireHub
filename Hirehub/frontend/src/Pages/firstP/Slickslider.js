import Carousel from "react-bootstrap/Carousel";
import img1 from "../../Assets/Images/img1.jpg";
import img2 from "../../Assets/Images/img2.jpg";
import img3 from "../../Assets/Images/img3.jpg";
import img4 from "../../Assets/Images/img4.jpg";
import img5 from "../../Assets/Images/img5.jpg";
function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="w-100 h-100 d-block"
          src={img1}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 h-100 d-block"
          src={img2}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 h-100 d-block"
          src={img3}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 h-100 d-block"
          src={img4}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 h-100 d-block"
          src={img5}
          alt=""
          style={{ objectFit: "cover" }}
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
