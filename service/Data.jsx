
import {AxiosInstance} from './AxiosInstance';

export async function getMenuData() {
    try {
        const res = await AxiosInstance.get('/menu');
        return res.data;
    } catch (err) {
        console.error('Error fetching menu:', err);
        throw err;
    }
}
export async function getSwiperData() {
    try {
        const res = await AxiosInstance.get('/swiper');
        return res.data;
    } catch (err) {
        console.error('Error fetching swiper:', err);
        throw err;
    }
}
export async function getMovieData() {
    try {
        const res = await AxiosInstance.get('/topFilms');
        return res.data;
    } catch (err) {
        console.error('Error fetching swiper:', err);
        throw err;
    }
}

