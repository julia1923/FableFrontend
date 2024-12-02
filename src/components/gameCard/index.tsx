import { DollarSign, Gamepad2 } from "lucide-react";
import style from "./styles.module.css";

interface GameCardProps {
  name: string;
  price: string;
  image: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ name, price, image, buttonText, onButtonClick }) => {
  return (
    <div className={style.GameItem}>
      {image == "default_image_url" || "" ? <h5>Sem imagem disponível</h5>:  <img src={image} alt={`Imagem de ${name}`} />}
     
      <div className={style.GameLabel}>
        <h4><Gamepad2 size={16} /> Nome: {name}</h4>
        <h4><DollarSign size={16} /> Preço: {price}</h4>
      </div>
      {buttonText && (
        <button className={style.ActionButton} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default GameCard;
