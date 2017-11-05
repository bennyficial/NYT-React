import axios from "axios";

const helpers = {

    runQuery: (search, startYear, endYear) => {
        const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=40bb85f585ed4f2" +
                "8ada2b04141025db1&q=" + search + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
                
        return axios.get(queryURL)

    },
    saveArticle: (articleData) => axios.post("/api/saved", articleData),
    getSavedArticles: () => axios.get("/api/saved"),
    deleteArticle: (id) => axios.delete("api/saved/" + id),
    getHistory: () => axios.get("/api/saved/history"),
    saveHistory: (data) => axios.post("/api/saved/history", data)
};

export default helpers;