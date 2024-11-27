import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppComponets from './componets/app/AppComponets';
import SigninPage from './componets/startup/signin';
import { Toaster } from 'react-hot-toast';
import PostBookPage from './componets/Post/PostBookpage';
import CataloguePostPage from './componets/Post/Cataloguepost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/Home" element={<AppComponets />} />
          <Route path="/postbook" element={<PostBookPage />} />
          <Route path="/postCatalogue" element={<CataloguePostPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
