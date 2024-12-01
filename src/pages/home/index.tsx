import { Gamepad2 } from "lucide-react";
import GameCard from "../../components/gameCard";
import Warning from "../../components/warning";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";

const myGames = [
  {
    name: "League of Legends",
    price: "Grátis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/260px-League_of_Legends_2019_vector.svg.png",
  },
  {
    name: "Valorant",
    price: "Grátis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/250px-Valorant_logo_-_pink_color_version.svg.png",
  },
  {
    name: "CS:GO",
    price: "10.0",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/CSGOcoverMarch2020.jpg/220px-CSGOcoverMarch2020.jpg",
  },
  {
    name: "Dota 2",
    price: "Grátis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dota_2_-_cropped_logo.jpg/200px-Dota_2_-_cropped_logo.jpg",
  },
  {
    name: "Apex Legends",
    price: "Grátis",
    image: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/ad/Apex_legends_capa.jpg/280px-Apex_legends_capa.jpg",
  },
];

const buys = [
  {
    name: "The Witcher 3: Wild Hunt",
    price: "R$ 39,99",
    image: "https://upload.wikimedia.org/wikipedia/pt/0/06/TW3_Wild_Hunt.png",
  },
  {
    name: "Resident Evil 7: Biohazard",
    price: "R$ 26,76",
    image: "https://upload.wikimedia.org/wikipedia/pt/e/ec/Capa_Resident_Evil_7.jpg",
  },
  {
    name: "The Last of Us™ Part I",
    price: "R$ 149,94",
    image: "https://upload.wikimedia.org/wikipedia/pt/b/be/The_Last_of_Us_capa.png",
  },
  {
    name:  "Metal Gear Solid V: The Phantom Pain",
    price: "R$ 59,40",
    image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Metal_Gear_Solid_V_The_Phantom_Pain_cover.png",
  },
  {
    name: "Red Dead Redemption 2",
    price: "R$ 98,96",
    image: "https://upload.wikimedia.org/wikipedia/pt/e/e7/Red_Dead_Redemption_2.png",
  },
  {
    name: "Grand Theft Auto V",
    price: "R$ 38,63",
    image: "https://upload.wikimedia.org/wikipedia/pt/8/80/Grand_Theft_Auto_V_capa.png",
  },
  {
    name: "Hellblade: Senua's Sacrifice",
    price: "R$ 149,07",
    image: "https://upload.wikimedia.org/wikipedia/pt/2/28/Hellblade_poster.jpg",
  },
  {
    name: "Alan Wake 2 - Edição Deluxe",
    price: "R$ 157,50",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Alan_Wake_II_vertical_logo.svg",
  },
  {
    name: "Control Ultimate Edition",
    price: "R$ 25,80",
    image: "https://upload.wikimedia.org/wikipedia/pt/7/73/Control_capa.png",
  },
  {
    name: "SILENT HILL 2 - Digital Deluxe",
    price: "R$ 319,60",
    image: "https://upload.wikimedia.org/wikipedia/pt/1/18/Silent_Hill_2_2024_capa.png",
  },
  {
    name: "Horizon Zero Dawn™ Remastered Bundle",
    price: "R$ 249,50",
    image: "https://upload.wikimedia.org/wikipedia/pt/d/d0/Horizon_Zero_Dawn_capa.png",
  },
  {
    name: "Resident Evil 4 Gold Edition",
    price: "R$ 127,80",
    image: "https://upload.wikimedia.org/wikipedia/pt/3/30/Resident_Evil_4_%28remake%29.png",
  },
];

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Loja");
  const [warning, setWarning] = useState<{ message: string; status: "success" | "failed" } | null>(null);
  const [storeGames, setStoreGames] = useState(myGames);
  const [libraryGames, setLibraryGames] = useState(buys);
  const [user, setUser] = useState<{ username: string, useremail: string } | null>(null);
  const navigate = useNavigate();

  const handleInstall = (gameName: string) => {
    setWarning({
      message: `O jogo "${gameName}" está sendo instalado.`,
      status: "success",
    });

    setTimeout(() => {
      setWarning(null);
    }, 3000);
  };

  const handleLogout = () => {
    deleteCookie("fable-auth-v.1.0.0");
    navigate("/");
  };

  const handleBuy = (gameIndex: number) => {
    const game = storeGames[gameIndex];

    setStoreGames((prev) => prev.filter((_, index) => index !== gameIndex));
    setLibraryGames((prev) => [...prev, game]);

    setWarning({
      message: `O jogo "${game.name}" foi comprado com sucesso!`,
      status: "success",
    });

    setTimeout(() => {
      setWarning(null);
    }, 3000);
  };

  useEffect(() => {
    const userCookie = getCookie("fable-auth-v.1.0.0");
    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);
      setUser({
        username: parsedUser.name,
        useremail: parsedUser.email
      });
    }else{
      navigate('/')
    }
  }, []);

  console.log(user)

  return (
    <div className={style.Container}>
      <header className={style.Header}>
        <h3>
          <Gamepad2 /> Fable Games
        </h3>
        <div className={style.Tabs}>
          <span
            onClick={() => setSelectedTab("Loja")}
            className={selectedTab === "Loja" ? style.selectedTab : ""}
          >
            Loja
          </span>
          <span
            onClick={() => setSelectedTab("Biblioteca")}
            className={selectedTab === "Biblioteca" ? style.selectedTab : ""}
          >
            Biblioteca
          </span>
          <span onClick={handleLogout}>
            Sair
          </span>
        </div>
      </header>
      <main className={style.Content}>
        {selectedTab === "Biblioteca" && (
          <div>
            <h2 className={style.titleHeader}>Meus Jogos</h2>
            <div className={style.Catalog}>
            {libraryGames.length <= 0 && <h2>Nenhum jogo na sua biblioteca</h2>}
              {libraryGames.map((game, index) => (
                <GameCard
                  key={index}
                  name={game.name}
                  price={game.price}
                  image={game.image}
                  buttonText="Instalar"
                  onButtonClick={() => handleInstall(game.name)}
                />
              ))}
            </div>
          </div>
        )}
        {selectedTab === "Loja" && (
          <div>
            <h2 className={style.titleHeader}>Catálogo</h2>
            <div className={style.Catalog}>
            {storeGames.length <= 0 && <h2>Nenhum jogo disponível</h2>}
            {storeGames.map((game, index) => (
                <GameCard
                  key={index}
                  name={game.name}
                  price={game.price}
                  image={game.image}
                  buttonText="Comprar"
                  onButtonClick={() => handleBuy(index)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      {warning && <Warning message={warning.message} status={warning.status} />}
    </div>
  );
};

export default Home;