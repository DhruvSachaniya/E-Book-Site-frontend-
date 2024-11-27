import { useNavigate } from 'react-router-dom';

export default function PostBook() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="Postbook-Button"
        onClick={() => {
          navigate('/postbook');
        }}
        type="submit"
      >
        PostBook
      </button>
    </>
  );
}
