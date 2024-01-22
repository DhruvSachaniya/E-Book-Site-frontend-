import { useState } from "react";
import Header from "../Header/header";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../Footer/footer";

export default function CataloguePostPage() {
    
    const [values, setvalue] = useState({
        Catalogue: ""
    });

    function handlechange(event) {
        const { name, value } = event.target;

        setvalue({
            ...values,
            [name]: value
        })
    }

    async function handlesubmit (event) {
        event.preventDefault();

        const response = await axios({
            url: "book/catalogue",
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                Catalogue: values.Catalogue
            })
        })

        if(response.status === 201) {
            toast.success("Catalouge post suceesfully!");
            setvalue({
                Catalogue: ""
            });
        }
    }
    
    return (
        <>
            <Header />
            <div className="postbook-container-head">
                <div className="postbook-box">
                    <h1 style={{ marginLeft: "1rem" }}>postCatalogue</h1>
                    <form onSubmit={handlesubmit}>
                    <div>
                            <h3 className="titleinput-header">Title:-</h3>
                            <div className="titleinput-content">
                                <input
                                    name="Catalogue"
                                    value={values.Catalogue}
                                    onChange={handlechange}
                                    type="text"
                                    placeholder="Title" />
                            </div>
                        </div>
                    <button className="Search-Button" style={{ cursor: "pointer", marginLeft: "35%"}} type="submit">submit</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}