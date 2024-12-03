import { Gamepad2 } from "lucide-react";
import GameCard from "../../components/gameCard";
import Warning from "../../components/warning";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import axios from "axios";

interface games {
  id: Number,
  name: string,
  price: string,
  image: string,
}

const Home = () => {
  const [selectedTab, setSelectedTab] = useState("Loja");
  const [warning, setWarning] = useState<{ message: string; status: "success" | "failed" } | null>(null);
  const [storeGames, setStoreGames] = useState<games[]>([]);
  const [libraryGames, setLibraryGames] = useState<games[]>([]);
  const [user, setUser] = useState<{ username: string, useremail: string, id: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    //setLibraryGames((prev) => [...prev, game]);

    axios.post(`${process.env.API_URL}/store/addNewStore`, {
      //@ts-ignore
      user: { id: user.id },
      game: { id: game.id }
    })
      .then(response => {
        setStoreGames((prev) => prev.filter((_, index) => index !== gameIndex));
        setLibraryGames((prev) => [...prev, game]);

        setWarning({
          message: `O jogo "${game.name}" foi comprado com sucesso!`,
          status: "success",
        });

        setTimeout(() => {
          setWarning(null);
        }, 3000);
      })
      .catch(error => {
        console.error('Erro ao comprar o jogo:', error);
        setWarning({
          message: `Erro ao comprar o jogo "${game.name}".`,
          status: "failed",
        });

        setTimeout(() => {
          setWarning(null);
        }, 3000);
      });
  };

  useEffect(() => {
    const userCookie = getCookie("fable-auth-v.1.0.0");

    if (userCookie) {
      const user = jwtDecode(userCookie)
      //@ts-ignore
      setUser({ useremail: user.email, id: user.id, username: user.sub })

      //@ts-ignore
      axios.get(`${process.env.API_URL}/games/all`)
        .then(response => {
          const games = response.data;

          // Formatação dos jogos da loja
          const formattedStoreGames = games.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price.toFixed(2),
            image: item.image || "default_image_url",
          }));

          setStoreGames(formattedStoreGames);

          //@ts-ignore
          axios.get(`${process.env.API_URL}/store/user/${user.id}`)
            .then(response => {
              const libraryData = response.data;

              const formattedLibraryGames = libraryData.map((item: any) => ({
                id: item.game.id,
                name: item.game.name,
                price: item.game.price.toFixed(2),
                image: item.game.image || "default_image_url",
              }));

              setLibraryGames(formattedLibraryGames);

              const filteredStoreGames = formattedStoreGames.filter((game: games) =>
                !formattedLibraryGames.some((libraryGame: games) => libraryGame.name === game.name)
              );

              setStoreGames(filteredStoreGames);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Erro ao obter a biblioteca:', error);
              setIsLoading(false);
            });

        })
        .catch(error => {
          console.error('Erro ao obter jogos da loja:', error);
          setIsLoading(false);
        });


    } else {
      navigate('/')
    }
  }, []);

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
                  key={`${game.id}`}
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
              {isLoading ? (
                <h2>Carregando jogos...</h2>
              ) : storeGames.length <= 0 ? (
                <h2>Nenhum jogo disponível</h2>
              ) : (
                storeGames.map((game, index) => (
                  <GameCard
                    key={`${game.id}`}
                    name={game.name}
                    price={game.price}
                    image={game.image}
                    buttonText="Comprar"
                    onButtonClick={() => handleBuy(index)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </main>
      {warning && <Warning message={warning.message} status={warning.status} />}
    </div>
  );
};

export default Home;