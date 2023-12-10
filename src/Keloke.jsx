import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Keloke = () => {
  return (
    <Container className="m-2">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src="path_to_video_thumbnail" className="card-img-top" alt="Video Thumbnail" />
            <div className="card-body">
              <h5 className="card-title">Video Title</h5>
              <p className="card-text">Some quick example text to build on the card title.</p>
            </div>
          </div>
        </div>
        {/* Replicate the above div for each video card */}
      </div>
    </Container>
  );
};

export default Keloke;