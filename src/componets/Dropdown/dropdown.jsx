import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function DropdownMenu({ onSubjectChange }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        onSubjectChange(event.target.value);
    };

    useEffect(() => {
        async function fetchDropdownData() {
            try {
                const response = await axios.get("book/subject/all", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    setData(response.data);
                }

            } catch (error) {
                console.log(error);
                throw new Error("Failed to fetch dropdown data");
            }
        }

        fetchDropdownData();
    }, []);

    return (
        <>  
        <div>
            <h3 className='dropdown-header'>Catalogue:-</h3>
            <div className="dropdown-content">
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="">--Please Select--</option>
                    {data && data.map((e) => (
                        <option value={e.Catalogue} key={e.id}>{e.Catalogue}</option>
                    ))}
                </select>
            </div>
            </div>
        </>
    );
}
