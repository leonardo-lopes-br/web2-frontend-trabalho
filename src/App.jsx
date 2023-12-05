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
      }
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
