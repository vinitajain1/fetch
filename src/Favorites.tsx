import { useSelector } from "react-redux";
import BrowseCard from "./components/BrowseCard";
import { RootStoreState } from "./redux/store";
import { FavoritesState } from "./redux/favoritesSlice";
import { Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Sheet from '@mui/joy/Sheet';
import { ModalClose } from "@mui/joy";
import { Dog } from "./types/types";

const messages = [
"I love chasing frisbees in the park! Nothing beats a good game of fetch. 🎾🐕",
"Cuddles are my specialty. I'm the perfect snuggle buddy after a long day. 🐶❤️",
"Catch me zooming around the yard! I’ve got lots of energy and love to play. 🏃‍♂️🐾",
"I’m a water lover! Splashing in the lake is my idea of a perfect day. 💦🐕",
"Treats? Did someone say treats? I’ll do anything for a yummy snack. 🍖🐾",
"I might look tough, but I’m a total softie at heart. Belly rubs are my weakness! 🐾💕",
"I’m super friendly and love making new friends—humans and dogs alike! 🐕👫",
"Adventure awaits! I’m always ready for a hike or a long walk in the woods. 🌲🐕‍🦺",
"I’m a curious explorer, always sniffing out new things and places. 🐕👃",
"I’m a couch potato at heart. Let’s relax and watch some TV together! 📺🐾"
]

interface Match{
    match:string
}

export default function Favorites(){
    const favoriteDogs:FavoritesState = useSelector<RootStoreState,FavoritesState>((store:RootStoreState) => store.favoritesSlice);
    const [open, setOpen] = useState<boolean>(false);
    const [matchedDog,setMatchedDog] = useState<Dog>();
    const dogsList = favoriteDogs.dogs;
    const handleClick = async()=>{
        const res = await fetch(`https://frontend-take-home-service.fetch.com/dogs/match`,{credentials:"include",
            method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(dogsList.map((dog)=>dog.id))
        });
        const match:Match = await res.json();
        setMatchedDog(dogsList.find((dog)=>dog.id == match.match));
        setOpen(true);

    }
    return(
        <React.Fragment>
        <div className=" flex flex-col justify-center items-center">
            <div className="w-full p-8 flex flex-wrap gap-2 justify-center items-center">
                {
                    dogsList.length>0 ? dogsList.map((dog:Dog,index:number)=>{
                        return <BrowseCard index={index} key={dog.id} dog={dog}/>
                    }):
                    <div className="text-xl relative top-14 font-bold text-customPurple">
                        <p>"Uh-oh, your favorites list is feeling a little lonely! 🐾 Why not browse through the adorable dogs and find your next furry friend to add? Your future best buddy is just a click away!"</p>
                    </div>
                }
            </div>
            {dogsList.length>0 && <Button role="button" onClick={handleClick} variant="outlined">Generate Match</Button>}
        </div>
        <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Sheet
                variant="outlined"
                sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <div className="relative flex flex-col gap-4 m-7 justify-center items-center">
                    <div className="text-xl top-14 font-bold text-customPurple">
                        <p>Hi I am {matchedDog?.name}.{messages[Math.floor(Math.random() * (messages.length-1 - 0) + 0)]}</p>
                    </div>
                    <BrowseCard index={0} dog={matchedDog}/>
                </div>
            </Sheet>
      </Modal>
      </React.Fragment>
    )
}