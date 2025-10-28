import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./GetStartedButton";

export default function Navbar(){
    const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // If user is not on the homepage, go there first
      navigate(`/#${id}`);
      return;
    }

    // If already on the homepage, just scroll
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
    return (
        <>
            <div className="w-full overflow-hidden flex justify-between items-center h-[4rem] text-mainwhite border-[1px] border-secondary">
                <div className="w-full flex items-center mx-[2rem] text-sm font-light gap-[2rem]">
                    <Link to="" className="text-2xl font-extrabold">Chain Cast</Link>
                    <Link to="/transactions">Track</Link>
                    <Link to="/transactions">Insights</Link>
                    <a href="/#features" onClick={(e) => handleScroll(e, "features")}>Features</a>
                </div>
                <div className="w-full flex justify-end mx-[4rem]">
                    <Button title={"Get Started"}/>
                </div>
            </div>
        </>
    )
}