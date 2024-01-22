import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CatalogueBox({ selectedclickdata }) {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    const [clickdata, setclickdata ] = useState(null);

    async function handleclick (Catalogue) {
        const response = await axios({
            url: `book/subject?subject=${Catalogue}`,
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                "Content-Type": "application/json"
            }
        })

        if(response.status === 200) {
            setclickdata(response.data);
            selectedclickdata(response.data);
        }
    }

    useEffect(() => {
        async function fetchCatalogueData() {
            try {
                const response = await axios({
                    url: "book/subject/all",
                    method: "get",
                    headers: {
                        "Authorization": "Bearer  " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    }
                })

                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCatalogueData();
    }, []);

    return (
        <div className="Catalogue-box">
            <div className="active">
                <h3>E-Book Catalogue</h3>
            </div>
            {data && data.map((e) => (
                <div onClick={() => handleclick(e.Catalogue)} key={e.id}>
                    <h3>{e.Catalogue}</h3>
                </div>
            ))}
        </div>
    );
}