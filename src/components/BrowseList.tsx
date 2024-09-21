import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import  { AppDispatch, RootStoreState } from "../redux/store";
import filterDogsMiddleware from "../middleware/filterDogsMiddleware";
import BrowseCard from "./BrowseCard";
import { useEffect } from "react";
import Shimmer from "./Shimmer";
import { messages } from "../utils/utilities";
import { Dog, LoadingStatus } from "../types/types";

const BrowseList: React.FC = () => {
    const dogs:Dog[] = useSelector<RootStoreState,Dog[]>((store:RootStoreState) => store.dogsSlice.dogs);
    const total = useSelector<RootStoreState,number>((store:RootStoreState)=>store.dogsSlice.total);
    const favoriteDogs = useSelector<RootStoreState,Dog[]>((store:RootStoreState)=>store.favoritesSlice.dogs)
    const count = Math.ceil(total/25);
    const status  = useSelector<RootStoreState>((store:RootStoreState)=>store.dogsSlice.status);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(filterDogsMiddleware());
    },[dispatch])
    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number)=>{
        const cursor = (value-1)*25;
        dispatch(filterDogsMiddleware(cursor));
    }
    const isFavorite = (dog:Dog)=>{
        if(favoriteDogs.find((favDog:Dog)=>favDog.id===dog.id)){
            return true;
        }
        return false;
    }
    return (
        <div className="flex flex-col justify-center items-center">
            {total>0 && <h1 className="text-customPurple font-bold">Great news! We found a total of {total} adorable dogs that match your criteria! 🐾</h1>}
            <div className="w-full p-8 flex flex-wrap gap-2 justify-center items-center">
                {status === LoadingStatus.LOADED ? dogs.length>0 ? (
                    dogs.map((dog: Dog,index) => <BrowseCard index={index} key={dog.id} dog={dog} showFavIcon={true} isFavorite={isFavorite(dog)}/>)
                ):<div className="w-3/4 flex flex-col justify-center items-center text-customPurple">
                    <p className="text-4xl mb-3 font-bold">{messages.noDogsFound}</p>
                    <p className="text-xl">{messages.NoDogsFoundMessage}</p>
                </div> 
                : status === LoadingStatus.LOADING ? (
                    Array.from({ length: 25 }, (_, index) => <Shimmer key={index} />)
                ) : null}
            </div>
            <Pagination 
                key={count}
                className="mb-10" 
                defaultPage={1} 
                count={count} 
                onChange={handlePaginationChange} 
                showFirstButton 
                showLastButton
                aria-label="Dog list pagination"
                aria-live="polite"
            />
        </div>

    );
};

export default BrowseList;
