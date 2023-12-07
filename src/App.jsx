import Header from "./components/Header"
import PostersList from "./components/PostersList"

function App() {


  const postersInfo = [
    {
      sectionTitle: "Em destaque hoje",
      baseUrl: "https://api.themoviedb.org/3/trending/movie/day",
      paginable: true,
      reqOptions: { 
        method: 'GET',
        headers:
        {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        }
      },
    },

    {
      sectionTitle: "Populares",
      baseUrl: "https://api.themoviedb.org/3/movie/popular",
      paginable: true,
      reqOptions: { 
        method: 'GET',
        headers:
        {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        }
      },
    },

    {
      sectionTitle: "Mais bem avaliados",
      baseUrl: "https://api.themoviedb.org/3/movie/top_rated",
      paginable: true,
      reqOptions: { 
        method: 'GET',
        headers:
        {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        }
      },
    },

    {
      sectionTitle: "Recentes",
      baseUrl: "https://api.themoviedb.org/3/movie/upcoming",
      paginable: true,
      reqOptions: { 
        method: 'GET',
        headers:
        {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
        }
      },
    },

  ]


  return (
    <>
      <Header />
      <main>
        {postersInfo.map((posterInfo) => <PostersList
                                              key={posterInfo.sectionTitle}
                                              info={posterInfo}
                                         />
                        )
        }
        
        
      </main>
    </>
  )
}

export default App
