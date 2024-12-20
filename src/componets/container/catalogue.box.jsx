import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CatalogueBox({ selectedclickdata }) {
  const [data, setData] = useState(null);

  async function handleclick(Catalogue) {
    try {
      const response = await axios({
        url: `book/subject?subject=${Catalogue}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        selectedclickdata(response.data);
      }
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        toast.error('Unathorised! ');
      }
    }
  }

  useEffect(() => {
    async function fetchCatalogueData() {
      try {
        const response = await axios({
          url: 'book/subject/all',
          method: 'get',
          headers: {
            Authorization: 'Bearer  ' + localStorage.getItem('jwt_token'),
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        if (error.response.data.statusCode === 401) {
          toast.error('Unathorised! ');
        }
      }
    }

    fetchCatalogueData();
  }, []);

  return (
    <div className="Catalogue-box">
      <div className="active">
        <h3>E-Book Catalogue</h3>
      </div>
      {data &&
        data.map((e) => (
          <div onClick={() => handleclick(e.Catalogue)} key={e.id}>
            <h3>{e.Catalogue}</h3>
          </div>
        ))}
    </div>
  );
}
