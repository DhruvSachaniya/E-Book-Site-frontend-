import { useState } from 'react';
import Header from '../Header/header';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../Footer/footer';
import { Link } from 'react-router-dom';

export default function CataloguePostPage() {
  const [values, setvalue] = useState({
    Catalogue: '',
  });

  function handlechange(event) {
    const { name, value } = event.target;

    setvalue({
      ...values,
      [name]: value,
    });
  }

  async function handlesubmit(event) {
    event.preventDefault();

    const response = await axios({
      url: 'book/catalogue',
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        Catalogue: values.Catalogue,
      }),
    });

    if (response.status === 201) {
      toast.success('Catalouge post suceesfully!');
      setvalue({
        Catalogue: '',
      });
    }
  }

  return (
    <>
      <Header />
      <div className="postbook-container-head">
        <div className="postbook-box">
          <div
            style={{
              padding: '60px',
              background: 'transparent',
              borderRadius: '10px',
              border: '5px solid var(--color-silverockunivercity)',
            }}
          >
            <h1 style={{ marginLeft: '1rem' }}>Post Catalogue</h1>
            <form onSubmit={handlesubmit}>
              <div>
                <h3 className="titleinput-header">Title:-</h3>
                <div className="titleinput-content">
                  <input
                    name="Catalogue"
                    value={values.Catalogue}
                    onChange={handlechange}
                    type="text"
                    placeholder="Title"
                  />
                </div>
              </div>
              <p style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
                PostBook Page?{' '}
                <Link to={'/postbook'}>
                  <mark
                    style={{
                      backgroundColor: 'var(--color-silverockunivercity)',
                      color: 'var(--color-white)',
                      borderRadius: '3px',
                      padding: '0.3rem',
                    }}
                  >
                    PostBook
                  </mark>
                </Link>
              </p>

              <p style={{ marginTop: '2rem', marginLeft: '1.5rem' }}>
                Return To Home Page?{' '}
                <Link to={'/home'}>
                  <mark
                    style={{
                      backgroundColor: 'var(--color-silverockunivercity)',
                      color: 'var(--color-white)',
                      borderRadius: '3px',
                      padding: '0.3rem',
                    }}
                  >
                    Home Page
                  </mark>
                </Link>
              </p>

              <button
                className="Search-Button"
                style={{ cursor: 'pointer', marginLeft: '35%', width: '40%' }}
                type="submit"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
