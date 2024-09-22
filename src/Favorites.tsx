import { useSelector } from "react-redux";
import BrowseCard from "./components/BrowseCard";
import { RootStoreState } from "./redux/store";
import { Button, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Sheet from '@mui/joy/Sheet';
import { MAIN_URL, MatchMessages, noFavFound } from "./utils/utilities";
import { Dog, FavoritesState } from "./types/types";

interface Match {
    match: string
}

export default function Favorites() {
    const favoriteDogs: FavoritesState = useSelector<RootStoreState, FavoritesState>((store: RootStoreState) => store.favoritesSlice);
    const [open, setOpen] = useState<boolean>(false);
    const [matchedDog, setMatchedDog] = useState<Dog>();
    const dogsList = favoriteDogs.dogs;

    const handleClick = async () => {
        const res = await fetch(`${MAIN_URL}/dogs/match`, {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dogsList.map((dog) => dog.id))
        });
        const match: Match = await res.json();
        setMatchedDog(dogsList.find((dog) => dog.id === match.match));
        setOpen(true);
    }

    useEffect(() => {
        if (open) {
            document.getElementById('modal-title')?.focus();
        }
    }, [open]);

    return (
        <div className="m-5">
            <div className="flex flex-col justify-center items-center">
                <div className="w-full p-8 flex flex-wrap gap-2 justify-center items-center">
                    {dogsList.length > 0 ? (
                        dogsList.map((dog: Dog, index: number) => {
                            return <BrowseCard index={index} key={dog.id} dog={dog} showFavIcon={true} isFavorite={true} />;
                        })
                    ) : (
                        <div className="text-xl top-14 font-bold text-customPurple">
                            <p>{noFavFound}</p>
                        </div>
                    )}
                </div>
                {dogsList.length > 0 && (
                    <Button
                        role="button"
                        onClick={handleClick}
                        variant="outlined"
                        aria-label="Generate a dog match from favorites"
                    >
                        Generate Match
                    </Button>
                )}
            </div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                    role="dialog">
                    <div className="relative flex flex-col gap-4 m-7 justify-center items-center">
                        <Typography
                            id="modal-title"
                            component="h2"
                            variant="h6"
                            className="text-xl top-14 font-bold text-customPurple"
                            tabIndex={0}>
                            Hi, I am {matchedDog?.name}. {MatchMessages[Math.floor(Math.random() * MatchMessages.length)]}
                        </Typography>
                        {matchedDog && <BrowseCard index={0} dog={matchedDog} showFavIcon = {false} />}
                    </div>
                </Sheet>
            </Modal>
        </div>
    );
}
