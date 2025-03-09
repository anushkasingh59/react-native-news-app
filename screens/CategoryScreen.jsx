import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { NewsCard } from "../components/NewsCard";

export const CategoryScreen = ({route}) => {
    const API_KEY = "d47741ac3ce84dafbbd6c802d8e0fedf";
    const COUNTRY = 'us';
    const {category} = route.params;
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    },[]);
    const fetchNews = async() =>{
        const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&category=${category}&apiKey=${API_KEY}`;
        try{
            const res = await axios.get(newsUrl);
            setNews(res.data.articles);
            setLoading(false);
        }catch (error) {
            console.error("News API failed to fetch news:",error);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> {` ${category.toUpperCase()} News`} </Text>

            {
                loading ? (
                    <ActivityIndicator
                        size="large"
                        color="red"
                    />
                    ) : (
                        <FlatList
                        data={news}
                        keyExtractor={(item, index) =>
                            index.toString()}
                        renderItem={({item}) => <NewsCard news={item}/>}
                        />
                )
            }


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: "#eee",
        padding: 20
    }
    
})