import { useEffect, useState } from 'react';
import DropdownMenu from '../Dropdown/dropdown';
import TitleInputBox from '../title-input/title.input';
import SearchButton from '../buttons/searchbutton';
import RefreshButton from '../buttons/refresh';
import TableData from '../Table-componets/tableshow';
import PostBook from '../buttons/Postbook';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaginationCompo from '../Pagination/muipagination';
import { useDispatch, useSelector } from 'react-redux';
import { counterTable } from '../redux/redux-file/TableCount.js';
import { StoreTableData } from '../redux/redux-file/TableData.js';
import { UpdatePageData } from '../redux/redux-file/CurrentPageData.js';

export default function SearchBox(props) {
  const { clickAtagdata } = props;

  const dispatch = useDispatch();
  const tableCount = useSelector((state) => state.counter.value); // Use Redux state

  const [isadmin, setisadmin] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedtitle, setselectedtitle] = useState('');
  const [allbooks, setallbooks] = useState([]);

  // Fetch all books on mount
  useEffect(() => {
    axios({
      url: 'book/all',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setallbooks(res.data);
      })
      .catch((error) => {
        if (error.response?.data?.statusCode === 401) {
          toast.error('Unauthorized!');
        }
      });
  }, []);

  const itemsPerPage = 5;

  useEffect(() => {
    if (allbooks.length > 0) {
      const initialPageData = allbooks.slice(0, itemsPerPage); // First 5 items
      dispatch(UpdatePageData(initialPageData));
    }
  }, [allbooks, dispatch, itemsPerPage]);

  // Update table data and count when allbooks change
  useEffect(() => {
    dispatch(counterTable(allbooks.length));
    dispatch(StoreTableData(allbooks));
  }, [allbooks, dispatch]);

  // Update table data and count when clickAtagdata changes
  useEffect(() => {
    if (clickAtagdata) {
      dispatch(counterTable(clickAtagdata.length));
    }
  }, [clickAtagdata, dispatch]);

  // Check admin role on mount
  useEffect(() => {
    if (localStorage.getItem('Role') === 'admin') {
      setisadmin(true);
    }
  }, []);

  const handleSearch = (data) => {
    dispatch(counterTable(data?.length || 0));
    dispatch(StoreTableData(data || []));

    const currentPageData = data.slice(0, itemsPerPage);
    dispatch(UpdatePageData(currentPageData));
  };

  return (
    <>
      <div className="Serach-Box">
        <h1 style={{ marginLeft: '0.5rem' }}>E-book Catalogue</h1>
        <div className="Serach-Dropdown">
          <DropdownMenu
            onSubjectChange={(subject) => setSelectedSubject(subject)}
          />
          <TitleInputBox onTitleChange={(title) => setselectedtitle(title)} />
        </div>
        <div className="Serach-Buttons">
          <SearchButton
            subject={selectedSubject}
            title={selectedtitle}
            onSearch={handleSearch}
          />
          <RefreshButton />
          {isadmin && <PostBook />}
        </div>
        <div>
          <TableData
            data={useSelector((state) => state.currentPage.currentPageData)}
            number={tableCount}
          />
        </div>
        <PaginationCompo />
      </div>
    </>
  );
}
