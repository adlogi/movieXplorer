import React from 'react';
import MovieApi from '../MovieApi';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import genericPoster from '../media/film-poster-placeholder.png';
import 'font-awesome/css/font-awesome.min.css';
import PosterLoading from './PosterLoading';
import ContentLoader from "react-content-loader";

export default function MovieModal(props) {
  if (props.movieDetails) {
    let releaseDate = props.movieDetails.release_date === undefined ? 'Unknown release year' : props.movieDetails.release_date.slice(0, 4);
    let posterSrc = props.movieDetails.poster_path === null ? genericPoster : (MovieApi.BACKDROP_BASE_URL + props.movieDetails.poster_path);
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.movieDetails.title} <small className="text-muted">({releaseDate})</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={12} md={4}>
                <img alt="Movie poster" src={posterSrc} width="100%" className="mb-4"/>
              </Col>
              <Col xs={12} md={8}>
                <p><strong>Genres:</strong> {props.movieDetails.genres.map(genre => genre.name).join(', ')}.</p>
                <p><strong>Runtime:</strong> {props.movieDetails.runtime} min.</p>
                <h4>Overview</h4>
                <p>{props.movieDetails.overview}</p>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col>
                <h4>Cast</h4>
              </Col>
            </Row>
            <Row className="show-grid">
              {props.movieCast.length > 0 ?
                props.movieCast.map((actor, index) => (
                  <Col md={6} lg={3} key={'actor-' + index}>
                  <Container>
                    <Row className="show-grid">
                      <Col>
                        <img alt="" src={MovieApi.BACKDROP_BASE_URL + actor.profile_path} width="100%" />
                      </Col>
                    </Row>
                    <Row className="show-grid">
                      <Col>
                        <h5>{actor.name}</h5>
                        <p className="text-muted">
                          {actor.character ? `(${actor.character})` : ``}</p>
                      </Col>
                    </Row>
                  </Container>
                  </Col>
                )) :
                <Col className="d-flex justify-content-center">
                  <p>No information about cast available :( <i className="fas fa-heart-broken"></i></p>
                </Col>
              }
            </Row>
            
            <Row className="show-grid">
              <Col className="d-flex justify-content-center">
                {props.movieTrailer ?
                  <iframe title="trailerFrame" width="560" height="340" src={MovieApi.TRAILER_BASE_URL + props.movieTrailer.key} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> :
                  <p>No trailer available :( <i className="fas fa-heart-broken"></i></p>
                }
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Loading Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
            <Row className="show-grid">
              <Col xs={12} md={4}>
                <div className="mb-4 w-100">
                  <PosterLoading />
                </div>
              </Col>
              <Col xs={12} md={8}>
                <ContentLoader
                  width={100+'%'}
                  height={60}
                  speed={2}
                  primary-color="#f3f3f3"
                  secondary-color="#7c7c7c"
                  style={{ marginBottom: "4px" }}
                >
                  <rect x="5%" y="10" rx="10" ry="10" width="90%" height="40" />
                </ContentLoader>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="dark">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
}