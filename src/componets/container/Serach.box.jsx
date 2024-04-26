import { useEffect, useState } from "react";
import DropdownMenu from "../Dropdown/dropdown";
import TitleInputBox from "../title-input/title.input";
import SearchButton from "../buttons/searchbutton";
import RefreshButton from "../buttons/refresh";
import TableData from "../Table-componets/tableshow";
import PostBook from "../buttons/Postbook";
import axios from "axios";
import toast from "react-hot-toast";

export default function SerachBox (props) {

    const { clickAtagdata } = props;

    const [isadmin, setisadmin] = useState(false);

    const [ selectedSubject, setSelectedSubject ] = useState(null);

    const [ selectedtitle, setselectedtitle ] = useState("");

    const [ selectedtabledata, setselectedtabledata ] = useState(null);

    const [ selectedtablenumber, setselectedtablenumber ] = useState(null);

    const [ allbooks, setallbooks ] = useState(null);

    useEffect(() => {
        axios({
            url: "book/all",
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            setallbooks(res.data);
        })
        .catch((error) => {
            if(error.response.data.statusCode === 401) {
                toast.error("Unathorised! ")
            }
        })
    },[])

    useEffect(() => {
        if(allbooks) {
            setselectedtabledata(allbooks);
        }
    }, [allbooks])

    useEffect(() => {
        if (localStorage.getItem("Role") === "admin") {
            setisadmin(true);
        }
    }, [])

    useEffect(() => {
        if (clickAtagdata) {
            setselectedtabledata(clickAtagdata);
            const datalength = clickAtagdata.map(item => item.Posts.length);
            setselectedtablenumber(datalength);
        }
    }, [clickAtagdata]);

    const handleSearch = async (data) => {
        console.log(data)
        setselectedtabledata(data);
        if(data?.length === 0 || data === null) {
            setselectedtablenumber(data.length);
        }
        if(data?.length > 2) {
            setselectedtablenumber(data.length);
        } else {
            const datalength = await data.length > 0 ?? 0;
            setselectedtablenumber(datalength);
        }
    };


    return(
        <div className="Serach-Box">
            <h1 style={{marginLeft: "0.5rem" }}>E-book Catalogue</h1>
            <div className="Serach-Dropdown">
                <DropdownMenu onSubjectChange={(subject) => setSelectedSubject(subject)}/>
                <TitleInputBox onTitleChange={(title) => setselectedtitle(title)}/>
            </div>
            <div className="Serach-Buttons">
                <SearchButton subject={selectedSubject} title={selectedtitle} onSearch={handleSearch}/>
                <RefreshButton/>
                {isadmin && (
                    <PostBook/>
                )}
            </div>
            <div>
                <TableData data={selectedtabledata} number={selectedtablenumber}/>
            </div>
        </div>
    );
}