const headerStyle = {
    backgroundColor: "lightgrey",
    color: "black",
    width: "100%",
    height: "100px",
    padding: "10px",
    background: "#fff",
    boxShadow: "0 2px 3px rgb(0 0 0 / 16%)"

};
const catalogLinkStyle = {
    float: "right"
}
const headerImgUrl = "https://www.datastax.com/_next/static/images/logo-0d118cac08aa7b099c0a6988c32ec1f6.svg";

const Header = () => (
    <div className="Header" style={headerStyle}>
        <div><a href="/"><img src={headerImgUrl}/></a></div>
        <div>DSE Graph & Search Demo</div>
    </div>
);

export default Header;