export interface pelicula{
    id: number;
    titulo: string;
    poster: string;
}

export interface landigPageDTO{
    enCartelera?: pelicula[];
    proximosEstrenos?: pelicula[];
}