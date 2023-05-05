import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { themes } from "../Helpers/Theme";

const Card = ({ title, body, id , UID}) => {
  const CardStyles = makeStyles((theme) => ({
    cardwrapper: {
      backgroundColor: themes.palette.primary.dark,
      borderRadius: "5px",
      minHeight: 200,
      padding: "10px 20px",
      margin: 10,
    },
    cardlink: {
      textDecoration: "none",
      color: themes.palette.primary.greydark,
    },
    cardtitle: {
      color: themes.palette.primary.offwhite,
    },
    cardtext: {
      textAlign: "center",
    },
  }));
  const classes = CardStyles();
  return (
    <div className={classes.cardwrapper}>
      <Link to={`posts/${id}`} className={classes.cardlink}>
        <div className={classes.cardDetails}>
          <h3 className="text-lg mb-2 lg:mb-3 font-bold">{title}</h3>

          <p className={classes.cardtext}>{body.slice(0,170)}...</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
