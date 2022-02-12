import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Form from "./components/Form";
const App = () => {
    const [userSearch, setUserSearch] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [actualPage, setActualPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getImages = async () => {
        const { VITE_API_KEY } = import.meta.env;
        const imagePerPage = 30;
        const URL_PIXABAY = `https://pixabay.com/api/?key=${VITE_API_KEY}&q=${userSearch}&image_type=photo&pretty=true&per_page=${imagePerPage}&page=${actualPage}`;
        const resp = await fetch(URL_PIXABAY);
        const { hits, totalHits } = await resp.json();
        setImages(hits);
        // total of pages
        const totalOfPages = Math.ceil(totalHits / imagePerPage);
        setTotalPages(totalOfPages);
        // move screen to top
        // const percentY = (window.scrollY / 100) * 100;
        // const percentX = (window.scrollX / 100) * 100;
        // console.log(percentY);
        // console.log(percentX);
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        getImages();
    }, [actualPage]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usersSearches = [userSearch.trim()];
        if (usersSearches.includes("")) {
            setError(true);
            return;
        }
        setError(false);
        setUserSearch("");
        await getImages();
    };

    const previousPage = () => {
        const newActualPage = actualPage - 1;
        if (newActualPage <= 0) return;
        setActualPage(newActualPage);
    };
    const nextPage = () => {
        const newActualPage = actualPage + 1;
        if (newActualPage > totalPages) return; // if actual page is bigger than total pages
        setActualPage(newActualPage);
    };
    return (
        <>
            <header>
                <h1 className="text-2xl text-3xl font-semibold text-center py-4">
                    Buscador de Imagenes
                </h1>
            </header>
            <main className="px-2 sm:px-16 lg:px-32 w-full">
                {error && (
                    <p className="text-center bg-red-500 rounded text-xl py-2 sm:mx-[112px] lg:mx-[312px] mb-4">
                        Debes ingresar un termino de busqueda
                    </p>
                )}
                <Form
                    setUserSearch={setUserSearch}
                    userSearch={userSearch}
                    handleSubmit={handleSubmit}
                />
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-auto gap-8 mt-4">
                    {images.map((image: any) => (
                        <figure key={image.tags}>
                            <img src={image.webformatURL} alt={image.tags} />
                            <figcaption>
                                <p className="text-center text-sm">
                                    {image.tags}
                                </p>
                                <article className="text-xl">
                                    <h6>{image.likes} likes</h6>
                                    <h6>{image.views} views</h6>
                                </article>
                            </figcaption>
                        </figure>
                    ))}
                    {images.length !== 0 && (
                        <section className="flex gap-2 justify-center mb-8  items-center col-span-1 md:col-span-2 lg:col-span-3">
                            <button
                                className="bg-purple-600 rounded px-4 py-2"
                                onClick={previousPage}
                            >
                                Anterior
                            </button>
                            <button
                                className="bg-purple-600 rounded px-4 py-2"
                                onClick={nextPage}
                            >
                                Siguiente
                            </button>
                        </section>
                    )}
                </section>
            </main>
        </>
    );
};

export default App;
