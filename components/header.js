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
const headerImgUrl = "/logo.png";

const Header = () => (
    <div className="Header" style={headerStyle}>
        <div><a href="/"><img src={headerImgUrl}/></a></div>
        <div>DSE Graph & Search Demo</div>
    </div>
);

export default Header;