import axios from 'axios';
import toast from 'react-hot-toast';

export default function SearchButton(props) {
  return (
    <>
      <button
        className="Search-Button"
        onClick={() => {
          const { subject = '', title = '' } = props;

          if (subject && title) {
            axios({
              url: `book/find?subject=${subject}&title=${title}`,
              method: 'get',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
                'Content-Type': 'application/json',
              },
            })
              .then((res) => {
                props.onSearch(res.data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          } else if (subject) {
            axios({
              url: `book/subject?subject=${subject}`,
              method: 'get',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
                'Content-Type': 'application/json',
              },
            })
              .then((res) => {
                props.onSearch(res.data[0]?.Posts);
              })

              .catch((error) => {
                console.error('Error:', error);
              });
          } else if (title || title !== '') {
            axios({
              url: `book/search?query=${title}`,
              method: 'get',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
                'Content-Type': 'application/json',
              },
            })
              .then((res) => {
                props.onSearch(res.data);
              })

              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  // Handle 404 response here
                  toast.error('No Matching Record(s) found of: ' + title);
                  // You can set an appropriate message or update the UI accordingly
                } else {
                  // Handle other errors
                  console.error('Error fetching books:', error.message);
                }
              });
          }
        }}
        type="submit"
      >
        Search
      </button>
    </>
  );
}
