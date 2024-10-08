import Filter from "./components/Filter";
import BrowseList from "./components/BrowseList";

export default function Browse(){
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full bg-customBackground flex justify-center">
                <img className="w-96" src="/browse-page.png" alt="browse lovable dogs and puppies"/>
            </div>
            <Filter/>
            <BrowseList/>
        </div>
    )
}