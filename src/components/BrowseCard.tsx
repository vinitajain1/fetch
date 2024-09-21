import FavoriteIcon  from "@mui/icons-material/Favorite";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import toggleFavoritesMiddleware from "../middleware/toggleFavoritesMiddleware";
import { getColorClass } from "../utils/utilities";
import { Dog } from "../types/types";


interface BrowseCardProps{
    dog: Dog,
    index:number,
    showFavIcon:boolean,
    isFavorite?:boolean
}

const BrowseCard = (props:BrowseCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleOnClick = ()=>{
        dispatch(toggleFavoritesMiddleware(props.dog));
    }
    return (
        <Card role='article' className="animate-fadeIn" sx={{ width: 300, marginBottom: 2,
            backgroundColor:getColorClass(props.index)
             }}>
            <CardMedia
                sx={{ width:300,height:200,backgroundSize:'contain',
                    transition: "transform 0.3s ease-in-out","&:hover": {
              transform: "scale3d(1.05, 1.05, 1)",
            },}}
                image={props.dog.img}
                src={`Image of ${props.dog.name}`}
                title={props.dog.name}
            />
            <CardContent className="text-customPurple">
                <Typography gutterBottom variant="h5" component="div">
                    {props.dog.name}
                </Typography>
                <Typography  variant="body1">
                    <span>Breed: </span>{props.dog.breed}
                </Typography>
                <Typography variant="body1">
                    <span>Age: </span>{props.dog.age} 
                </Typography>
                <Typography variant="body1">
                    <span>City: </span>{props.dog.location?.city} 
                </Typography>
                <Typography variant="body1">
                    <span>County: </span>{props.dog.location?.county} 
                </Typography>
                <Typography variant="body1">
                    <span>State: </span>{props.dog.location?.state} 
                </Typography>
                <Typography variant="body1">
                    <span>Zip code: </span>{props.dog.zip_code} 
                </Typography>
            </CardContent>
           { props.showFavIcon && <CardActions>
                <IconButton role="button" onClick={handleOnClick} aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: props.isFavorite ? 'red' : 'grey' }} />
                </IconButton>
            </CardActions>}
        </Card>
    );
};

export default BrowseCard;
