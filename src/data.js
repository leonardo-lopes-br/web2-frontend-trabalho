export const postersListInfo = [
    {
      type: 'movie',
      sectionTitle: "Filmes em destaque hoje",
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
      type: 'movie',
      sectionTitle: "Filmes populares",
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
      type: 'movie',
      sectionTitle: "Filmes mais bem avaliados",
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
      type: 'movie',
      sectionTitle: "Filmes recentes",
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

    {
      type: 'series',
      sectionTitle: "Séries populares",
      baseUrl: "https://api.themoviedb.org/3/tv/popular",
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
      type: 'series',
      sectionTitle: "Séries mais bem avaliadas",
      baseUrl: "https://api.themoviedb.org/3/tv/top_rated",
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
      type: 'series',
      sectionTitle: "Séries em lançamento esta semana",
      baseUrl: "https://api.themoviedb.org/3/tv/on_the_air",
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


  export const developers = [
    {
      name: 'Karen Ketlyn Ferreira Barcelos',
      social_media: {
        github_nick: '42kkkkkaren',
        instagram_nick: 'kkkkkaren.exe',
      },
    },
    
    {
      name: 'Leonardo da Silva Lopes',
      social_media: {
        github_nick: 'leonardo-lopes-br',
        instagram_nick: 'quefofomano',
      },
    },

    {
      name: 'Vitor Kasai Tanoue',
      social_media: {
        github_nick: 'vitorkasai',
        instagram_nick: 'vitorkasai',
      },
    },
  ]


  export const uniqueContentQuerys = [
    {
      type: 'movie',
      baseUrl: 'https://api.themoviedb.org/3/movie/<content_id>?append_to_response=videos',
      reqOptions: {
        method: 'GET',
        headers:
          {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
          },
      },
    },
    {
      type: 'series',
      baseUrl: 'https://api.themoviedb.org/3/tv/<content_id>?append_to_response=videos',
      reqOptions: {
        method: 'GET',
        headers:
          {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
          },
      },
    },
    
  ]


export const filteredContent = [
    {
      content_type: 'movie',
      baseUrl: 'https://api.themoviedb.org/3/search/movie?query=<query>',
      reqOptions: {
        method: 'GET',
        headers:
          {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
          },
      },
    },

    {
      content_type: 'tv',
      baseUrl: 'https://api.themoviedb.org/3/search/tv?query=<query>',
      reqOptions: {
        method: 'GET',
        headers:
          {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`
          },
      },
    },
  ]
  
