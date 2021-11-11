import Header from "./Header";
import Footer from "./footer";

const layoutStyle = {
    display: "flex",
    flexDirection: "column",

    width: "100%"
};

const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%"
};

const Layout = props => (
    <div className="Layout" style={layoutStyle}>
        <Header />
        <div className="Content" style={contentStyle}>
            {props.children}
        </div>
        <Footer />
    </div>
);

export default Layout;