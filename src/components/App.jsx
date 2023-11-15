import Login from "./Login";
import background from "./../images/mountains.jpg";

const App = () => {
    return (
        <div className="login-page">
            <img src={background} alt="background" className="image" />
            <div className="form">
                <Login/>
            </div>
        </div>
    );
}
 
export default App;