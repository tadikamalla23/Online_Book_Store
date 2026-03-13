import React from 'react';
import carousel1 from '../Images/carousel1.jpg';
import './Carousel.css'
class Carousel extends React.Component{
    render(){
        return(
           
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100" src={carousel1} alt="First slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>There is no such thing as too many books</h5>
                        <p><a className="btn explorebtn">Explore More</a></p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={carousel1} alt="Second slide" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>...</h5>
                        <p>...</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100" src={carousel1} alt="Third slide" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5>...</h5>
                        <p>...</p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
           
        );
    }
}

export default Carousel;