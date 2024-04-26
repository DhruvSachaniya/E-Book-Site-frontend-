export default function Header() {
    return (
        <div className="Header">
            <div className="Header-h1">
                <a href="https://silveroakuni.ac.in/">
                    <img style={{ cursor: "pointer" }} title="sou_logo" src="https://silveroakuni.ac.in/upload/images/250x70.webp" alt="sout_logo" />
                </a>
            </div>
            <div className="Header-h2" style={{ backgroundImage: "url(https://silveroakuni.ac.in/upload/images/slider/3.webp)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <h2>Welcome To E-Library</h2>
            </div>
        </div>
    );
}