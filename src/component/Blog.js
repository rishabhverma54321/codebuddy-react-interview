import React, { useEffect, useState } from 'react';

function Blog() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    handleSubmit();
  }, []);
  const url = process.env.REACT_APP_API_URL;

  const handleSubmit = async () => {
    const response = await fetch(`${url}/posts`, {
      method: 'GET',
    });
    const content = await response.json();
    setBlog(content.data.posts);
  };

  return (
    <>
      <div style={{ margin: '60px auto', width: '80%' }} className="">
        <h1 className="text-center ms-font-poppins">Trending</h1>
        <hr />
        {blog.length === 0 ? (
          <div
            style={{ width: '100%' }}
            className="d-flex justify-content-center align-items-center "
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            style={{ gap: '20px', width: '80%' }}
            className="d-flex flex-wrap justify-content-center m-auto"
          >
            {blog.map(items => (
              <div key={items.ID}>
                <div
                  className="card light blog rounded"
                  style={{
                    width: '22rem',
                    height: '20rem',
                    background: ` ${
                      items.post_thumbnail == null
                        ? '../Images/home/footer-bg-img.png'
                        : `${'url' + '('}${items.avatar})`
                    }`,
                    backgroundSize: 'cover',
                  }}
                >
                  <div
                    className="card-body"
                    style={{ background: 'linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.3))' }}
                  >
                    <h5 style={{ color: 'white' }} className="card-title light fw-bolder">
                      {items.firstName}
                    </h5>
                    <h5 style={{ color: 'white' }} className="card-title light fw-bolder">
                      {items.lastName}
                    </h5>
                    <p style={{ color: 'white' }} className="card-text light">
                      {items.writeup}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Blog;
