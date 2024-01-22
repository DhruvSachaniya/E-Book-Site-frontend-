import Header from "../Header/header";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Footer from "../Footer/footer";

export default function PostBookPage() {

    const [selectedOption, setSelectedOption] = useState();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const [values, setvalue] = useState({
        title: ""
    });

    const [pdffile, setfile] = useState();

    const getPdf = (e) => {
        setfile(e.target.files[0]);
    }

    function handlechange(event) {
        const { name, value } = event.target;

        setvalue({
            ...values,
            [name]: value
        })
    }

    async function Postbookfunction(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("Name", values.title);
        formData.append("Catalogue", selectedOption);
        formData.append("pdf", pdffile)

        try {
            const response = await axios({
                url: "book/post",
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })

            if (response.status === 201) {
                toast.success("Book posted succesfully!");
            }

            window.location.reload(true);
        } catch (error) {
            console.log(error);
        }
    }

    const [data, setData] = useState(null);

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
            <Header />
            <div className="postbook-container-head">
                <div className="postbook-box">
                    <h1>PostBook</h1>
                    <form onSubmit={Postbookfunction}>
                        <h3 className='dropdown-header'>subject:-</h3>
                        <div className="dropdown-content">
                            <select value={selectedOption} onChange={handleOptionChange}>
                                <option value="">--Please Select--</option>
                                {data && data.map((e) => (
                                    <option value={e.Catalogue} key={e.id}>{e.Catalogue}</option>
                                ))}
                            </select>
                        </div>
                        <p style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>if Catalogue is not exites? <Link to={'/postcatalogue'}><mark style={{ backgroundColor: "var(--color-silverockunivercity)", color: "var(--color-white)" }}>Catalogue</mark></Link></p>
                        <div>
                            <h3 className="titleinput-header">Title:-</h3>
                            <div className="titleinput-content">
                                <input
                                    name="title"
                                    value={values.title}
                                    onChange={handlechange}
                                    type="text"
                                    placeholder="Title" />
                            </div>
                        </div>
                        <div>
                            <input
                                className="inputfile"
                                type="file"
                                accept="pdf/*"
                                onChange={getPdf}
                                name="pdf"
                            />
                        </div>

                        <button className="Search-Button" style={{ cursor: "pointer", marginLeft: "35%" }} type="submit">submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}