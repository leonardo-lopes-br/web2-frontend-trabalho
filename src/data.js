export const postersInfo = [
    {
      sectionTitle: "Em destaque hoje",
      baseUrl: "https://api.themoviedb.org/3/trending/movie/day?language=pt-BR",
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
      baseUrl: "https://api.themoviedb.org/3/movie/popular?language=pt-BR",
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
      baseUrl: "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR",
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
      baseUrl: "https://api.themoviedb.org/3/movie/upcoming?language=pt-BR",
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